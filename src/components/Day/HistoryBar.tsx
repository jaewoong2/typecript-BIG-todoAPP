import React, { useCallback, useEffect, useMemo } from "react"
import { useRecoilValue } from "recoil"
import { useSetRecoilState } from "recoil"
import { historyType } from "recoil/atomType"
import { dateState, historyStackState } from "recoil/recoilSource"
import styled, { css } from "styled-components"

const HistorySection = styled.footer`
        display : flex;
        position : fixed;
        z-index : 2;        
        flex-direction : column;
        align-items : flex-end;
        margin-top : 50px;
        top : 0;
        right : 0;
        

        .history-stack {
            width : fit-content;
            position : relative;
            margin-right : 23px;
            /* margin-left : 10px; */
            padding : 1px 3px 3px 3px;
            font-size : 1.3rem;
            font-weight : 900;
            color : rgba(222, 222, 222, 0.7);
            font-family : 'Noto Serif KR', serif;
            text-shadow : 2px 2px 3px rgba(20, 0, 0, 0.8);
            margin-bottom : 2px;
        }

        .now {
            &::after {
                content : "";
                position : absolute;
                bottom : 0;
                left : 0;
                width : 100%;
                height : 3px;
                border-radius : 20px;
                background-color : rgba(100, 50, 200, 0.5);
            }
        }
`

const MainDiv = styled.div`
    position : relative;

    ${props => props.theme.visible === false && css`
        opacity : 0;
        visibility : none;
        transition : opacity .4s;
    `}
    transition : opacity .4s;

    &:hover {
        .hover-close {
            opacity : 1;
            visibility : visible;
            transition : opacity .3s;
        }
    }

    .hover-close {
        position : absolute;
        font-size : 0.95rem;
        top : -10px;
        right : -5px;
        color : rgba(255, 30, 70, 0.5);
        visibility : none;
        opacity : 0;
        transition : opacity .3s;
        cursor: pointer;
    }

    .delete {
        opacity : 0;
        transition : opacity .3s;
    }
`

type HistoryBarProps = {
    className : string;
    stack : historyType;
    index : number;
}

const HistoryBar = () => {
    const historyStack = useRecoilValue(historyStackState)

    return (
    <HistorySection>
        {historyStack.map((stack : historyType , index : number ) => (
        <BarComponent 
            stack={stack} 
            index={index}
            className={`history-stack ${index === historyStack.length - 1 ? 'now' : ''}`}
            />
            ))}
        </HistorySection>)
}

export default HistoryBar


const BarComponent = ({className, stack, index} : HistoryBarProps) => {       
    const setHistoryStack = useSetRecoilState(historyStackState)
    const setSelectedDate = useSetRecoilState(dateState)

    const onClickHistroy = useCallback(() => {
        setSelectedDate(stack.dayDate)
    },[setSelectedDate, stack])

    const onClickPopHistoryStack = useCallback(() => {
        setHistoryStack(prev => prev.map((stacks, i) => ((prev.length > 1) && i === index) ?
         {...stacks, visible : false } : stacks ))
    },[setHistoryStack, index])

    useEffect(() => {
        const timer = setTimeout(() => {
            setHistoryStack((prev) => {
                const returnStack = [...prev];
                if(!stack.visible) returnStack.splice(index, 1);
                return returnStack
            });
        }, 300)
        return () => clearTimeout(timer)
    },[setHistoryStack, stack, index])

    const themeMemorise = useMemo(() => ({
            visible : stack.visible
        }),[stack])

    return (
        <MainDiv theme={themeMemorise} className={`${className}`}>
            <span 
            onClick={onClickHistroy}
            >{stack?.dayString?.substr(stack.dayString.length - 4, 2)}</span>
            <span 
            onClick={onClickPopHistoryStack}
            className={`hover-close`}>x</span>
        </MainDiv>
    )
}