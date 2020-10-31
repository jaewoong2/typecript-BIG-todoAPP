import React, { useCallback,useEffect,useMemo, useRef, useState } from 'react'
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dateSelector, dateState, daytoKorDays, historyStackState, loadingState, loginState } from 'recoil/recoilSource';
import MyModal from 'components/UIComponent/Modal/MyModal';
import InputCustom from 'components/UIComponent/input/MyInput';
import useInput from 'hooks/useInput';
import TextEditer from './TextEditer';
import 'react-quill/dist/quill.snow.css';
import { createTodoList, getTodoList, getTodoListWithDays } from 'firebase/firebaseAPI';
import useMessage from 'hooks/useMessage';
import MyLoading from 'components/UIComponent/Loading/MyLoading';
import Draggable from 'react-draggable';
import { dateListsType } from 'recoil/atomType';
import MyButton from 'components/UIComponent/button/MyButton';
registerLocale('ko', ko)

const Main = styled.div`
    position : fixed;
    right : 30px;
    bottom : 15px;
    display : flex;
    justify-content : center;
    align-items : center;
    z-index : 10;
    
    .calender-container {
        position : relative;
        .appendix {
            position : absolute;
            box-shadow : 1px 1px 4px rgba(0, 0, 0, 0.5);
            background-color : rgba(50, 50, 150, 0.6);
            border-radius : 50%;
            left : -40px;
            top: 25px;
            width : 30px;
            height : 30px;
            display : flex;
            justify-content : center;
            align-items : center;
            opacity : 0;
            cursor : pointer;
            
            .strong {
                width : 100%;
                height : 100%;
                display : flex;
                justify-content : center;
                align-items : center;
                margin-bottom : 10px;

                font-size : 34px;
            }
        }

        &:hover {
            .appendix {
                opacity : 1;
                transition : opacity 0.3s;
            }
        }
    }

.custom-calendar {
    width : fit-content;
    display : flex;
    justify-content : center;
    align-items : center;
    border : none;
    box-shadow : 1px 1px 5px rgba(0, 0, 0, 0.5), -1px -1px 5px rgba(0, 0, 0, 0.5);

 .react-datepicker__navigation {
     &:focus {
         outline : 0;
     }
     &:active {
         transform : scale(0.9);
     }
 }

 .react-datepicker__day {
     &:hover {
         border-radius : 50%;
     }
     &:focus {
         outline : 0;
     }

    }
    .react-datepicker__day--today {
        font-size : 1.2em;    
    }

 .react-datepicker__day--keyboard-selected {
     border-radius : 50%;
     background-color : rgba(200, 205, 190, 0.9);

     &:focus {
         outline : none;
     }
 }

 .react-datepicker__header {
     color : rgba(255, 255, 255, 0.6);
     background-color : rgba(50, 50, 150, 0.6);


     .react-datepicker__day-name {
        color : inherit;
        font-family : 'Noto Serif KR', Lato
     }

     .react-datepicker__current-month {
        color : inherit;
        font-weight : 500;
        letter-spacing : 1.5px;
        font-family : 'Noto Serif KR', Lato
     }
 }

 .react-datepicker__day--selected {
     background-color : rgba(150, 205, 190, 0.9);
     border-radius : 50%;
     &:focus {
        outline : none;
     }
 }
}
`

const CustomDatePicker = () => {
    const [date, setDate] = useRecoilState(dateState);
    const [visible, setVisible] = useState(false);

    const nodeRef = useRef(null);

    const onSelectDate = useCallback(() => {
        setVisible(prev => !prev);
    },[]);
    
    const { year, month, day, days } = useRecoilValue(dateSelector);
    const user = useRecoilValue(loginState)
    const [historyStack, setHistoryStack] = useRecoilState(historyStackState)
    
    const lists = useCallback(async () => {
        if(year && month && day && days) {
        const getAnotherDate = async (difDay : number) => {
            const anotherDate = new Date(year, month - 1, day + difDay)
            const splitedDate = anotherDate.toLocaleString().split('.');
            const todos = await getTodoListWithDays(user?.uid, `${splitedDate[0]}년${splitedDate[1]}월${splitedDate[2]}일 ${daytoKorDays(anotherDate.getDay())}`).then(res => res.lists)
            
            return {
                fullDate : anotherDate,
                year : splitedDate[0],
                month : splitedDate[1],
                day : splitedDate[2],
                days : daytoKorDays(anotherDate.getDay()),
                todos : todos
            }
        };
        const dateLists = await getAnotherDate(0);
        if(dateLists?.year) setHistoryStack(prev => {
            const newHistory = `${dateLists?.year}년${dateLists?.month}월${dateLists?.day}일 ${dateLists?.days}`;
            try {
                prev.forEach((history, index) => {
                    if(history.dayString === newHistory) {
                        const error = new Error();
                        error.message = `${index}번째 에 같은 히스토리가 있습니다`;
                        throw error
                    }
                })
                return prev.concat({
                    dayDate : dateLists.fullDate,
                    dayString : newHistory,
                    dayLists : dateLists,
                    visible : true,
                });
            } catch (err) {
                const newPrev = [...prev];
                newPrev.splice(parseInt(err.message[0], 10), 1)
                newPrev.push({
                    dayLists : dateLists,
                    dayDate : dateLists.fullDate,
                    dayString : newHistory,
                    visible : true,
                })
                return newPrev
            }
        })
    }
    },[year, month, day, days, user, setHistoryStack])


    useEffect(() => {
            lists()
    },[lists])

    return (
        <Main>
            <Draggable nodeRef={nodeRef}>
                <div className="calender-container" ref={nodeRef}>
                <DatePicker
                    calendarClassName="custom-calendar"
                    selected={date}
                    locale="ko"
                    minDate={new Date()}
                    disabledKeyboardNavigation
                    onChange={value => setDate(value)}
                    dateFormat="yyyy.MM.dd(eeee)"
                    inline
                >
                </DatePicker>
                    <div className="appendix">
                        <div onClick={onSelectDate} className="strong">+</div>
                    </div>
                </div>
            </Draggable>
            <MyModal top={false} visible={visible} setVisible={setVisible}>
                <TodoCreate setVisible={setVisible}/>
            </MyModal>
        </Main>
    )
}

const InputWrapper = styled.div`
    width : 100%;

    form {
        width : 100%;
        display : flex;
        flex-wrap : wrap;
        /* flex-direction : column; */
        justify-content : center;
        align-items : center;
    }

    .input-wrapper {
        /* margin-right : 50px; */
        width : 90%;
        flex-shrink: 0;
        margin-bottom : 20px;
    }

    .emoji-suffix {
        font-size : 1.1rem;
        cursor : pointer;
        width : 100%;
        display : flex;
        justify-content : center;
    }

    .button-wrapper {
        width : 100%;
        display : flex;
        justify-content : space-between;
        flex-shrink: 0;
        margin-top : 10px;

        .rank-wrapper{
            overflow : hidden;
        }

        .footer-rank {
            display : flex;
            justify-content : center;
            align-items : center;
            height : inherit;

            position : relative;
            font-size : 1.1rem;
            margin-left : 20px;
            transition : color 0.3s;
            cursor : pointer;
            user-select : none;
            /* transform : ${props => `translateX(${(5 - props.theme.rank) * 20}%)`}; */
            /* position : absolute; */

            &::after {
                content : "";
                cursor : auto;
                position : absolute;
                width :  ${props => (5 - props.theme.rank) * 20}%;
                right : 0;
                height : 100%;
                background-color : rgb(255,255,255);
                transition : width 0.4s;
            }
        }

        .submit-btn {
            width : 50px;
            height : 30px;
            margin-right : 20px;
            color : rgba(0, 0, 0, 0.7);
        }
/*         
        button {
            border : 0;
            background-color : transparent;

            .loading-container {
                margin-right : 20px;
                width : 50px;
                height  : 50px;
            }

            &:focus {
                outline : none;
                border : 0;
                background-color : transparent;
            }
        }

        .footer-button {
            font-size : 1.2rem;
            cursor : pointer;

            &:hover::after {
                content : '등록하기⭕';
                color : rgba(50, 50, 150, 0.9);
                transition : color 0.3s;
            }

            &::after {
                content : '등록하기⭕';
                margin-right : 20px;
                transition : color 0.3s;
                display : flex;
                justify-content : center;
            }

            &:active::after {
                transform : rotate3d(1, 0, 0, 90deg);
                transition : transform 0.4s;
            }
        } */
    }
`


const TodoCreate = ({ setVisible } : { setVisible : React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { day,  days, month, year } = useRecoilValue(dateSelector);
    const user = useRecoilValue(loginState);
    const [loading, setLoading] = useRecoilState(loadingState);

    const [title, setTitle, onChangeTitle] = useInput(''); 

    const [description, setDescription] = useState('');
    const [rank, setRank] = useState(0.5);

    const message = useMessage();

    const onSubmitTodo = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if(description.replace(/(<([^>]+)>)/ig,"").trim() === "") { 
            setLoading(false)
            return message('내용을 입력 해주세요.', { info : { warn : true }});
        }
        
        const todo = {
            title,
            description,
            user,
            rank,
            day : `${year}년 ${month}월 ${day}일 ${days}`
        }

        createTodoList(todo).then(res => {
            if(res.status) {
                setLoading(false)
                setVisible(false)
                return message(res.message, { info : { success : true }})
            }
            return message(res.message, { info : { warn : true } });
        })
    },[rank, title, setLoading, setVisible, description, user, message, year, month, day, days])

    const themesMemorise = useMemo(() => ({
        rank
    }),[rank])

    return (
        <InputWrapper theme={themesMemorise}>
            <form onSubmit={onSubmitTodo}>
            <div className="input-wrapper">
            <InputCustom
                placeholder="제목"
                value={title}
                onChange={onChangeTitle}
                icon={'🐰'}
                suffix={
                <span className="emoji-suffix" role="img" aria-label="carrot">🥕</span>
            }
            />
            </div>
            <TextEditer
                style={{width : '90%'}}
                value={description}
                setValue={setDescription}
                minHeight="350px"
            />
            <div className="button-wrapper">
                <div className="rank-wrapper">
                    <span onClick={() => setRank(prev => prev + 0.5 > 5 ? 0.5 : prev + 0.5)} className="footer-rank" role="img" aria-label="star">
                        ⭐⭐⭐⭐⭐
                    </span>
                </div>
                <MyButton disabled={loading} className="submit-btn" primary>등록</MyButton>
                {/* <button type="submit">
                {!loading ? <span className="footer-button" role='img' aria-label="correct"></span> : 
                <div className='loading-container'>
                    <MyLoading  width="30px" height="30px" />
                </div>}
                </button> */}
            </div>
            </form>
        </InputWrapper>
    )
}



export default CustomDatePicker
