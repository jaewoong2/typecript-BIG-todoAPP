import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { THEME_CHANGE } from '../../reducer/theme';
import { BulbTwoTone } from '@ant-design/icons'

const flicker = keyframes`
    from {
        opacity : 0;
    }
    to {
        opacity : 1;
    }
`

const MainNav = styled.nav`
    /* position : fixed; */
    top : 0;
    width : 100vw;
    background-color : ${props => props.theme === true ? "black" : "#a8acad"};

     .title {
        display : flex;
        width : 100%;
        justify-content : space-between;
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
            font-size : 45px;
            margin-right : 30px;
            padding-top : 10px;
            filter : drop-shadow(5px 5px 6px #d8d8d8d9); 

            &:focus {
                outline : 0;
            }

            &:hover {
                transform : rotate(-15deg);
            }
        }
     }

     .page {
        /* position : fixed; */
        width : 100%;
        /* top : 0; */
        margin-top : 0px;
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
                <div></div>
                <h4>Woong's Page</h4>
                <BulbTwoTone onClick={onToggleTheme} twoToneColor={theme ? "#bdbdbdbd" : "gray"} className="theme-changer"></BulbTwoTone>
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
