import { atom, selector } from "recoil";
import { userType, messageType, todoListsType, historyType, bannerStateType, listOrderdByDayType } from './atomType';

export const daytoKorDays = (getDay : number) => {
    switch(getDay) {
        case 0 : return '일요일';
        case 1 : return '월요일';
        case 2 : return '화요일';
        case 3 : return '수요일';
        case 4 : return '목요일';
        case 5 : return '금요일';
        case 6 : return '토요일';
        default : return 'Error!';
}};


export const messageState = atom<messageType>({
    key : 'messageState',
    default : [],
})

export const historyStackState = atom<historyType[]>({
    key : 'historyStackState',
    default : [],
})

export const loadingState = atom<boolean>({
    key : 'loadingState',
    default : false,
})


export const loginState = atom<userType>({
    key : 'loginState',
    default : {},
})

export const todoListsState = atom<todoListsType>({
    key : 'todoListsState',
    default : [],
})

export const dateState = atom<any>({
    key : 'dateState',
    default : new Date(),
})

export const listOrderdByDayState = atom<listOrderdByDayType>({
    key : "listOrderdByDayState",
    default : []
})


export const bannersState = atom<bannerStateType[]>({
    key : "bannerState",
    default : [{
        textOne : '명언-1',
        textTwo : '명언-2 입니다',
        smallText : '명언을 여기에 넣습니다- 관리자 페이지에서 변경 가능',
        imageSource : "https://source.unsplash.com/collection/20"
    }, {
        textOne : '관리자 페이지에선',
        textTwo : '사진, 문구, 변경 가능합니다',
        smallText : '그러기 위해선 파이어베이스 이미지 스토어를 공부해야겠군요',
        imageSource : "https://source.unsplash.com/collection/10"
    }, {
        textOne : '잘하고 싶습니다..',
        textTwo : '학점도 챙겨야합니다...',
        smallText : '너무너무 힘들어요..',
        imageSource : "https://source.unsplash.com/collection/1"
    }]
})

export const dateSelector = selector({
    key : 'dateSelector',
    get : ({get}) => {
        const selectedDate = get(dateState);
        const selectedDateArray = selectedDate.toLocaleString().split('.');
        const selectedDayKor = daytoKorDays(selectedDate.getDay())
        const dateInfo = {
            origin : selectedDate,
            year : parseInt(selectedDateArray[0], 10),
            month : parseInt(selectedDateArray[1], 10),
            day : parseInt(selectedDateArray[2], 10),
            days : selectedDayKor,
        }

        return {
            ...dateInfo,
            dateString : `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`
        }
    }
})