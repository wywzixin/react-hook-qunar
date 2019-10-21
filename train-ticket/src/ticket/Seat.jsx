import React, { memo, useState, useCallback, useContext, useMemo } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './Candidate.css';
import Channel from './Channel.jsx'


const Seat = memo(function Seat(props) {
    const {
        type,
        priceMsg,
        ticketsLeft,
        channels,
        expanded,
        onToggle,
        idx,
    } = props;

    return (
        <li>
            <div className="bar" onClick={() => onToggle(idx)}>
                <span className="seat">{type}</span>
                <span className="price">
                    <i>￥</i>
                    {priceMsg}
                </span>
                <span className="btn">{expanded ? '预订' : '收起'}</span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div
                className="channels"
                style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
            >
                {channels.map(channel => {
                    return (
                        <Channel key={channel.name} {...channel} type={type} />
                    );
                })}
            </div>
        </li>
    );
});

Seat.propTypes = {
    type: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    ticketsLeft: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
};

export default Seat