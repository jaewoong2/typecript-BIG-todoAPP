import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

const MainDiv = styled.div`
    width : ${props => props.theme.width ? props.theme.width : '100%' };

    .title {
        display : flex;
        position: relative;
        align-items: center;
        padding-right: 30px;
        word-break: keep-all;
        font-family: Lato,NotoSansKR,Apple SD Gothic Neo,Malgun Gothic,sans-serif;
        font-size: 20px;
        color: #242424;
        font-weight: 700;

        &:hover {
            cursor : pointer;
        }

        &::after {
            content: "";
            background-repeat: no-repeat;
            background-image: url('https://d3udu241ivsax2.cloudfront.net/v3/images/sprite/sprite.a2639034ba6612793c3b9607ead58940.png');
            background-position: 0 -142px;
            background-size: 204px,190px;
            width: 24px;
            height: 24px;
            position : absolute;
            right : 0;
        }
    }

    .content {
        overflow-x : scroll;
        height : ${props => props.theme.height ? props.theme.height : '100%' };
        display : flex;
        cursor : ${props => props.theme.draggable === true ? 'grab' : 'auto'};
        z-index : 5;
        background-color : transparent;

        /* ie */
        -ms-overflow-style: none;
        /* firefox */

        scrollbar-width: none;
        
        img {
            max-width : 100%;
            max-height : 100%;
            width : auto;
            height : auto;
        }

        &::-webkit-scrollbar { 
            /* 크롬, 사파리, 오페라*/
            display : none;
        }
    }

`
type MyGrabSliderProps = {
    title ?: string;
    children ?: React.ReactNode | string;
    width ?: string;
    height ?: string;
    draggable ?: boolean;
}

const MyGrabSlider = ({ width , height, title, children, draggable = true} : MyGrabSliderProps) => {
    const [mousePoint, setMousePoint] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const contentRef = useRef<any>(null);
    
    const themeMemo = useMemo(() => ({
        width,
        draggable,
        height,
    }),[width, height, draggable])

    const onGrabContent = useCallback((e : React.DragEvent<HTMLDivElement>) => {
        if(e.clientX !== 0) {
            // if(mousePoint - e.clientX < 0) e.currentTarget.scrollLeft = scrollLeft - e.clientX;
            // if(mousePoint - e.clientX > 0) e.currentTarget.scrollLeft = mousePoint - e.clientX;

            if(mousePoint - e.clientX < 0) e.currentTarget.scrollTo({ left: scrollLeft - e.clientX });
            if(mousePoint - e.clientX > 0) e.currentTarget.scrollTo({ left: mousePoint - e.clientX });
        }
    },[mousePoint, scrollLeft])

    const onGrabStartContent = useCallback((e : React.DragEvent<HTMLDivElement>) => {
        if(!scrollLeft) setMousePoint(e.clientX);
        if(scrollLeft) setMousePoint(e.clientX + scrollLeft)
        const dragImg = new Image(0, 0);
        dragImg.src = new Image(0, 0).src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        e.dataTransfer.setDragImage(dragImg, 0, 0);
    },[scrollLeft])

    const opacityAnimation = useCallback((node) => {
        const { x } = node.getBoundingClientRect();
            if(x + 25 > window.innerWidth) {
                node.style.opacity = -0.5;
                node.style.transition = 'opacity 1s';
            } else {
                node.style.opacity = 1;
                node.style.transition = 'opacity 1s';
            }
    },[])
    
    const onScrollContent = useCallback((e : React.UIEvent<HTMLDivElement, UIEvent>) => {
        setScrollLeft(e?.currentTarget.scrollLeft);
        e?.currentTarget.scrollTo({
            behavior : "smooth"
        })
        e?.currentTarget.childNodes.forEach((v : any) => {
            opacityAnimation(v)
        })
    },[opacityAnimation])

    useEffect(() => {
        function resizing() {
            contentRef.current.childNodes.forEach((v : any) => {
                opacityAnimation(v)
        })};
        window.addEventListener('resize', resizing);
        return () => window.removeEventListener('resize', resizing);
    },[onScrollContent, opacityAnimation])
    return (
        <MainDiv draggable={draggable} theme={themeMemo}>
            {title && <div>
                <span className="title">{title}</span>
            </div>}
            <div
            ref={contentRef}
            draggable="true"
            onScroll={onScrollContent}
            onDragStart={onGrabStartContent} 
            onDrag={onGrabContent} className="content">
                {children}
            </div>
        </MainDiv>
    )
}

export default MyGrabSlider
