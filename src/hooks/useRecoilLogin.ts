import { useCallback } from 'react';
import { loginState } from './../recoil/recoilSource';
import firebase from 'firebase/app';
import { auth } from 'firebase/firebaseAPI';
import { useSetRecoilState, useRecoilState } from 'recoil';
import useMessage from './useMessage';


export default () => {
    const [login, setLoginState] = useRecoilState(loginState)
    const message = useMessage();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const loginWithGoogle = useCallback(() => {
        auth.signInWithPopup(provider).then( async (result) => {
            if(result.user) {
                const loginInfo = {
                    uid : result.user.uid,
                    email : result.user.email?.split('@')[0],
                    nickname : result.user.displayName,
                    photoURL : result.user.photoURL,
                }
                setLoginState(loginInfo)
                message(`${loginInfo.nickname} 환영합니다`, { info : { success : true }})
            } else {
                message('로그인 실패 하셨습니다.', { info : { warn : true }})
            }
        }).catch(err => console.error(err))

        return login
    },[login, message, provider, setLoginState])
    return loginWithGoogle 
}