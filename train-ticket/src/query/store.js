import { createStore, combineReducers, compose,applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../common/fp';
import { ORDER_DEPART } from './constant';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers(reducers),
    {
        from: null,
        to: null,
        departDate: h0(Date.now()), //时间
        highSpeed: false,  //高铁动车
        trainList: [],  //列车列表
        orderType: ORDER_DEPART, //出发早晚
        onlyTickets: false, //只看有票
        ticketTypes: [],  // 坐席类型， 硬座还是软卧
        checkedTicketTypes: {}, //类型
        trainTypes: [], //车次类型，高铁，动车
        checkedTrainTypes: {},  //车次选择的
        departStations: [],  //出发车站
        checkedDepartStations: {}, //所选的出发车站
        arriveStations: [],  //到达车站
        checkedArriveStations: {}, //所选的到达车站
        departTimeStart: 0,  //出发时间开始
        departTimeEnd: 24,  //出发时间结束
        arriveTimeStart: 0, //到达时间开始
        arriveTimeEnd: 24,  //到达时间结束
        isFiltersVisible: false, //是否显示筛选框
        searchParsed: false, //判断是否解析完成url参数
    },
    composeEnhancers(applyMiddleware(thunk))
);
