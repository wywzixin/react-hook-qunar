export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE ='SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}

export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

//出发地和目的地切换
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    };
}

//显示城市选择器
export function showCitySelector(currentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}
//显示时间选择器
export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}
//设置时间
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

//切换只选高铁动车
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}

//隐藏时间选择器
export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}

//隐藏城市选择器
export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

//加载状态
export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

//设置城市数据
export function setCityData(cityData) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityData,
    };
}
//选择城市
export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();

        if (currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }

        dispatch(hideCitySelector());
    };
}

//请求城市数据
export function fetchCityData() {
    return (dispatch, getState) => {
        const {isLoadingCityData} = getState() 
        if(isLoadingCityData) {
            return;
        }
        const cache = JSON.parse(
            localStorage.getItem('city_data_cache') || '{}'
        );

        if (Date.now() > cache.expires) {
            dispatch(setCityData(cache.data));

            return;
        }

        fetch('/rest/cities?_' + Date.now())
        .then((res) => {
            res.join()
        })
        .then(cityData => {
            dispatch(setCityData(cityData))
            
            //加入缓存
            localStorage.setItem(
                'city_data_cache',
                 JSON.stringify({
                     expires : Date.now() + 60 * 5000,
                     data:cityData
                 })
            )

            dispatch(setIsLoadingCityData(false));
        })
        .catch(() => {
            dispatch(setIsLoadingCityData(false));
        });
    }
}