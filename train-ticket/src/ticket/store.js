import { createStore, combineReducers, applyMiddleware,compose } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers(reducers),
    {
       departDate:Date.now(),  //出发日期
       arrarriveDate:Date.now(),  //到达日期
       departTimeStr:null , //出发时刻,具体的时间，如07：15
       arrivetimeStr:null,  //到达时刻,具体的时间，如11：47
       departStation : null, //出发车站
       arriveStation:null,  //到达车站
       trainNumber:null,   //车次
       durationStr:null,  //持续时间，durationStr: "4小时32分"
       tickets:[],   //票
       isScheduleVisible:false,  //时刻表的显示
       searchParsed:false  //是否接收完参数
       
    },
    composeEnhancers(applyMiddleware(thunk))
);
