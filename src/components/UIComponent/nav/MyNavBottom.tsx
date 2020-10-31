import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const BottomNav = styled.header`
    position : fixed;
    width : 100%;
    bottom : 0;
    left : 0;
    right : 0;
    z-index : 40;
    background : #fff;
    border-top : 1px solid #eee;
    display : flex;
    justify-content : center;

    .lists-wrppaer {
        width : 80%;
        display : flex;
        justify-content : space-evenly;
    }

    .list-container {
        margin-right : 10px;
        div {
            display : flex;
            flex-direction : column;
            align-items : center;
            &:hover {
                cursor : pointer;
            }
            margin-top: 5px;
        }

        span {
            margin : 0;
            filter : grayscale(70%);
            padding : 0;
            transition : filter 1.4s;
        }

        p {
            font-family: Lato,NotoSansKR,Apple SD Gothic Neo,Malgun Gothic,sans-serif;
            font-size: 0.95rem;
            letter-spacing : -1;
        }

        a {
            text-decoration : none;
            color : inherit;
        }
    }
    .clicked {
        span {
            filter : brightness(110%) grayscale(0%);
        }
    }
`
type MyNavBottomProps = {
    lists ?: JSX.Element[];
    children ?: React.ReactNode;
}

const MyNavBottom = ({ children, lists } : MyNavBottomProps) => {
    const [clickIndex, setClickIndex] = useState(0);

    const onClickMenuBtn = useCallback((index : number) => (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setClickIndex(index)
    },[])

    return (
        <BottomNav>
            <div className="lists-wrppaer">
                {lists?.map((list : JSX.Element, index : number) => (
                <div key={index + 'navbottom'} onClick={onClickMenuBtn(index)} className={clickIndex === index ? "list-container clicked" : "list-container"}>
                    {list}
                </div>   
                ))}
            </div>
        </BottomNav>
    )
}

export default MyNavBottom
