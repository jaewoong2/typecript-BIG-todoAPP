import { useCallback } from 'react';
import { todoListsState } from './../recoil/recoilSource';
import { useSetRecoilState } from "recoil"
import { createTodoList } from 'firebase/firebaseAPI';

export default () => {
    const setTodoLists = useSetRecoilState(todoListsState);

    const submitTodo = useCallback((todo) => {
        createTodoList(todo)
    },[])

    return submitTodo;
}