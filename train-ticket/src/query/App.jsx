import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs'
import Header from '../common/Header/Header.jsx';
import Nav from '../common/Nav/Nav.jsx';
import List from './List.jsx'
import Bottom from './Bottom.jsx'
import './App.css';
import dayjs from 'dayjs'
import { h0 } from '../common/fp';
import useNav from '../common/useNav';
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    prevDate,
    nextDate,
} from './actions';


function App(props) {
    const {
        from,
        to,
        trainList,
        departDate,
        highSpeed,
        isFiltersVisible,
        searchParsed,
        dispatch,
        orderType,
        onlyTickets,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    } = props;
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);

        const { from, to, date, highSpeed } = queries;

        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setHighSpeed(highSpeed === 'true'));

        dispatch(setSearchParsed(true));
    }, []);

    useEffect(() => {
        if (!searchParsed) {
            return;
        }
        //http://localhost:3000/rest/query?from=%E5%8C%97%E4%BA%AC&to=%E4%B8%8A%E6%B5%B7&date=2019-10-19&highSpeed=false&
        //orderType=1&onlyTickets=false&checkedTicketTypes=&checkedTrainTypes=&checkedDepartStations=&checkedArriveStations=&departTimeStart=0&departTimeEnd=24&arriveTimeStart=0&arriveTimeEnd=24
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch(
                'checkedTicketTypes',
                Object.keys(checkedTicketTypes).join()
            )
            .setSearch(
                'checkedTrainTypes',
                Object.keys(checkedTrainTypes).join()
            )
            .setSearch(
                'checkedDepartStations',
                Object.keys(checkedDepartStations).join()
            )
            .setSearch(
                'checkedArriveStations',
                Object.keys(checkedArriveStations).join()
            )
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();

        fetch(url)
            .then(response => response.json())
            .then(result => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            },
                        },
                    },
                } = result;

                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    }, [
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ]);

    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );
    const bottomcbs = useMemo(() => {
        return bindActionCreators({
            toggleOrderType,
            toggleHighSpeed,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
            isFiltersVisible,
            setCheckedTicketTypes,
            setCheckedTrainTypes,
            setCheckedDepartStations,
            setCheckedArriveStations,
            setDepartTimeStart,
            setDepartTimeEnd,
            setArriveTimeStart,
            setArriveTimeEnd,
        }, dispatch)
    }, [])
    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
            </div>
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}
            />
            <List list={trainList} />
            <Bottom 
               highSpeed={highSpeed}
               orderType={orderType}
               onlyTickets={onlyTickets}
               isFiltersVisible={isFiltersVisible}
               ticketTypes={ticketTypes}
               trainTypes={trainTypes}
               departStations={departStations}
               arriveStations={arriveStations}
               checkedTicketTypes={checkedTicketTypes}
               checkedTrainTypes={checkedTrainTypes}
               checkedDepartStations={checkedDepartStations}
               checkedArriveStations={checkedArriveStations}
               departTimeStart={departTimeStart}
               departTimeEnd={departTimeEnd}
               arriveTimeStart={arriveTimeStart}
               arriveTimeEnd={arriveTimeEnd}
              {...bottomcbs}
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
