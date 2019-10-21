import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import classnames from 'classnames';
import leftPad from 'left-pad';
import './Schedule.css';


const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,
        arriveTime,
        departTime,
        stay,

        isStartStation,
        isEndStation,
        isDepartStation,
        isArriveStation,
        beforeDepartStation,
        afterArriveStation,
    } = props;

    return (
        <li>
            <div className={classnames('icon', {
                'icon-red': isDepartStation || isArriveStation
            })}>
                {
                    isDepartStation
                        ? '出'
                        : isArriveStation
                            ? '到'
                            : leftPad(index, 2, 0)
                }
            </div>
            <div className={classnames('row',{
                grey:beforeDepartStation || afterArriveStation
            })}>
                <span className={classnames('station',{
                    red:isArriveStation || isDepartStation
                })}>
                    {station}
                </span>
                <span
                    className={classnames('arrtime', {
                        red: isArriveStation,
                    })}
                >
                    {isStartStation ? '始发站' : arriveTime}
                </span>
                <span
                    className={classnames('deptime', {
                        red: isDepartStation,
                    })}
                >
                    {isEndStation ? '终到站' : departTime}
                </span>
                <span className="stoptime">
                    {isStartStation || isEndStation ? '-' : stay + '分'}
                </span>
            </div>
        </li>
    )
})

ScheduleRow.propTypes = {};

export default ScheduleRow