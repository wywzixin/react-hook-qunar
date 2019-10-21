import { ORDER_DURATION, ORDER_DEPART } from './constant';

import { h0 } from '../common/fp';

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_TRAIN_LIST = 'SET_TRAIN_LIST';
export const ACTION_SET_ORDER_TYPE = 'SET_ORDER_TYPE';
export const ACTION_SET_ONLY_TICKETS = 'SET_ONLY_TICKETS';
export const ACTION_SET_TICKET_TYPES = 'SET_TICKET_TYPES';
export const ACTION_SET_CHECKED_TICKET_TYPES = 'SET_CHECKED_TICKET_TYPES';
export const ACTION_SET_TRAIN_TYPES = 'SET_TRAIN_TYPES';
export const ACTION_SET_CHECKED_TRAIN_TYPES = 'SET_CHECKED_TRAIN_TYPES';
export const ACTION_SET_DEPART_STATIONS = 'SET_DEPART_STATIONS';
export const ACTION_SET_CHECKED_DEPART_STATIONS = 'SET_CHECKED_DEPART_STATIONS';
export const ACTION_SET_ARRIVE_STATIONS = 'SET_ARRIVE_STATIONS';
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = 'SET_CHECKED_ARRIVE_STATIONS';
export const ACTION_SET_DEPART_TIME_START = 'SET_DEPART_TIME_START';
export const ACTION_SET_DEPART_TIME_END = 'SET_DEPART_TIME_END';
export const ACTION_SET_ARRIVE_TIME_START = 'SET_ARRIVE_TIME_START';
export const ACTION_SET_ARRIVE_TIME_END = 'SET_ARRIVE_TIME_END';
export const ACTION_SET_IS_FILTERS_VISIBLE = 'SET_IS_FILTERS_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

//设置出发地
export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}
//设置目的地
export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

//设置所选日期
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

//设置是否只看高铁动车
export function setHighSpeed(highSpeed) {
    return {
        type: ACTION_SET_HIGH_SPEED,
        payload: highSpeed,
    };
}

//切换只看高铁动车
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();

        dispatch(setHighSpeed(!highSpeed));
    };
}

//设置列车列表
export function setTrainList(trainList) {
    return {
        type: ACTION_SET_TRAIN_LIST,
        payload: trainList,
    };
}

//切换 早晚类型
export function toggleOrderType() {
    return (dispatch, getState) => {
        const { orderType } = getState();
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DURATION,
            });
        } else {
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART,
            });
        }
    };
}

//切换 只显示有票
export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        const { onlyTickets } = getState();

        dispatch({
            type: ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickets,
        });
    };
}
//设置坐席类型
export function setTicketTypes(ticketTypes) {
    return {
        type: ACTION_SET_TICKET_TYPES,
        payload: ticketTypes,
    };
}

//设置选择的坐席类型
export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: ACTION_SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes,
    };
}

//设置车次类型
export function setTrainTypes(trainTypes) {
    return {
        type: ACTION_SET_TRAIN_TYPES,
        payload: trainTypes,
    };
}
//设置选择的车次类型
export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: ACTION_SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes,
    };
}

//设置出发车站
export function setDepartStations(departStations) {
    return {
        type: ACTION_SET_DEPART_STATIONS,
        payload: departStations,
    };
}

//设置选择的出发车站
export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: ACTION_SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations,
    };
}

//设置到达的车站
export function setArriveStations(arriveStations) {
    return {
        type: ACTION_SET_ARRIVE_STATIONS,
        payload: arriveStations,
    };
}

//设置选择的到达车站
export function setCheckedArriveStations(checkedArriveStations) {
    return {
        type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations,
    };
}

//设置出发开始时间
export function setDepartTimeStart(departTimeStart) {
    return {
        type: ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart,
    };
}

//设置出发结束时间
export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd,
    };
}

//设置到达 开始时间
export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart,
    };
}

// 设置到达 结束时间
export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd,
    };
}

// 切换筛选框
export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {
        const { isFiltersVisible } = getState();

        dispatch({
            type: ACTION_SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible,
        });
    };
}

//是否解析完成url参数
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

//后一天
export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
    };
}

// 前一天
// 86400 是秒， 86400 除以 60 再除以 60 等于 24 ，24 小时，也就剩一天
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
    };
}
