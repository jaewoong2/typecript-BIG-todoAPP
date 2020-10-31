import MessageComponent from 'components/MessageComponents'
import React from 'react'
import { RecoilRoot } from 'recoil'

type RootRecoilProps = {
    children : React.ReactNode;
}

const RootRecoil = ({ children } : RootRecoilProps) => {
    return (
        <RecoilRoot>
            <MessageComponent>
            {children}
            </MessageComponent>
        </RecoilRoot>
    )
}

export default RootRecoil
