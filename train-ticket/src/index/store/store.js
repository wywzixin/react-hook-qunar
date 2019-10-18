import { createStore,compose, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers(reducers),
    {
        from: '北京', //出发地
        to: '上海',   //目的地
        isCitySelectorVisible: false,  //城市选择框是否显示
        cityData: null,    //城市数据
        isLoadingCityData: false, //是否加载城市数据
        currentSelectingLeftCity:false ,//是否是左边出发地
        isDateSelectorVisible: false, //时间选择器是否加载
        departDate: Date.now() , //当前时间
        highSpeed: false,  //只看高铁或者动车
    },
    composeEnhancers(applyMiddleware(thunk))
);
