// import { loginFunction, auth } from 'api/api'
// import { isLoggedInState, loadingState, myState } from 'recoil/source'
// import useLogin from 'recoil/useLogin'
// import useLoggedin from '../../../recoil/useLoggedin'
import MyButton from 'components/UIComponent/button/MyButton'
import InputCustom from 'components/UIComponent/input/MyInput'
import MyLoading from 'components/UIComponent/Loading/MyLoading'
import userInput from '../../hooks/useInput'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import useMessage from '../../hooks/useMessage'
import styled from 'styled-components'
// import { googleLogin } from 'firebase/firebaseAPI'
import useRecoilLogin from 'hooks/useRecoilLogin'
import { GooglePlusOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { auth, loginFunction } from 'firebase/firebaseAPI'
import { useAuthState } from 'react-firebase-hooks/auth'

const LoginDiv = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    background : linear-gradient(rgba(66, 65, 45, 0.7), rgba(30, 65, 45, 0.7), rgba(66, 30, 45, 0.7));
    form {
        width : 35%;
        display : flex;
        justify-content : center;
        align-items : center;
        flex-direction : column;
        .input {
            font-family: 'Noto Serif KR', serif;
            color : black;
            font-size : 1.05rem;
            &::placeholder {
                color : black;
            }
        }
        button {
            margin-top : 20px;
            width : 100%;
            height : 45px;
            font-family: 'Noto Serif KR', serif;
            border-radius : 30px;
            color : #eee;
            box-shadow : 1px 1px 1px rgba(0, 0, 0, 0.2);
            font-size : 0.96rem;
            background : linear-gradient(to left, rgba(120, 120, 220, 0.5), rgba(122, 190, 220, 0.7), rgba(90, 200, 100, 0.7) ,rgba(50, 230, 100, 0.7));
            filter : saturate(30%);
            &:hover{
                filter : saturate(80%);
            }
        }
    }
    hr {
            margin-top: 30px;
            width : 35%;
            border : 0;
            border-bottom : 1px solid black;
        }

        .nav-btn-container {
            width : 35%;
            display : flex;
            justify-content : space-evenly;
            font-family: 'Noto Serif KR', Lato;
            align-items : center;
            .loginWith-google {
                font-size : 0.9rem;


                .loginWith-google-btn {
                    width : 40px;
                    height : 40px;
                    border-radius : 50%;
                    display : flex;
                    justify-content : center;
                    align-items : center;
                    background : rgba(50, 150, 150, 0.6);

                    .children {
                        font-size : 1.5rem;
                    }
                }
            }

            .loginWith-signUp {
                .loginWith-signUp-btn {
                    width : 40px;
                    height : 40px;
                    border-radius : 50%;
                    font-family : inherit;
                    font-size : 1rem;
                    letter-spacing : 1px;
                    font-size : 1.4rem;
                    display : flex;
                    justify-content : center;
                    align-items : center;
                        a {
                        text-decoration : none;
                        color : inherit;
                    }
                }
            }

        }

`


const LoginContainer = ({ history } : RouteComponentProps) => {
    const [email, setEmail, onChangeEmail] = userInput('')
    const [password, setPassword, onChangePassword] = userInput('')
    const [ user ] = useAuthState(auth)
     

    const googleLogin = useRecoilLogin();
    const [loading, setLoading] = useState(false);
    const message = useMessage();
    // const my = useRecoilValue(myState);
    // const loginToRecoil = useLogin();
    // const isLoggedin = useLoggedin()
    // const amIlogin = useRecoilValue(isLoggedInState);

    const onSubmitLogin = useCallback(async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        message('로그인 성공 하셨습니다')
        await loginFunction({email, password}).then((res) => {
            if(!res.status) message(res.message , {info : { warn : true }})
        });
        setLoading(false)
    },[email, password, message, setLoading])

    useEffect(() => {
        if(user) {
            history.replace('/')
        }
    },[user, history])

    const loginWithGoogle = useCallback(() => {
        googleLogin()
    },[googleLogin])


    return (
        <LoginDiv>
            {loading ? <MyLoading width={"40px"} height={"40px"} containerHeight={"120px"} containerWidth={"120px"}/> : (
                <>
                <form onSubmit={onSubmitLogin}>
                <InputCustom value={email} name="email" onChange={onChangeEmail} placeholder="이메일"></InputCustom>
                <InputCustom value={password} name="password" onChange={onChangePassword} placeholder="비밀번호"></InputCustom>
                <MyButton>로그인</MyButton>
                </form>
                <hr/>
                <nav className="nav-btn-container">
                    <div className="loginWith-google">
                        <MyButton className="loginWith-google-btn" onClick={loginWithGoogle}>
                            <GooglePlusOutlined/>
                        </MyButton>
                    </div>
                    <div className="loginWith-signUp">
                        <MyButton primary className="loginWith-signUp-btn">
                            <Link to="/signup">
                                <UsergroupAddOutlined />
                            </Link>
                        </MyButton>
                    </div>
                </nav>
                </>
            )}
        </LoginDiv>
    )
}

export default React.memo(withRouter(LoginContainer))