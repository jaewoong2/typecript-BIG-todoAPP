import React, { useCallback, useMemo, useState } from 'react'
import ReactQuill from 'react-quill';
import styled from 'styled-components';

const QuillWrapper = styled.div`
        .ql-editor {
            min-height : ${props => props.theme.minHeight};
        }
`

type TextEditerProps = {
    value ?: string;
    setValue ?: React.Dispatch<React.SetStateAction<string>>;
    style ?: React.CSSProperties;
    minHeight ?: string | number;
}

const TextEditer = ({ minHeight = '400px', value, setValue, style = {}} : TextEditerProps ) => {

    const textStyle = useMemo(() => style, [style]);
    const quillWrapperTheme = useMemo(() => ({
            minHeight
        }), [minHeight]);

    const onChangeValue = useCallback((targetValue) => {
        setValue && setValue(targetValue)
    },[setValue])

    return (
        <QuillWrapper theme={quillWrapperTheme} style={textStyle}>
            <ReactQuill 
            value={value}
            placeholder="오늘 하루를 이야기 해주세요"
            onChange={onChangeValue}
            theme="snow" />
        </QuillWrapper>
    )
}

export default TextEditer
