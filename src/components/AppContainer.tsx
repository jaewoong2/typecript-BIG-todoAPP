import React from 'react'
import NavContainer from './nav/NavContainer'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'reducer'

const MainDiv = styled.div`
   background-color : ${props => props.theme === true ? "gray" : 'whitesmoke'};
   color :  ${props => props.theme === true? 'whitesmoke' : 'black'};
   
   width : 100vw;
   height : 100vh;

   transition : background-color 0.5s, color 0.5s;
`

const AppContainer = () => {
    const { theme } = useSelector((state : RootState) => state.theme);
    

    return (
        <MainDiv theme={theme}>
            <nav>
                <NavContainer/>
            </nav>
            <main>
                <section>
                    
                </section>
                <section>
                    
                </section>
                <section>
                    
                </section>
            </main>
        </MainDiv>
    )
}

export default AppContainer
