import { todoListType, userType } from './../recoil/atomType';
import firebase from "firebase/app";
import "firebase/database";
import {firebaseConfig} from './firebaseConfig';
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseDatabase = firebase.database();

auth.languageCode = 'ko';

export const getTodoListWithDays = async(uid ?:string | null, day?: string) => {
    try {
        if(uid && day) {
            const useDatabaseRef = firebaseDatabase.ref(uid);
            const list : todoListType[] = []
            await useDatabaseRef.child(day).once('value', (snapshot) => {
                const val = snapshot.val();
                for(let key in val) {
                    list.push({...val[key], key : key})
                }
            },(err) => {
                const error = new Error();
                error.message = '에러 발생 : ' + err;
                if(err) throw error
            })
            return {
                status : true,
                message : '리스트 받아오기 성공',
                lists : list
            }
        } 
        const error = new Error();
        error.message = 'uid 또는 잘못된 날짜 입니다.'
        throw error
    } catch(err) {
        return {
            status : false,
            message : err.message
        }
    }
}

export const getTodoList = async (uid ?: string | null, day ?: string) => {
    try {
        if(uid) {
            const userDatabaseRef = firebaseDatabase.ref(uid.split('/')[1]);
            const list : todoListType[] = [];
            await userDatabaseRef.once('value', (snapshot) => {
                const val = snapshot.val();
                for (let day in val) {
                    for(let keys in val[day]) {
                        const valDay = val[day];
                        list.push({...valDay[keys], day : day, keyNumber : keys})
                    }
                }
            },(err) => {
                const error = new Error();
                error.message = '에러 발생 : ' + err;
                if(err) throw error
            })
            return {
                status : true,
                message : '리스트 받아오기 성공',
                lists : list
            }
        }
        const error = new Error();
        error.message = 'uid가 업습니다.'
        throw error
    } catch(err) {
        return {
            status : false,
            message : err.message
        }
    }
}

export const createTodoList = async (todo : todoListType) => {
    try {
        const user = auth?.currentUser;
        if(user) {
            const userDatabaseRef = firebaseDatabase.ref(`${user.uid}`);
            await userDatabaseRef.child(`${todo.day}`).push({
                title : todo.title,
                description : todo.description,
                rank : todo.rank,
                checked : false,
                userInfo : {
                    photoURL : user?.photoURL,
                    email : user?.email,
                    nickname : user?.displayName,
                    uid : user?.uid
                }
            }, (error) => {
                const err = new Error(error?.message);
                err.message = error?.message || '오류발생';
                if(error) throw err
            });
            return {
                status : true,
                message : '게시 완료!'
            }
        }
        const err = new Error();
        err.message = '유저 정보 불러오기 실패.';
        throw err
    } catch (err) {
        return {
            status : false,
            message : err.message
        }
    }
}

export const updateToogleChecked = async({ userUid, day, postKey, checked } :
    { userUid : string, day : string, postKey : string, checked : boolean }) => {
    try {
        const currentUser = await auth.currentUser;
        if(currentUser?.uid === userUid) {
            const userDatabaseRef = firebaseDatabase.ref(userUid);
            if(userDatabaseRef) {
                const postRef = userDatabaseRef.child(day).child(postKey);
                await postRef.update({ checked : !checked }, (error) => {
                    if(error) { throw error }
                })
                const returnOBJ : any = {};
                await postRef.once("value", (snapshot) => {
                    const val = snapshot.val();
                    for(let key in val) {
                        returnOBJ[key] = val[key];
                    }
                })
                return {
                    status : true,
                    message : '성공',
                    list : returnOBJ
                }
            } else {
                const err = new Error();
                err.message = '유저 정보 불러오기 실패';
                throw err
            }
        } else {
            const error = new Error();
            error.message = '다른 유저의 정보를 바꿀 수 없습니다'
            throw error;
        }
    } catch(err) {
        return {
            status : false,
            message : err.message
        }
    }
}

// export const getUserInfoFromUID = async (userUid : string) => {
//     try {
//         const user = await adminAuth.getUser(userUid);
//         if(user) {
//             return {
//                 status : true,
//                 message : '유저 정보 받아오기 성공',
//                 userInfo : {
//                     photoURL : user.photoURL,
//                     email : user.email,
//                     nickname : user.displayName,
//                     uid : user.uid
//                 }
//             }
//         }
//         const err = new Error();
//         err.message = '존재 하지 않는 아이디'
//         throw err
//     } catch (err) {
//         return {
//             status : false,
//             message : err.message,
//             userInfo : null
//         }
//     }
// }





export const createImageExplain = ({ title, description, imageSrc } :
     { title : string, description: string, imageSrc : string } ) => {
         try {
             firebaseDatabase.ref('Todo').push({
                 title,
                 description,
                 imageSrc
             });  
        } catch (err) {
            console.error(err)
        }
}

export const getImageExplain = () => {
    try {
        const lists : any = [];
        firebaseDatabase.ref('Todo').once('value', (snapshot) => {
            const value = snapshot.val();
            for (let id in value) {
                lists.push({ id, ...value[id]});
            }
        })
        return lists.reverse();
    } catch(err) {
        console.error(err)
    }
} 

export const signUpWithMyApplication = async({email, nickname, password } : { email : string; password : string; nickname : string}) => {
    try {
        const create = await auth.createUserWithEmailAndPassword(email, password).catch((err) => {
            const createError = new Error(err.code);
            createError.message = err.message;
            throw createError
    });
    if(create) {
        // 이미 있는 아이디면 create가 undefined 가 됨.
        // 유저 생성은 소문자로 이루어짐
        // 데이터베이스는 소문자, 대문자 구분해서 들어감
        // 따라서 소문자로 바꿔주는 것이 좋음
        const user = create.user;
        const userProfile = await user?.updateProfile({
            displayName : `${nickname}`,
            photoURL : `https://placehold.it/1000.png/${Math.round(Math.random() * 0xffffff).toString(16)}/ffffff?text=${email.substr(0, 4)}`
        }).then(() => {
            return true
        })
        if(userProfile) {
            return  { status : true, message : '회원가입 성공'}
        } 
        return  { status : false, message : '회원가입 실패 - 유저 프로필 생성'}
    }
    return { status : false, message : '회원가입 실패 - 이미 있는 아이디'}
    } catch (err) {
        const message : string = err.message;
        return{ status : false, message : message}
    }
}


export const signUpFunction = async ({ email, password, nickname } 
    : { email : string; password : string; nickname : string}) => {
    try {
        let errorMessage = '';
        const create = await auth.createUserWithEmailAndPassword(email, password).catch((err) => {
            errorMessage = err.message
    });
    if(create) {
        // ?���? ?��?�� ?��?��?���? create�? undefined �? ?��.
        // ?��??? ?��?��??? ?��문자�? ?��루어�?
        const lowerEamil = email.toLowerCase();
        // ?��?��?��베이?��?�� ?��문자, ???문자 구분?��?�� ?��?���?
        // ?��?��?�� ?��문자�? 바꿔주는 것이 좋음
        const userRef = firebaseDatabase.ref('User');
        await userRef.child(`${lowerEamil.split('@')[0]}`).push({ email : lowerEamil, nickname });
        return [true, '?��?���??�� ?���?']
    } return [false, errorMessage]
    } catch (err) {
        console.error(err)
        return [false, err]
    }
}

export const loginFunction  = async ({ email, password } 
    : { email : string; password : string; }) => {
        try {
            const user = auth.currentUser;
            // firebase auth 는 로그인을하면 indexedDB에 정보를 보내고
            // 쿠키에는 토큰을 보낸다
            // cuurentUser를 하면 쿠키 에 있는 토큰을 읽고,
            // 정보를 보내준다.
            if(!user) {
                await auth.signInWithEmailAndPassword(email, password)
                .catch((err) => {
                    const userError = new Error(err.code);
                    userError.message = err.message;
                    throw userError
                })
                const currentUser = auth.currentUser;
                if(currentUser) {
                    const userError = new Error();
                    userError.message = '로그인이 되지 않습니다'
                    throw userError
                }
                return { status : true, message : '로그인 성공'}
            } else {
                const userError = new Error();
                userError.message = '이미 로그인 되어 있습니다';
                throw userError
            }
        } catch(err) {
            const message : string = err.message
            return { status : false, message : message}
        }
    }

export const logoutUserFunction = () => {
    auth.signOut().catch(err => console.error(err.code, err.message))
};