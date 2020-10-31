import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { todoListsType } from 'recoil/atomType'
import { listOrderdByDayState, todoListsState } from 'recoil/recoilSource'
import styled from 'styled-components'
import TodoPostsContainer from './TodoPostsContainer'

const MainSectionForUserTodo = styled.section`
    width : 100vw;
    height : 100vh;
    background : rgba(223, 223, 223, 0.9);
`

const TodoUserFullDate = () => {
    const [todoLists, setTodoLists] = useRecoilState(todoListsState);
    const [listOrderdByDay, setListOrderdByDay] = useRecoilState(listOrderdByDayState);

    useEffect(() => {
        todoLists.forEach(list => {
            setListOrderdByDay(prev => {
                const newPrev = [...prev];
                const dayIndex = newPrev.findIndex(v => v.day === list.day);
                dayIndex < 0 ? newPrev.push({ day : list.day, lists : [list]}) 
                : newPrev.splice(dayIndex, 1, { day : list.day, lists : [...newPrev[dayIndex].lists, list ]})
                    // 인덱스가 없으면 새로운 데이를 넣어 리스트를 넣고 
                    // 인덱스가 있으면 그 위치에 리스트를 넣어준다
            return newPrev
        })})
    },[todoLists, setListOrderdByDay])


    useEffect(() => {
        setListOrderdByDay(prev => {
            const compareList = [...prev];
            const returnList = compareList.map((dayList) => {
                const compareDayList = [...dayList?.lists];
                for(let i = 0; i < compareDayList.length; i++ ) {
                    for(let j = i + 1; j < compareDayList.length; j++) {
                        if(compareDayList[i]?.keyNumber === compareDayList[j]?.keyNumber) {
                             compareDayList.splice(j, 1);
                        }
                    }
                }
                return { day : dayList.day, lists : compareDayList }
            })
            return returnList
        })
    },[setTodoLists, setListOrderdByDay])


    return (
        <MainSectionForUserTodo>
            {listOrderdByDay?.map(lists => (
                <TodoPostsContainer key={lists?.day} {...lists} />
            ))}
        </MainSectionForUserTodo>
    )
}

export default TodoUserFullDate
