import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    0% {
        height : 40%
    }
    50%,
    100% {
        height : 70%
    }
`

const loadingSpan = keyframes`
    0% {
    }
    50% {
    }
    100% {
    }

`
const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
        border-top: 10px solid rgba(255, 250, 120, 0.6); 
    }
    75% { 
        transform: rotate(270deg);
        border-top: 10px solid rgba(130, 190, 255, 0.6);
    }
    100% {
        transform: rotate(360deg); 
        border-top: 10px solid rgba(255, 200, 200, 0.6); 
    }
`

const LoadingWrapper = styled.div`
    width : ${props => props.theme.containerWidth};
    height : ${props => props.theme.containerHeight};

    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    
    span {
        font-family : 'Noto Serif KR', Lato;
        margin-top : 10px;
        text-shadow : 2px 2px 2px rgba(0, 0, 0, 0.9);
        letter-spacing : 2px;
        &::after {
            content : "";
            animation : ${loadingSpan} 2s linear infinite; 
            width : 100%;
            height : 100%;

        }
    }

    div {
        /* width : 60px; */
        /* height : 60px; */
        width : ${props => props.theme.width};
        height : ${props => props.theme.height};
        border: 10px solid ${props => props.theme.color}; /* Light grey */

        border-radius : 50%;
        animation : ${spin} 1.5s linear infinite;
        position: relative;
    }
    /* div {
        width : 15%;
        height : 50%;
        border-radius : 25px;
        box-shadow : 3px 3px 3px rgba(0, 0, 0, 0.5), inset -3px -3px 3px rgba(0, 0, 0, 0.5);
        margin-left : 5px;
        margin-right : 5px; */

        /* 블랙모드 있을 떄, */
        /* background-color : ${props => Boolean(props.theme.color) === true ? props.theme.color : 'rgba(200, 200, 200, 0.9)'}; */
       /*  블랙모드 구현 하지 않을 때 */
        /* background-color : ${props => (props.theme.color ? props.theme.color : 'rgba(11, 10, 10, 1)')}; */
        /* transition : height 0.3s;
        animation : ${loadingAnimation} 0.8s infinite;
    }

    div:nth-child(1) {
        animation-delay : -0.24s;
    }
    div:nth-child(2) {
        animation-delay : -0.12s;
    }
    div:nth-child(3) {
        animation-delay : 0s;
    } */
`

type MyLoadingProps = {
    color ?: string;
    width ?: number | string;
    height ?: number | string;
    containerWidth ?: number | string;
    containerHeight ?: number | string;
}

const MyLoading = ({ color = "#f3f3f3f3", width = "100%", height = "100%", containerWidth, containerHeight} : MyLoadingProps ) => {

    const themeMemo = useMemo(() => {
        return {
            color : color,
            height,
            width,
            containerWidth,
            containerHeight
        }
    },[color, width, height, containerWidth, containerHeight])

    return (
        <LoadingWrapper theme={themeMemo}>
            {/* <div></div>
            <div></div>
            <div></div>             */}
            <div></div>
            <span></span>
        </LoadingWrapper>
    )
}

export default MyLoading
