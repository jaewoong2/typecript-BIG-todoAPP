import MyLoading from 'components/UIComponent/Loading/MyLoading'
import { updateToogleChecked } from 'firebase/firebaseAPI'
import useMessage from 'hooks/useMessage'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { todoListType } from 'recoil/atomType'
import { listOrderdByDayState, todoListsState } from 'recoil/recoilSource'
import styled, { css } from 'styled-components'

const PostArticle = styled.article`
    width : 700px;
    height : 100%;

    .post-header {
        width : 100%;
        display : flex;
        align-items : center;
        justify-content : space-between;
        font-family : 'Noto Serif KR', Lato;
        background-color : rgba(50, 50, 150, 0.6);
        border-radius : 0 24px 24px 0;
        transition : background-color 0.3s;
        &:hover {
            background-color : rgba(40, 50, 180, 0.8);
            transition : background-color 0.3s;
        }

        .post-title-wrapper {
            display : flex;
            align-items : center;
            font-family : inherit;
            margin-left : 10px;

            .arrow {
                border: solid rgba(75, 20, 20, 0.7);
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 4px;
                margin-left : 10px;
                cursor : pointer;
                transition : transform 0.3s;
            } 

            .right {
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
            } 
            .down {
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
            }

            .checked {
                text-decoration : line-through;
                color : rgba(24, 24, 24, 0.8);
            }
            
            .post-title {
                display : flex;
                align-items : center;
                margin : 0;
                padding : 0;
                margin-bottom : 5px;
                cursor : pointer;
            }

            .check-btn {
                appearance : unset;
                width : 30px;
                height : 30px;
                :checked {
                    border-radius : 50%;
                    border : 2px solid black;
                }
            }
        }


        .post-user-wrapper{
            display : flex;
            align-items : center;
            font-family : inherit;
        }

        .post-user-nickname {
            margin-right : 10px;
            font-size : 0.9rem;
            font-family : inherit;
        }

        .post-user-photoURL {
            border-radius : 50%;
            width : 30px;
            height : 30px;
            margin-right : 7px;
        }
    }

    .post-description {
            padding-left : 10px;
            width : 0px;
            height : 0px;
            word-break : keep-all;
            opacity : 0;
            transition : opacity 0.5s;
    }

    .show-description {
        width : 100%;
        height : 100%;
        opacity : 1;
        transition : opacity 0.6s;
    }

`


const TodoPost = ({ title, userInfo, description, rank, keyNumber, day, checked : preChecked } : todoListType ) => {
    const [checked, setChecked] = useState<boolean>(preChecked || false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(true);
    const setListOrderdByDay = useSetRecoilState(listOrderdByDayState);
    const message = useMessage();

    const onChangeChecked = useCallback(() => {
        if(userInfo?.uid && day && keyNumber) {
            setLoading(true)
            updateToogleChecked({ userUid : userInfo?.uid, day : day, postKey : keyNumber, checked : checked  }).then(res => {
                if(res.status) {
                    setListOrderdByDay(prev => {
                        const newPrev = [...prev];
                        const dayIndex = newPrev.findIndex(list => list.day === day);
                        const postIndex = newPrev[dayIndex].lists.findIndex(list => list.keyNumber === keyNumber);
                        const listsOfDay = [...newPrev[dayIndex].lists];
                        // 얕은복사를 하면 값이 바뀐다.                
                        listsOfDay.splice(postIndex, 1, {
                            ...res?.list,
                            keyNumber : newPrev[dayIndex].lists[postIndex].keyNumber,
                            day : newPrev[dayIndex].lists[postIndex].day,
                        })
                        newPrev.splice(dayIndex, 1, { day : day, lists : listsOfDay})
                        setLoading(false)
                        return newPrev
                    })
                } else message(res.message, { info : { warn : true}}); 
            })
        } 
    } ,[userInfo, day, keyNumber, checked, setListOrderdByDay, message])

    useEffect(() => {
        preChecked === true ? setChecked(true) : setChecked(false);
    },[preChecked])


    const themeMemorise = useMemo(() => ({
        loading
    }),[loading])

    return (
        <PostArticle theme={themeMemorise} className="post-article">
            <header className="post-header">
                <div className="post-title-wrapper">
                    {!loading ? <h2 onClick={onChangeChecked} className={`post-title ${checked && 'checked'}`} >{title}</h2> :
                    <MyLoading color="rgba(44, 44, 44, 0.5)" width={"15px"} height={"15px"} containerWidth={"50px"} containerHeight={"50px"}/>}
                    <i onClick={() => setShowDescription(prev => !prev)} className={`arrow right ${showDescription && "down"}`}></i>
                </div>
                <div className="post-user-wrapper">
                    {/* <span className="post-user-nickname" >{userInfo?.nickname}</span> */}
                    {userInfo?.photoURL && <img className="post-user-photoURL" src={userInfo?.photoURL} alt={`user-${userInfo?.nickname}`} />}
                </div>
            </header>
            {description && <div className={`post-description ${showDescription && "show-description"}`} dangerouslySetInnerHTML={{__html :  description }} />}
            {/* <p className="post-rank" >{rank}</p> */}
        </PostArticle>
    )
}

export default TodoPost
