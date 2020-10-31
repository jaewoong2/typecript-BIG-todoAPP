import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const showDiplay = keyframes`
    from {
        transform : translateX(10%);
        opacity : 0;
    }
    to {
        transform : translateX(0%);
        opacity : 1;
    }
`


const showImage = keyframes`
    from {
        transform : translateX(10%);
        opacity : 0;
    }
    to {
        transform : translateX(0%);
        opacity : 1;
    }
`

const MainDiv = styled.div`
    width : 100%;
    height : 100%;
    position : relative;
    cursor : pointer;
    a {
        position : absolute;
        width : 100%;
        height : 100%;
        top : 0;
        left : 0;
    }
    
    .text-container {
        display : flex;
        flex-direction : column;
        margin : 0 0 0 30px;
        animation : ${showDiplay} 1.9s ease-in-out;
        transition : opacity .4s;
        strong {
            font-size : 1.35rem;
        }
        p {
            padding-top : 5px;
            padding-left : 5px;
            color : rgb(77, 77, 77);
            font-weight : 800;
        }
    }
    .image-container {
        display : flex;
        position : absolute;
        justify-content : flex-end;
        bottom : 0;
        right : 10px;
        width : 350px;
        
        img {
            transition : opacity .4s;
            animation : ${showImage} 1.8s ease-in-out;
            border-radius : 5px;
            max-width : 100%;
            max-height : 350px;
            width : auto;
            height : auto;
            box-shadow : 5px 5px 4px rgba(0, 0, 0, 0.4);
            &:focus {
                outline : 0;
            }
        }
    }
    .current-number {
        width : 40px;
        display : flex;
        justify-content : center;
        position : absolute;
        bottom : 5px;
        left : 30px;
        font-size : 1.6rem;
        font-weight : lighter;
        color : rgba(0, 0, 0, 0.6);
        &::before {
            position : absolute;
            content : '';
            width : 32px;
            height : 32px;
            border : 4px solid black;
            border-radius : 50%;
            left : 0;
        }
    }
`


type BannerSliderProps = {
    textOne ?: string; 
    textTwo ?: string; 
    smallText ?: string; 
    imageSource ?: string;
    href ?: string;
    imageStyle ?: React.CSSProperties;
};

const BannerSlider = ({ textOne, textTwo, smallText, imageSource, href = "#", imageStyle } : BannerSliderProps) => {

    return (
        <MainDiv style={{}} draggable="false">
            <a draggable="false" href={href}>{""}</a>
            <div className="text-container">
                <strong>{textOne}</strong>
                <strong>{textTwo}</strong>
                <p>{smallText}</p>
            </div>
            <div className="image-container">
                <img style={imageStyle} draggable="false" alt={imageSource} src={imageSource}/>
            </div>
        </MainDiv>
    )
}

export default BannerSlider