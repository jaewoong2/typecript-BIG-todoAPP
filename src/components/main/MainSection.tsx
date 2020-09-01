import React, { useCallback, useState, useEffect } from 'react'
import MyInput from 'components/input/MyInput'
import userInput from 'hooks/userInput'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { ADD_TODO } from 'reducer/todo';
import MainTodoComponent from './MainTodoComponent';
import styled, { keyframes } from 'styled-components';

const persentageAnimaiton = keyframes`
    from {
        width : 0%;
    }
    to { 
        width : 30%;
    }
`;

const MainDiv = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    align-items : center;

    .todo-wrapper {
        width : 100%;
        height : 100%;
        display : flex;
        margin-top : 30px;
        flex-direction : column;
        align-items : center;
    }

    .study-persentage-wrapper {
        width : 80%;
        height : 100px;
        border : 5px solid black;

        .study-persentage {
            height : 100%;
            animation : ${persentageAnimaiton} 2s infinite;
            background-color : red;
        }
    }
`

const MainSection = () => {
    const [value, setValue, onChangeValue] = userInput('');
    const { todos } = useSelector((state : RootState) => state.todo);
    const dispatch = useDispatch();
    
    const onClickRegister = useCallback(() => {
            dispatch({
                type : ADD_TODO,
                content : value,
            })
            setValue('');
    },[value]);

    return (
        <MainDiv>
            <MyInput
            icon={<span role="img" aria-label="scehdule">📰</span>}
            suffix={<div onClick={onClickRegister}>✔</div>}
            value={value}
            onChange={onChangeValue}
            placeholder="할 일 등록"/>
            {/*  */}
            <div className="study-persentage-wrapper">
                <div className="study-persentage"></div>
            </div>
            {/*  */}
            <div className="todo-wrapper">
                {todos.map((todo, todoIndex) => 
                <MainTodoComponent key={"todo.content + '_' + todo.order"} content={todo.content} order={todoIndex} />
                )}
            </div>
        </MainDiv>
    )
}

export default MainSection
