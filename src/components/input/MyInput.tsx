import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'reducer'

const InputWrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    margin-top : 5px;
    border : 0;
    border-bottom : 1px solid #d9d9d9;

    .input {
        margin-left : 10px;
        border : 0;
        background-color : inherit;
        font-size : 0.95rem;
        width : 80vw;
        max-width : 350px;
        height : 40px;
        color: ${props => props.theme === true ? "white" : "black"};
    
        &:focus {
            outline : 0;
            color: ${props => props.theme === true ? "white" : "black"};
        }
    }

    &:focus-within {
        /* background-color : red; */
            outline : 0;
            border : 0;
            border-bottom : 1px solid #638bf7;
            color : #4472f1;
            transition : color 0.2s, border-bottom 0.2s;
            box-shadow : 0px 0.5px 0.3px #638bf7ee;
        }
    &:hover{
            outline : 0;
            border : 0;
            border-bottom : 1px solid #2a60f3;
            color : #4472f1;
            transition : color 0.2s, border-bottom 0.2s;
    }
`

interface InputCustomProps {
    icon? : JSX.Element | string;
    name? : string;
    placeholder? : string;
    value? : string;
    onChange? : () => void;
    suffix? : JSX.Element | string;
}


const InputCustom = ({icon, name, placeholder, value, onChange, suffix} : InputCustomProps) => {
    const { theme } = useSelector((state : RootState) => state.theme);

    return (
        <InputWrapper theme={theme} className="wrapper">
            {icon}
            <input 
            className="input"
            name={name} type={name}
            required value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            />
            {suffix}
        </InputWrapper>
    )

}

export default InputCustom