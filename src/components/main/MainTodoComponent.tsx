import React from 'react'
import styled from 'styled-components'


const MainDiv = styled.div`
    overflow : auto;
    display : flex;
    justify-content : center;
    width : 100%;


    div {
        width : 80%;    
        height : 40px;
        display : flex;
        align-items : center;
        border : 1px solid;
    }
`


type MainTodoComponentProps = {
    content : string;
    order : number;
}

const MainTodoComponent = ({ content, order } : MainTodoComponentProps) => {
    return (
        <MainDiv>
            <div>
            <span>{order + 1}번 할 일 - </span>
            {content}
            </div>
        </MainDiv>
    )
}

export default MainTodoComponent
