import React, { useMemo } from 'react'
import styled from 'styled-components'

const MainCard = styled.div`
    border : ${props => props.theme.border === true ? '0.8px solid rgba(44, 44, 44, 0.2)' : '0'};
    border-radius : 12px;
    margin : ${props => props.theme.margin};
    
    .content {
        margin : ${props => props.theme.contentMargin};
        display : flex;
        justify-content : center;
        align-content : center;
    }
`

type MyBorderCardProps = {
    children ?: React.ReactNode | string;
    contentMargin ?: string | number;
    margin ?: string | number;
    border ?: boolean;
}


const MyBorderCard = ({ border = true, margin, children, contentMargin = '15px'} : MyBorderCardProps) => {
    
    const themeMemo = useMemo(() => {
        return {
            margin,
            contentMargin,
            border
        }
    },[margin, contentMargin, border]);

    return (
        <MainCard theme={themeMemo}>
            <div className="content">
                {children}
            </div>
        </MainCard>
    )
}

export default MyBorderCard
