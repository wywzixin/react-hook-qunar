import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { h0 } from '../../common/fp';
import './DateSelector.css';

function Day(props) {
    const { day, onSelect } = props;

    if (!day) {
        return <td className="null"></td>;
    }

    const classes = [];

    const now = h0();  //表示现在

    if (day < now) {
        classes.push('disabled');  //当前日期之前的都是灰色
    }

    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend');  //周六周日都是红色，好像不是红色，那是什么色
    }

    const dateString = now === day ? '今天' : new Date(day).getDate();

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    );
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

export default Day