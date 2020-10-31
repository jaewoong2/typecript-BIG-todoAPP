import { optionsProps } from 'components/UIComponent/alert/MyAlert';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { messageState } from 'recoil/recoilSource'

export default function useMessage() {
    const setMessages = useSetRecoilState(messageState);
    const intialOptions : optionsProps | any = useMemo(() => ({

        position : {
            bottomRight : true,
            bottomLeft : false,
        },
        info : {
            success : false,
            warn : false,
            normal : true,
        },
        timeOut :  3500,
        cancleable : true,
        emoji : true,
        visible : true,
  }),[]);  

    const messaging = useCallback((text : string, option ?: optionsProps | any) : void => {
        let returnOption : optionsProps | undefined | any = {};
        for(let key in intialOptions) {
            if(option?.[key]) returnOption[key] = option[key] ;
            else if(!returnOption[key]) returnOption[key] = intialOptions[key];
        }
        text !== "" && setMessages(prev => [...prev, { message : text, options : returnOption }])

    },[intialOptions, setMessages])

    return messaging
}