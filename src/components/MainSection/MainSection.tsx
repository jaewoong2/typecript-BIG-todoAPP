import BannerContent from 'components/UIComponent/Banner/BannerContent/BannerContnet'
import BannerSlider from 'components/UIComponent/Banner/BannerSlider'
import MyBorderCard from 'components/UIComponent/card/MyBorderCard'
import ImageContainer from 'components/UIComponent/ImageContainer/ImageContainer'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { bannersState } from 'recoil/recoilSource'
import styled, { keyframes } from 'styled-components'

const firstAnimation = keyframes`
    from {
        transform : translateX(20%);
        opacity : 0.3;
    }
    to {
        transform : translateX(0%);
        opacity : 1;
    }
`

const lineAnimation = keyframes`
    from {
        flex : 0;
        opacity : 0.3;

    }
    to {
        flex : 1;
        opacity : 1;
    }
`

const coffeAnimation = keyframes`
    0% {
        transform : rotate3D(0, 1, 3, 35deg);
    }
    50%,80% {
        transform : rotate3D(0, 1, 3, -55deg);
    }
`

const MainSectionDiv = styled.div`
    width : 100%;
    display : block;
    font-family: 'Noto Serif KR', serif;

    .phrase-container {
        width : 100%;
        height : 100%;
        display : flex;
        justify-content : space-between;
        align-items : center;
        
        .phrase {
            margin : 0;
            padding : 0;
            font-size : 1.5rem;
            letter-spacing : 1.5px;
            animation : ${firstAnimation} 1s linear;
            word-break : keep-all;
        } 
        .phrase-line {
            animation : ${lineAnimation} 1.2s linear;
            flex : 1;
            margin-left : 20px;
            height : 5px;
            background : rgba(24, 50, 120, 0.5);
            border-radius : 40px;
        }     
    }


    .banner-slide {
        margin-top : 15px;
        width : 100%;
        height : 350px;
        background-color : rgba(0, 0, 0, 0.2);
        border-radius : 14px;

    }
    .image-article {
        z-index : 5;

        .explain-image {
            opacity : 0;
            transition : opacity 0.5s;
            font-size : 0.6rem;
            position : absolute;
            right : 50px;
            top : 0px;
        }
        &:hover {
            .explain-image {
                opacity : 1;
                transition : opacity 0.5s;
            }
        }
        img {
            &:hover {
                animation : ${coffeAnimation} 1.2s;
            }
        }
    }

    @media screen and (max-width : 600px) {
        .phrase-container {
            margin : 0 0px 0px 5%;
            .phrase-line {
                margin-right : 5%;
            }   
        }
    }
`



const MainSection = () => {
    const bannerState = useRecoilValue(bannersState);
    const [bannerIndex, setBannerIndex] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setBannerIndex(prev => prev + 1 === bannerState.length ? 0 : prev + 1);
        }, 4000)
        return () => clearTimeout(timer)
    },[bannerIndex, bannerState])

    return (
        <MainSectionDiv>
            <section className="phrase-container">
                <h4 className="phrase">
                    오늘의 하루는 어떤가요?
                </h4>
                <span className="phrase-line" />
            </section>
            <section className="filling-container">
                <article className="banner-slide">
                    <BannerContent
                        bannerIndex={bannerIndex}
                        bannerArray={bannerState}
                        />
                </article>
                <article className="image-article">
                    <ImageContainer 
                    image={"./image/coffee.png"}
                    imageMaxWidth={"150px"}
                    StrongText={<span className="strong-text">커피 한잔의 여유를 가져봐요</span>}
                    backgroundLineColor={"rgba(200, 100, 50, 0.4)"}
                    explain={<div className="explain-image">아이콘 제작자 
                    <a href="https://www.flaticon.com/kr/authors/freepik" 
                    title="Freepik">Freepik</a> from 
                    <a href="https://www.flaticon.com/kr/" title="Flaticon"> 
                    www.flaticon.com</a></div>} />
                </article>
            </section>
        </MainSectionDiv>
    )
}

export default MainSection
