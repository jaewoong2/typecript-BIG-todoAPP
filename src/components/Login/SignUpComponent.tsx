import MySignUp from 'components/UIComponent/form/MySignUp'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SignUpDiv = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    background : linear-gradient(rgba(66, 65, 45, 0.7), rgba(30, 65, 45, 0.7), rgba(66, 30, 45, 0.7));
    form {
        width : 60%;
        .input {
            font-family: 'Noto Serif KR', serif;
            color : black;
            font-size : 1.05rem;
            &::placeholder {
                color : black;
            }
        }
        .submit {
            width : 100%;
            display : flex;
            justify-content : flex-end;
                button {
                    margin-top : 20px;
                    width : 100%;
                    height : 50px;
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
        }
        hr {
            margin-top: 30px;
            width : 50%;
            border : 0;
            border-bottom : 1px solid black;
        }
        .login {
            font-family: 'Noto Serif KR', serif;
            font-size : 0.9rem;
            width : 50%;
            span {
                float : right;
                margin-top : 7px;
                margin-right : 3px;
                &:hover {
                    color : white;
                    cursor : pointer;
                    transition: color .5s;
                }
                transition: color .5s;
                a {
                    text-decoration : none;
                    color : inherit;
                }
            }
        }
`

const SignUpContainer = () => {
    return (
        <SignUpDiv>
            <MySignUp/>
            <hr/>
            <div className="login">
                <span><Link to="/login">로그인</Link></span>
            </div>
        </SignUpDiv>
    )
}

export default SignUpContainer