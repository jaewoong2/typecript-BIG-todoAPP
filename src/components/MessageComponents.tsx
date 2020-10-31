import React, { useEffect } from 'react'
import MyAlert from 'components/UIComponent/alert/MyAlert';
import { useRecoilValue } from 'recoil';
import { messageState } from 'recoil/recoilSource';
import { useSetRecoilState } from 'recoil';

const MessageComponent = ({ children } : {children : React.ReactNode }) => {
    const messages = useRecoilValue(messageState);
    const setMessages = useSetRecoilState(messageState);

    useEffect(() => {
        console.log(messages)
        if(messages.length > 0) {
            if(setMessages) {
                if(!messages.find(v => v?.options?.visible === true)) {
                    setMessages([])
                } 
            }
        }
    },[setMessages, messages]);


    return (
        <div>
        {messages.map((v, index) => (
            <MyAlert key={"aliert" + index} index={index} text={v?.message} options={v?.options}/>
        ))}
        {children}
        </div>
    )
}

export default MessageComponent