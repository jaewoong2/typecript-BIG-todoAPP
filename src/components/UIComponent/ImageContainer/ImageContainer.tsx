import React, { useMemo } from 'react'
import styled from 'styled-components'

const MainDiv = styled.div`
    display : flex;
    flex-direction : column;
    align-items : ${props => props.theme.position};
    justify-content : center;
    width : 100%;
    position : relative;
    margin : ${props => props.theme.margin};
    .relax-container {
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
        z-index : 2;
        margin-left : ${props => props.theme.position === 'flex-start' ? '30px' : '0px'};
        margin-right : ${props => props.theme.position === 'flex-end' ? '30px' : '0px'};
    }
    img {
        width : auto;
        height : auto;
        max-height : 100%;
        max-width : ${props => props.theme.imageMaxWidth};
        margin-bottom : 10px;
        box-shadow : ${props => props.theme.boxShadow === true ? "2px 2px 4px #777" : "none"};
    }
    .text-container {
        display : flex;
        flex-direction : column;
        align-items : center;
        font-family: 'Noto Serif KR', serif;
        justify-content : center;
        strong {
            font-size : 1.4em;
            margin-bottom : 5px;
        }
        .pharagraph {
            font-size : 0.85em;
            color : rgba(44, 44, 44, 0.7);
            word-break : break-all;
            text-align : center;
        }
    }
    .background-line {
        display : ${props => props.theme.backgroundLine === true ? 'block' : 'none'};
        width : 100%;
        height : 150px;
        position : absolute;
        background-color : ${props => props.theme.backgroundLineColor};
        transform : ${props => `rotate(${props.theme.backgroundLineRotate + 5}deg)`}
    }
    @media screen and (max-width : 900px) {
        .background-line {
            width : 150%;
        }
    }
`

type RelaxContentProps = {
    image ?: string;
    StrongText ?: JSX.Element | string;
    explain ?: JSX.Element | string;
    position ?: 'end' | 'start' | 'center';
    backgroundLineColor ?: string;
    backgroundLine ?: boolean;
    backgroundLineRotate ?: number;
    imageMaxWidth ?: string;
    style ?: React.CSSProperties | object;
    margin ?: string;
    boxShadow ?: boolean;
}
const ImageContainer = ({ boxShadow, style, backgroundLine = true, margin = '70px 0 0 0', imageMaxWidth = '100%', backgroundLineColor =  'rgb(230, 234, 220)', backgroundLineRotate = 0, position, image, StrongText, explain} : RelaxContentProps) => {

    const themeMemo = useMemo(() => ({
        position : position === 'start' ? 'flex-start' : position === 'end' ? 'flex-end' : 'center',
        backgroundLineColor,
        backgroundLine,
        backgroundLineRotate,
        imageMaxWidth,
        margin,
        boxShadow,
    }),[position, boxShadow, backgroundLine, margin, backgroundLineRotate, backgroundLineColor, imageMaxWidth])

    return (
        <MainDiv theme={themeMemo}>
            <div style={style} className="relax-container">
                <img src={image} alt={image}/>
                <div className="text-container">
                 <strong>{StrongText}</strong>
                 <div className="pharagraph">{explain}</div>
                </div>
            </div>
            <div className="background-line"/>
        </MainDiv>
    )
}

export default ImageContainer