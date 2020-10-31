import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const showMenu = keyframes`
    from {
        transform : translateX(-100%);
    }
    to {
        transform : translateX(0%);
    }
`

const closeMenu = keyframes`
    from {
        transform : translateX(200%);
    }
    to {
        transform : translateX(0%);
    }
`

const MainMenu = styled.div`
    .main {
        animation : ${showMenu} 1s;
        width : 100vw;
        height : 100vh;
        background-color : rgba(0, 0, 0, 0.8);
        position : fixed;
        left : 0;
        top : 0;
        z-index : 100;
        display : ${props => props.theme.visible === true ? 'flex' : 'none'};
    
        div {
            display : flex;
            width : 100%;
            flex-direction : column;
            justify-content : space-around;
                section {
                    border : 0;
                    display : flex;
                    justify-content : center;
                    align-items : center;
                    font-size : 5rem;
                    width : 100%;

                    height : ${props => (50 / props.theme.menuLength)}%;
                        span {
                            a {
                                color : inherit;
                                text-decoration : none;
                            }
                            transition : transform .4s;
                            position : relative;
            
                            &::after {
                                position : absolute;
                                transition : width .4s;
                                content : "";
                                bottom : 0;
                                left : 0;
                                width : 0px;
                                background-color : rgba(233, 110, 70);
                                height : 6px;
                            }
                            &:hover {
                                cursor : pointer;
                                transform : translateY(-10px);
                                color : rgba(70, 110, 233);
                                transition : transform .4s, color 1s;
                            }
                        &:hover::after {
                            position : absolute;
                            width : 100%;
                            transition : width .4s;
                        }
                    }
                }
            }
        }


    .cancel {
        animation : ${closeMenu} 1.5s;
        position : fixed;
        right : 10px;
        top : 10px;
        width : 32px;
        height : 32px;
        display : flex;
        flex-direction : column;
        justify-content : space-evenly;
        align-items : center;
        z-index : 101;

        &:hover {
            cursor : pointer;
            .cancel-1 {
                transition : transform .2s;
                transform : translateX(-20px);
                background-color : rgba(233, 110, 70);
            }
            .cancel-2 {
                transition : transform .3s;
                background-color : rgba(110, 100, 203);
                transform : translateX(-15px);
            }
            .cancel-3 {
                transition : transform .4s;
                background-color : rgba(80, 150, 120);
                transform : translateX(-10px);
            }
        }
        
        div {
            transition : transform .3s;
            display : fixed;
            background : white;
            width : 90%;
            height : 4px;
        }
    }

    .close {
        animation : ${showMenu} 3.8s reverse;
    }
    .closeBurger {
        animation : ${closeMenu} 3.8s reverse;
    }
`

type MyMenuProps = {
    menus ?: string[];
    style ?: React.CSSProperties | object,
    visible ?: boolean;
    setVisible : (visible : boolean) => void;
}

const MyMenu = ({ menus = ["about", "contact"], style, visible, setVisible} : MyMenuProps) => {
    const [hamburger, setHamburger] = useState(false);

    const themeMemo = useMemo(() => ({
        menuLength : menus.length,
        visible
    }),[menus, visible])

    const onClickCancelBtn = useCallback(() => {
        if(!hamburger) {
            setHamburger(true);
            setTimeout(() => {
                setVisible(false)
            }, 1800);
        }
    },[hamburger])


    useEffect(() => {
        visible === false && hamburger === true && setHamburger(false) 
        visible === true && document.body.classList.add('not-scroll');
        visible === false && document.body.classList.remove('not-scroll');
    }, [hamburger, visible]);


    if(!visible) {
        return <></>
    }

    return (
        <MainMenu theme={themeMemo}>
        <div className={hamburger ? "main close" : "main"} style={style}>
            <div>
                {menus.map((menu, menuIndex) => 
                (<section className={'section-' + menuIndex} key={menu + menuIndex}>
                        <span onClick={onClickCancelBtn}>
                        <Link to={'/#' + menu}>
                            {menu}
                        </Link>
                        </span>
                </section>)
                )}
            </div>
        </div>
        <div className={hamburger ? "cancel closeBurger" : "cancel"} onClick={onClickCancelBtn}>
            <div className="cancel-1"></div>
            <div className="cancel-2"></div>
            <div className="cancel-3"></div>
        </div>
        </MainMenu>
    )
}

export default MyMenu
