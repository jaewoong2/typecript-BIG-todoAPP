import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BulbTwoTone } from '@ant-design/icons'

const flicker = keyframes`
    from {
        opacity : 0;
    }
    to {
        opacity : 1;
    }
`
const smoothScroll = keyframes`
    0% {
        transform : translateY(-40px);
    }
    100% {
        transform : translateY(0px);
    }
`
const upButton = keyframes`
    0% {
        transform : translateX(-100px);
    }
    100% {
        transform : translateX(0%);
    }
`
const MainNav = styled.nav`
    top : 0;
    width : 100%;
    background-color : #eee;

     .title {
        display : flex;
        width : 100%;
        justify-content : center;
        font-size : 40px;
        letter-spacing : 5px;
        position : relative;
        text-shadow : 2px 4px 5px #777;
        padding-top : 15px;

        h4 {
            /* 패딩이랑 마진이 있음 */
            margin : 0;
            padding : 0;
            padding-bottom : 10px;

            &::after {
                content : "";
                background-color : #393;
                width : 2px;
                height : 40%;
                margin-bottom : 15px;
                border-radius : 30px;
                position : absolute;
                bottom : 0;
                animation : ${flicker} 1.4s infinite;
            }
        }

        .theme-changer {
            font-size : 45px;
            margin-right : 30px;
            position : absolute;
            right : 0;
            filter : drop-shadow(5px 5px 6px #d8d8d8d9); 

            &:focus {
                outline : 0;
            }

            &:hover {
                transform : rotate(-15deg);
            }
        }
     }

     .menu {
        display : flex;
        width : 100%;
        justify-content : space-between;
        font-size : 24px;
        letter-spacing : -.4px;
        transition: all 1s ease;

        .menu-subject {
            width : inherit;
            height : inherit;
        }
     }

     .fixed {
        position : fixed;
        top : 0;
        z-index : 100;

        /* background-color : ${props => props.theme.black === true ?  'rgba(244, 244, 244, 0.7)': 'rgba(25, 25, 25)'} ;
        border-bottom : 1px solid ${props => props.theme.black === false ?  'rgb(244, 244, 244)': 'rgb(25, 25, 25)'};
        color : ${props => props.theme.black === false ?  'rgb(244, 244, 244)': 'rgb(25, 25, 25)'} ; */

        background-color : rgba(244, 244, 244, 0.7);
        border-bottom : rgb(25, 25, 25);
        color : rgb(25, 25, 25);

        animation : ${smoothScroll} 1s forwards;
     }

    .scrollToTop {
        display : none;
        bottom : 15px;
        left : 15px;
        font-size : 32px;
        filter : drop-shadow(2px 2px 3px #777);
    }

    .btnfix {
        display : flex;
        position : fixed;
        animation : ${upButton} 1s;
        &:hover {
            cursor : pointer;
        }
    }
 `;

type NavContainerProps = {
    title ?: JSX.Element | string;
    subject ?: JSX.Element | string;
    upScrollFix ?: boolean// 다운스크롤의 반대;
    downScrollFix ?: boolean // 업스크롤의 반대;
    scrollToTop ?: boolean

}

const NavContainer = ({ scrollToTop, title = <h4>Title</h4>, subject = "subject", upScrollFix = false, downScrollFix=true} : NavContainerProps) => {
    const [scrollFix, setScrollFix] = useState(false);
    
    const [oldScroll, setOldScroll] = useState(0);
    const mainNavRef = useRef<any>(<div/>);
    

    useEffect(() => {
        const { current } = mainNavRef;
        const scrollNavFix = () => {
            if(current) {
                if(window.scrollY > current?.clientHeight) {
                downScrollFix && setScrollFix(true) // 내렸을 때 fix
                    
                if(upScrollFix) {
                setOldScroll(window.scrollY)
                oldScroll > window.scrollY ? setScrollFix(true) : setScrollFix(false)
                // 밑에 있는 상태에서 스크롤을 올리면 fix
            }
                } else {
                    setScrollFix(false)
                }
            }
        }

        window.addEventListener('scroll', scrollNavFix)
        return () => window.removeEventListener('scroll', scrollNavFix)

    },[mainNavRef, oldScroll, downScrollFix, upScrollFix ])


    const themeMemo = useMemo(() => {
        return {
            scrollFix
        }
    },[scrollFix])

    const onClickScrollToTop = useCallback(() => {
        scrollToTop && window.scrollTo({ top: 0, behavior: 'smooth'})
    },[scrollToTop])

    return (
        <>
        <MainNav ref={mainNavRef} theme={themeMemo}>
            <div className="title" >
                {title}
            </div>
            <div className={scrollFix ? "menu fixed" : "menu"}>
                <div className="menu-subject">
                {subject}
                </div>
            </div>
            {scrollToTop &&<span role="img" aria-label="up" className={scrollFix ? "scrollToTop btnfix" : "scrollToTop"} onClick={onClickScrollToTop}>
            🔺
            </span>}
        </MainNav>
        </>
    )
}

export default NavContainer
