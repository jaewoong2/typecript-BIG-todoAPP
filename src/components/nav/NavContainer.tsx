import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { THEME_CHANGE } from '../../reducer/theme';

const flicker = keyframes`
    from {
        opacity : 0;
    }
    to {
        opacity : 1;
    }
`

const MainNav = styled.nav`
    position : fixed;
    top : 0;
    width : 100vw;
    background-color : ${props => props.theme === true ? "black" : "#a8acad"};

     .title {
        display : flex;
        width : 100%;
        justify-content : center;
        font-size : 40px;
        letter-spacing : 5px;
        position : relative;
        text-shadow : 2px 4px 5px #777;

        h4 {
            /* 패딩이랑 마진이 있음 */
            margin : 0;
            padding : 0;

            &::after {
                content : "";
                background-color : #393;
                width : 2px;
                height : 80%;

                border-radius : 30px;
                position : absolute;
                bottom : 0;
                animation : ${flicker} 1.4s infinite;
            }
        }

        .theme-changer {
            position : absolute;
            right : 0;
            margin-right : 10px;
        }
     }

     .page {
        width : 100%;
        margin-top : 15px;
        display : flex;
        justify-content : space-around;

        div {
            padding-right : 30px;
            font-size : 25px;
            position : relative;
            letter-spacing : 5px;

                
                &:hover {
                    cursor : pointer;
                    transform : translateY(-3px);
                    transition : transform 0.5s;


                    &::after{
                        content : "";
                        background-color : ${props => props.theme ? '#d9d9d9' : '#dfff'};
                        width : 2px;
                        height : 70%;
                        

                        border-radius : 30px;
                        position : absolute;
                        bottom : 0;
                        animation : ${flicker} 1.4s infinite;
                    }
                }
            }
        }
 `;

const NavContainer = () => {
    const { theme } = useSelector((state : RootState) => state.theme);
    const dispatch = useDispatch();


    const onToggleTheme = useCallback(() => {
        dispatch({
            type : THEME_CHANGE
        })
    },[])



    return (
        <>
        <MainNav theme={theme}>
            <div className="title">
                <h4>Woong's Page</h4>
                <div onClick={onToggleTheme} className="theme-changer">{theme ? '달'  : '태양'}</div>
            </div>
            <div className="page">
                <div>About</div>
                <div>Main</div>
                <div>Contact</div>
            </div>
        </MainNav>
        </>
    )
}

export default NavContainer
