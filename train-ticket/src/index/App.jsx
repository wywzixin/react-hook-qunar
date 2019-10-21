import React, { useCallback,useMemo} from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import './App.css';
import Header from '../common/Header/Header.jsx';
import Journey from './Journey/Journey.jsx'
import CitySelector from '../common/CitySelector/CitySelector.jsx'
import DateSelector from '../common/DateSelector/DateSelector.jsx'
import DepartDate  from './DepartDate/DepartDate.jsx'
import HighSpeed from './HighSpeed/HighSpeed.jsx'
import Submit from './Submit/Submit.jsx'
import { h0 } from '../common/fp';

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed
} from './store/actions'

function App(props) {
  const { 
        from , 
        to, 
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        departDate, 
        isLoadingCityData,
        highSpeed,
        dispatch
    } = props
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const cbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo ,
                showCitySelector
            },
        dispatch)
    },[])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect:setSelectedCity
        },dispatch)
    },[])
    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, []);
    // 这个为什么和别的不一样，为什么要用useCallBack 
    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey from={from} to={to}  {...cbs} />
                <DepartDate time={departDate} {...departDateCbs}/>
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs}/>
                <Submit/>
            </form>
            <CitySelector 
            show={isCitySelectorVisible} 
            cityData={cityData} 
            isLoading={isLoadingCityData} 
            {...citySelectorCbs}
            />
            <DateSelector  
            show={isDateSelectorVisible} 
            {...dateSelectorCbs} 
            onSelect={onSelectDate}
            />
        </div>
    ); 
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
