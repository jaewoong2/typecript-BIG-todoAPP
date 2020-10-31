import React from 'react'
import styled, { keyframes } from 'styled-components'

const bottomAnimation = keyframes`
    0% {
        transform : scale(0);
    }
    100% {
        transform : scale(1);
    }

`

const MainMyCard = styled.div`
    width : inherit;
    height : inherit;
    display : flex;
    flex-direction : column;
    box-shadow : 0 2px 8px rgba(0, 0, 0, .4), 0 8px 20px rgba(0, 0, 0, .4);
    color : black;
    background : #fff;
    border-radius: 16px;

    .title {
        width : 100%;
        margin-top : 10px;
        margin-bottom : 15px;
        display : flex;
        justify-content : center;
    }

    .main { 
        width : 100%;
        height : inherit;
        margin-bottom : 3px;
        display : flex;
        justify-content : center;
        align-items : center;
    }

    .bottom {
        width : 100%;
        height : 30px;
        position : relative;
        display : flex;
        justify-content : center;
        padding-top : 10px;

        &::after {
            content : "";
            position : absolute;
            top : 0;
            width : 90%;
            height : 2px;
            background-color : rgba(23, 63, 112, 0.6);
            margin-bottom : 8px;

            animation : ${bottomAnimation} 2.5s forwards;
        }
    }
`
type MyCardProps = {
    title ?: JSX.Element | string | React.ReactNode;
    main ?: JSX.Element | string | React.ReactNode;
    bottom ?: JSX.Element | string | React.ReactNode;
    backgroundColor ?: string;
}


const MyCard = ({ title, main, bottom, backgroundColor } : MyCardProps) => {
    return (
        <MainMyCard style={{ backgroundColor : backgroundColor}}>
            {title && <section className="title">
                {title}
            </section>}
            <section className="main">
                {main}
            </section>
            {bottom && <section className="bottom">
                {bottom}
            </section>}
        </MainMyCard>
    )
}

export default MyCard
