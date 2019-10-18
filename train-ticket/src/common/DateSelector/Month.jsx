import React from 'react';
import PropTypes from 'prop-types';
import Week from './Week.jsx'
import './DateSelector.css';

function Month(props) {
    //每个月的零时零分零秒
    const { startingTimeInMonth,onSelect} = props;

    //统计每月的天数
    const startDay = new Date(startingTimeInMonth)  //每月的第一天
    const currentDay = new Date(startingTimeInMonth) //当前天

    let days = [];  //天数

    //如果月数自增
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1) //天数加1
    }

    //需要在第一天前边补充空白，空白数为这一天的星期数减一,周日为6
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days)

    //最后一天也得补充空白
    const lastday = new Date(days[days.length - 1])

    //需要放到最后边
    days = days.concat(new Array(lastday.getDay() ? 7 - lastday.getDay() : 0).fill(null))

    //以每周为单位
    const weeks = []
    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row*7, (row+1) * 7)
        weeks.push(week)
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {weeks.map((week, idx) => {
                    return <Week key={idx} days={week} onSelect={onSelect} />;
                })}
            </tbody>
        </table>
    )
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Month