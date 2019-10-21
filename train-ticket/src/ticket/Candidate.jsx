import React, { memo, useState, useCallback, useContext, useMemo } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './Candidate.css';
import Seat from './Seat.jsx'


const Candidate = memo(function Candidate(props) {
    const { tickets } = props
    const [expandedIndex, setExpandedIndex] = useState(-1)

    const onToggle = useCallback(idx => {
        setExpandedIndex(expandedIndex === idx ? -1 : idx)
    }, [expandedIndex])

    return (
        <div className="candidate">
            <ul>
                {tickets.map((ticket, idx) => {
                    return (
                        <Seat
                            idx={idx}
                            onToggle={onToggle}
                            expanded={expandedIndex === idx}
                            {...ticket}
                            key={ticket.type}
                        />
                    );
                })}
            </ul>
        </div>
    )
})


Candidate.propTypes = {
    tickets: PropTypes.array.isRequired,
};

export default Candidate;
