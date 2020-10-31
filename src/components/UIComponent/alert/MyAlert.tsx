import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { messageState } from 'recoil/recoilSource'
import styled, { css, keyframes } from 'styled-components'

const showAlertRight = keyframes`
    from {
        transform : translateX(100%);
    }
    to {
        transform : translateX(0%);
    }
`

const cancelAlert = keyframes`
    0% {
        opacity : 1;
    }
    99% {
        opacity : 0;
    }
    to {
        display : none;
    }
`

const showAlertLeft = keyframes`
    from {
        transform : translateX(-100%) rotateY(180deg);
    }
    to {
        transform : translateX(0%) rotateY(180deg);
    }
`

const persentageBar = keyframes`
    from {
        transform : translateX(100%);
    }
    to {
        transform : translateX(0%);
    }
`

const MainDiv = styled.div`
        position: fixed;
        bottom: 50px;
        height: 40px;
        box-shadow: rgba(0, 0, 0, 0.9) 2px 2px 4px;
        background-color: rgba(255, 255, 255, 0.75);
        display : ${props => props.theme.timeOut.cancel === true ? 'none' : 'flex'};
        border-radius: 6px 0px 0px 2px;
        align-items: center;
        font-size: 0.85rem;
        letter-spacing: -0.4px;
        transition : transform 0.4s;
        z-index : 200;
        ${props => props?.theme?.options.position.bottomLeft === true ? css `
        left : 0;
        animation: ${showAlertLeft} 1s forwards, ${props => props.theme.timeOut.animation === true ? cancelAlert : ''} 1.2s forwards;
        ` : css `
        right : 0;
        animation: ${showAlertRight} 1s forwards, ${props => props.theme.timeOut.animation === true ? cancelAlert : ''} 1.2s forwards;
        `};

        .persentageBar {
            position: absolute;
            top: 0px;
            right: 0;
            width : 95%;
            height: 3px;
            background-color : ${props => props.theme.options?.info?.success === true ?  "rgba(30, 125, 30, 0.8)" :
                                 props.theme.options?.info?.warn === true ? "rgba(125, 30, 30, 0.8)" :
                                 "rgb(65, 65, 123)"};
            transform: rotate(180deg);
            transition-delay: width -1s;
            animation: ${persentageBar} 3s;
            margin-left: 25px;
        }

        .subDiv {
            margin : ${props => props?.theme?.options.position.bottomLeft === true ? '0 5px 0 20px': '0 10px 0 25px' };
            transform : ${props => props?.theme?.options.position.bottomLeft === true ? 'rotateY(180deg)': 'none' };
        }
`


export type optionsProps = {
    position ?: {
        bottomRight ?: boolean,
        bottomLeft ?: boolean,
    };
    info ?: {
        success ?: boolean,
        warn ?: boolean,
        normal ?: boolean,
    };
    timeOut ?: number;
    cancleable ?: boolean;
    emoji ?: boolean;
    visible ?: boolean,
}

type MyAlertProps = {
    text ?: string;
    options ?: optionsProps;
    style ?: React.CSSProperties | object,
    // setMessages ?: Dispatch<SetStateAction<{ message?: string | undefined; options?: optionsProps | undefined; }[]>>
    index ?: number;
}


const MyAlert = ({ text, options, style, index = 0} : MyAlertProps) => {
    const [animation, setAnimation] = useState(false);
    const [cancel, setCancel] = useState(false);
    const setMessages = useSetRecoilState(messageState);

    useEffect(() => {
        if(cancel === false) {
            if(options?.timeOut) {
                const timer1 =setTimeout(() => {
                setAnimation(true)
            }, options?.timeOut);
    
            const timer2 =setTimeout(() => {
                setCancel(true)
            },  options?.timeOut + 1000)
    
            return () => {
                clearTimeout(timer1)
                clearTimeout(timer2)
            }
        }
    }
    },[options, cancel])

    useEffect(() => {
        setMessages(prev => prev.map((message, i) => {
            if(i === index) {
                if(cancel) {
                    const returnMessage = {
                        message : message.message, 
                        options : {...message.options, visible : false }
                    } 
                    return returnMessage
                }
            }
                return message
            }))
    }, [cancel, setMessages, index])

    const onClickMain = useCallback(() => {
        if(options?.cancleable && !cancel) {
            setAnimation(true)
            const timer1 = setTimeout(() => {
                setCancel(true)
            },  1000)
            return () => clearTimeout(timer1)
        }
    },[options, cancel])

    const themeMemo = useMemo(() => {
        return {
            options : options,
            timeOut : {
                animation,
                cancel
            }
        }
    },[options, cancel, animation])
     // element에서 alert제거

    return (
        <MainDiv style={style} onClick={onClickMain} theme={themeMemo}>
            <span className="persentageBar"></span>
            <div className="subDiv">
            {options?.emoji && (options?.info?.success ?  text + "⭕" :
                 options?.info?.warn ? text + "❌" :
                 text + "😀")}
            {!options?.emoji&& text}
            </div>
        </MainDiv>
    )
}

export default MyAlert
