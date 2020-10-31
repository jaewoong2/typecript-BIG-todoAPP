import MyLoading from 'components/UIComponent/Loading/MyLoading'
import { getTodoList } from 'firebase/firebaseAPI';
import useMessage from 'hooks/useMessage';
import React, { useCallback, useEffect, useState } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { todoListsState } from 'recoil/recoilSource'
import TodoUserFullDate from './TodoUserFullDate';
const TodoRoute = ({ match, location } : RouteComponentProps ) => {
    const { params } : { params ?: { uid ?: string }} = match;
    const [uid, setUid] = useState<string | undefined>('');
    const [todoLists, setTodoLists] = useRecoilState(todoListsState)
    const [loading, setLoading] = useState(false);
    const message = useMessage();

    useEffect(() => {
        for(let key in params) {
            if(key === "uid")  {
             return setUid(params[key])
            }
        }
    },[params])
// uid 설정하기.

    useEffect(() => {
        
        const getTodolists = async () => {
            setLoading(true)
            if(uid) getTodoList(uid).then(res => {
                if(res.status) {
                    res.lists?.forEach((list, i) => {
                        if(list?.userInfo?.uid === uid) {
                            setTodoLists(prev => [...prev, list]);
                        } else {
                            setTodoLists([]);
                            // 불러오는 값과 다르면 
                        }
                    })
                };
                setLoading(false)
            })
        }
        if(todoLists.length === 0) {
            getTodolists();
        }
    },[uid, message, setTodoLists, todoLists])

    
    if(loading) {
        return <div style={{width : '100vw', height : '100vh', display : "flex", justifyContent : 'center', alignItems : 'center', background : 'rgba(44, 44, 44, 0.5)' }}>
            <MyLoading width="40px" height="40px" containerHeight="120px" containerWidth="120px" />
        </div>
    }

    return (
    <Switch>
        <Route exact path={`${match.url}/add`} component={TodoRoute} />
        <Route exact path={`${match.url}/:id`} component={TodoRoute} />
        <Route
            exact
            path={`${match.url}/`}
            component={TodoUserFullDate}
        />
    </Switch>
    )
}

export default withRouter(TodoRoute)
