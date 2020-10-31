import React from 'react'
import { todoListsType } from 'recoil/atomType'
import styled from 'styled-components'
import TodoPost from './TodoPost'

const PostsContainer = styled.section`
`


type TodoPostsContainerProps = {
    day ?: string;
    lists ?: todoListsType;
}

const TodoPostsContainer = ({ lists, day } : TodoPostsContainerProps) => {
    console.log(lists)
    return (
        <PostsContainer>
            <p>{day}</p>
            {lists?.map(list => <TodoPost {...list} />)}
        </PostsContainer>
    )
}

export default TodoPostsContainer
