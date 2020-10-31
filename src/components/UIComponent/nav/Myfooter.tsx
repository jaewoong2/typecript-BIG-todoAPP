import React from 'react'
import styled from 'styled-components'

const MyFooter = styled.footer`
    display : flex;
    justify-content : center;
    align-items : center;
    height : 50px;
    font-size : 12px;
    flex-direction : column;
    background-color : #404949;
    color : white;
    /* background-color : ${props => props.theme === true ? "#404949" : 'white'};
    color : ${props => props.theme === true ? "white" : "black"}; */
`

const Myfooter = () => {


    return (
        <MyFooter>
            CopyRight @2020 - jaewoong2
            <div>Instagram - jaewoong2</div>
        </MyFooter>
    )
}

export default Myfooter
