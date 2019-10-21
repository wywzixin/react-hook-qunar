import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import classnames from 'classnames';
import leftPad from 'left-pad';
import './Schedule.css';
import ScheduleRow from './ScheduleRow.jsx'

const Schedule = memo(function Schedule(props) {
    const {
        date,
        trainNumber,
        departStation,
        arriveStation
    } = props

    const [scheduleList, setScheduleList] = useState([])

    useEffect(() => {
        const url = new URI('/rest/schedule')
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation)
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
            .toString()

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let departRow;  //出发车站
                let arriveRow;  //到达车站

                for (let i = 0; i < data.length; i++) {
                    if (!departRow) {
                        //判断返回的车站是否与出发车站相等
                        if (data[i].station === departStation) {
                            departRow = Object.assign(data[i], {
                                beforeDepartStation: false, //在出发车站之前
                                isDepartStation: true,  //是否是出发车站
                                afterArriveStation: false,
                                isArriveStation: false,
                            })
                        } else {
                            Object.assign(data[i], {
                                beforeDepartStation: true, //在出发车站之前
                                isDepartStation: false,  //是否是出发车站
                                afterArriveStation: false,
                                isArriveStation: false,
                            })
                        }
                    } else if (!arriveRow) {
                        //到达车站
                        if (data[i].station === arriveStation) {
                            arriveRow = Object.assign(data[i], {
                                beforeDepartStation: false, //在出发车站之前
                                isDepartStation: false,  //是否是出发车站
                                afterArriveStation: false,
                                isArriveStation: true,
                            })
                        } else {
                            //到达车站之前
                            Object.assign(data[i], {
                                beforeDepartStation: false, //在出发车站之前
                                isDepartStation: false,  //是否是出发车站
                                afterArriveStation: false,
                                isArriveStation: false,
                            })
                        }
                    } else {
                        //到达车站之后的
                        Object.assign(data[i], {
                            beforeDepartStation: false, //在出发车站之前
                            isDepartStation: false,  //是否是出发车站
                            afterArriveStation: true,
                            isArriveStation: false,
                        })
                    }
                    //返回数据数组中的第一项和最后一项为始发站和终点站
                    Object.assign(data[i], {
                        isStartStation: i === 0,
                        isEndStation: i === data.length - 1,
                    });
                }
                setScheduleList(data)
            });
    }, [date, trainNumber, departStation, arriveStation])


    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="deptime">到达</span>
                    <span className="arrtime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {
                        scheduleList.map((schedule, index) => {
                            return (
                                <ScheduleRow
                                    index={index + 1}
                                    key={index}
                                    {...schedule}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
})

Schedule.propTypes = {
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired,
};

export default Schedule;
