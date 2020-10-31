import { logoutUserFunction } from 'firebase/firebaseAPI';
import useMessage from 'hooks/useMessage';
import React, { useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from 'recoil/recoilSource';
import styled, { css } from 'styled-components';

const UserPhotoContainer = styled.article`
position : relative;
/* position : relative;
    &::after {
        content : "로그아웃";
        position : absolute;
        transition : opacity 0.5s;
        left : -63px;
        font-size : 0.95rem;
        font-family: 'Noto Serif KR',serif;
        opacity : 0;
    }

    &:hover::after {
        opacity : 1;
        cursor : pointer;
        width : 100px;
        transition : opacity 0.5s;
        height : 30px;
    } */


    .user-click-menu {
        opacity : 0;
        visibility : none;

        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : flex-start;
        /*  배치 가운데 */
        position : absolute;
        right : -10000px;
        width : 160px;
        padding-left : 0;
        background-color : rgba(100, 100, 195, 0.9);
        border-radius : 20px; 
        z-index : -3;
        box-shadow : 1px 7px 5px rgba(0, 0, 0, 0.4);

        .user-click-menu-list {
            width : 100%;
            list-style : none;
            margin-left : 20px;
            font-family: Lato , 'Noto Serif KR';
            font-size : 1rem;
            word-break : keep-all;
            margin-bottom : 10px;
            color : rgba(220, 230, 230, 0.8);
            letter-spacing : 1.2px;
            cursor : default;
        }

        .img-container {
            width : 100%;
            display : flex;
            justify-content : center;
            margin : 0;
            margin-left : 10px;
            margin-top : 15px;
        }
        .logout {
            font-family: 'Noto Serif KR', Lato;
            cursor: pointer;
            transition : color 0.5s;
            margin-bottom : 15px;
            &:hover {
                color : rgba(150, 200, 255, 0.8);
                transition : color 0.5s;
            }
        }
    }

    .user-photo {
        margin-bottom : 10px;
        width : 30px;
        height : 30px;
        border-radius : 50%;
        box-shadow : 2px 2px 3px rgba(0, 0, 0, 0.5);
        margin-right : 20px;
        cursor : pointer;

        &:hover {
            filter : brightness(0.7);
            transition : filter 0.4s;
        }

        transition : filter 0.4s;
    }

    ${props => props.theme.activeMyState === true && css`
        .user-click-menu {
            opacity : 1;
            transition : opacity 0.5s linear;
            visibility : visible;
            top : 10px;
            right : 20px;
            z-index : 20;
        }
        .user-photo-btn {
            filter : brightness(0.7);
            &:hover {
                filter : brightness(1);
            }
        }
    `}  
`
const UserComponent = () => {
    const [loginInfo, setLoginState] = useRecoilState(loginState);
    const [clickMyState, setClickMyState] = useState(false);

    const message = useMessage();

    const onClickLogOut = useCallback(() => {
        logoutUserFunction();
        message('로그아웃 하였습니다.')
    },[message])

    const themeMemorise = useMemo(() => ({
        activeMyState : clickMyState
    }),[clickMyState])

    return (
        <UserPhotoContainer theme={themeMemorise} className="user-photo-container">
            <img  
            onClick={() => setClickMyState(prev => !prev)}
            className="user-photo user-photo-btn"
            alt="user" 
            src={loginInfo.photoURL !== null ? loginInfo.photoURL : ''}>
            </img>
        <ul className="user-click-menu">
            <li className="user-click-menu-list img-container">  
                <img  
                className="user-photo"
                alt="user"
                src={loginInfo.photoURL !== null ? loginInfo.photoURL : ''}>
                </img>
            </li>
            <li className="user-click-menu-list">
                <span role="img" aria-label="nickname-img" className="phargaraph nick">
                    👓 {loginInfo.nickname}
                </span>
            </li>
            <li className="user-click-menu-list">
                <span role="img" aria-label="email-img"className="phargaraph email">
                    🎉 {loginInfo.email}
                </span>
            </li>
            <li className="user-click-menu-list" onClick={onClickLogOut}>
                <span role="img" aria-label="logout-img" className="phargaraph logout">
                    🔑 로그아웃
                </span>
            </li>
        </ul>
        </UserPhotoContainer>
    )
}

export default UserComponent
