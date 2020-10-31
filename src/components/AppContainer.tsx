import { auth, logoutUserFunction } from 'firebase/firebaseAPI'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import CustomDatePicker from './DatePicker/CustomDatePicker'
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginComponents from './Login/LoginComponents'
import {  loginState } from 'recoil/recoilSource'
import NavContainer from './UIComponent/nav/NavContainer'
import { useRecoilState } from 'recoil'
import HistoryBar from './Day/HistoryBar'
import MainSection from './MainSection/MainSection';
import useMessage from 'hooks/useMessage';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import SubjectBar from './navSubject/SubjectBar';
import { useRecoilValue } from 'recoil'
import { dateSelector } from 'recoil/recoilSource'

const MainDiv = styled.div`
   color :  inherit;
   /* background:linear-gradient(45deg, rgba(200, 46, 54, 0.5), rgba(255, 126, 170, 0.5),  rgba(245, 208, 226, 0.7)); */
   width : 100vw;
   min-height : 99.999vh;
   background: linear-gradient(to right, #616161, #9bc5c3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   /* background: rgba(0, 0, 0, 0.3); */

    nav {
        position : relative;
        background: linear-gradient(to right, #616161, #9bc5c3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        .title {
            display : none;
        }
    }

   main {
       width : 100%;
       height : 100%;
       display : flex;
       background-color : inherit;

        @media screen and (min-width : 600px) {
            .section-1 {
                width : 10%;
                height : 100%;
            }
            .section-2 {
                width : 80%;
                height : 100%;
                /* border : 1px solid; */
            }

            .section-3 {
                width : 10%;
                height : 100%;
            }
        } 


        @media screen and (max-width : 600px) {
            flex-direction : column;
            
            .section-1 {
                width : 100%;
            }
            
            .section-2 {
                width : 100%;
            }
        
            .section-3 {
                width : 100%;
            }
        }
   }
`

const AppContainer = ({ history } : RouteComponentProps) => {
 
    const [ user ] = useAuthState(auth);
    
    const { dateString } = useRecoilValue(dateSelector);
    const [loginInfo, setLoginState] = useRecoilState(loginState);

    useEffect(() => {
        if(user) {
            const loginInfo = {
                email : user?.email?.split('@')[0],
                nickname : user.displayName,
                photoURL : user.photoURL,
                uid : user.uid
            }
            setLoginState(loginInfo)
        }
    },[user, setLoginState])

    useEffect(() => {
        if(!user) {
            history.replace('/login');
        }
    },[user, history])




    return (
        <MainDiv>
            <nav>
                <NavContainer title='' scrollToTop={false} 
                subject={<SubjectBar subjectInfos={[{name : '할 일', href : `todo/${loginInfo.uid}`}]} />}
                />
            </nav>
            <main>
                <section className="section-1">
                </section>
                <section className="section-2">
                    {/* <DayScheduler/> */}
                    <CustomDatePicker/>
                    <HistoryBar/>
                    <MainSection/>
                </section>
                <section className="section-3">
                </section>
            </main>
            <footer>
            </footer>
        </MainDiv>
    )
}
export default withRouter(AppContainer)
