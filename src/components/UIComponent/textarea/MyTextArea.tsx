import React from 'react'
import styled from 'styled-components'

const MyTextAreaWrapper = styled.div`
    width : ${props => props.theme.width};
    height : ${props => props.theme.height};
    textarea {
        width : 100%;
        height : 100%;
        font-weight : 800;
        resize : none;
        border : 2px solid rgba(50, 123, 90, 0.6);
        border-radius : 5px;
        box-shadow : 2px 2px 3px rgba(50, 150, 100, 0.2);
        padding : 10px 5px 5px 10px;
        outline : 0;
        transition : border .5s, box-shadow .5s;
        &:focus {
            border : 2px solid rgb(50, 90, 123);
            box-shadow : 2px 2px 3px rgba(50, 100, 150, 0.2);
            transition : border .5s, box-shadow .5s;
        }
    }
`
type MyTextAreaProps = {
    width ?: number | string;
    height ?: number | string;
    text ?: string | number | readonly string[] | undefined;
    onChangeText ?: () => void;
}

const MyTextArea = ({ width , height, text, onChangeText } : MyTextAreaProps) => {
    return (
        <MyTextAreaWrapper theme={{width, height}}>
            <textarea value={text} onChange={onChangeText}></textarea> 
        </MyTextAreaWrapper>
    )
}

export default MyTextArea
