import { optionsProps } from 'components/UIComponent/alert/MyAlert';
export type userType = {
    email ?: string | null;
    nickname ?: string | null;
    photoURL ?: string | null;
    uid ?: string | null;
}

export type messageType = {
    message ?: string; 
    options ?: optionsProps;
}[]



export type bannerStateType = {
    textOne : string;
    textTwo : string;
    smallText : string;
    imageSource : string;
}

export type dateListsType = {
    year : string; 
    month : string;
    day : string;
    days : string;
    fullDate : Date;
    todos ?: {title ?: string; description ?: string; rank ?: number, userInfo ?: userType }[];
}

export type todoListType = {
    title ?: string;
    description ?: string;
    userInfo ?: userType
    rank ?: number;
    day ?: string;
    keyNumber ?: string | any;
    checked ?: boolean;
}

export type listOrderdByDayType = {
    day ?: string;
    lists : todoListsType;
}[]

export type todoListsType = todoListType[];

export type historyType = {
    dayLists : dateListsType;
    dayDate ?: Date,
    dayString ?: string,
    visible ?: boolean;
}