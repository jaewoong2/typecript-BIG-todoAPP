import BannerSlider from '../BannerSlider'
import MyLoading from 'components/UIComponent/Loading/MyLoading'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const MainDiv = styled.div`
        .banner {
           top : 0;
           position : absolute;
           width : 100%;
           background-color : rgba(14, 125, 23, 0.6);
           /* background : ${props => props.theme.bgColorTurn ? `linear-gradient(0.${props.theme.bgColorTurn * 3}turn, rgb(455, 120, 120), #ebf8e1, #f69d3c)` : 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)'}; */
           height : 100%;
           display : flex;
           z-index : -1;
       }
           .loading-content {
               width : 100%;
               height : 100%;
               display : flex;
               justify-content : center;
               align-items : center;
           }
        .banner-content {
            width : 100%;
            height : ${props => props.theme.contentHeight};
            padding-bottom : 30px;
            margin-top : 10px;
        }
`
type bannerTextType = {
    textOne ?: string;
    textTwo ?: string;
    smallText ?: string;
    imageSource ?: string;
}

type BannerContentProps = {
    bannerArray ?: bannerTextType[];
    imageArray ?: string[];
    bannerIndex ?: number;
    contentHeight ?: string | number;
}

const BannerContent = ({ contentHeight = '350px', bannerArray, imageArray, bannerIndex } : BannerContentProps ) => {

    const themeMemo = useMemo(() => ({ contentHeight }),[contentHeight])

    return (
        <MainDiv theme={themeMemo}>
            <div className="banner-content">
            {bannerArray?.length ? bannerArray?.map((bannerContent, index) => 
        (bannerIndex === index && 
        <BannerSlider
            key={index + 'silder'}
            textOne={bannerContent.textOne}
            textTwo={bannerContent.textTwo}
            smallText={bannerContent.smallText}
            imageSource={imageArray?.[index] || bannerContent.imageSource}
            imageStyle={{
                position : 'absolute',
                bottom : '-50px',
            }}
        />)
            ) : 
            <div className="loading-content">
            <MyLoading
                width='500px'
                height='400px'
                />
            </div>}
        </div>                  
        <div className="banner"/>  
        </MainDiv>
    )
}

export default BannerContent