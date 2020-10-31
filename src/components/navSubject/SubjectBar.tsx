import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import UserComponent from './UserComponent'


const NavContainerSubject = styled.nav`
            width : 100%;
            height : 100%;
            display : flex;
            justify-content : space-between;
            align-items : center;
            z-index : 4;
            background-color : transparent;
            margin-top : 5px;

            .nav-catalog-container {
                width : 100%;
                height : 100%;
                
                .nav-catalog {
                margin-bottom : 20px;
                margin-left : 20px;
                font-family: 'Noto Serif KR', Lato;
                padding : 5px;
                font-size : 1rem;
                cursor: pointer;

                &:hover {
                    color : rgb(22, 22, 22);
                }

                &:focus {
                    outline : 0;
                }
                &:active {
                    transform : translateY(-7px);
                    transition : transform 0.5s linear;
                }
                transition : transform 0.5s linear;
                a { 
                    text-decoration : none;
                    color : inherit;
                }
            }
        }
            
            
`



type subjectInfoType = {
    name : string;
    href : string;
    className ?: string;
}

type SubjectBar = {
    subjectInfos ?: subjectInfoType[];
}

const SubjectBar = ({ subjectInfos } : SubjectBar) => {

    const infoComponents = 
    subjectInfos?.map(info => <span tabIndex={-1} className={`${info.className} nav-catalog`}>
        <Link to={info.href}>{info.name}</Link></span>);

    return (
        <NavContainerSubject>
            <div className="nav-catalog-container">
                {infoComponents}
            </div>
            <UserComponent />
        </NavContainerSubject>
    )
}

export default SubjectBar
