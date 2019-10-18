import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { h0 } from '../../common/fp'
import './DepartDate.css'

function DepartDate(props) {
    const { time, onClick } = props
    const h00fDepart = h0(time)
    const departDate = new Date(h00fDepart)

    const departDateString = useMemo(() => {
        return dayjs(h00fDepart).format('YYYY-MM-DD')
    }, [h00fDepart])

    const isToday = h00fDepart === h0()
    const weekString = '周' + ['日', '一' , '二' , '三' , '四' , '五' , '六'][departDate.getDay()] + (isToday ? '今天' : '')

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="data" value={departDateString} />{departDateString}
            <span className="depart-week">{weekString}</span>
        </div>
    )
}
DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default DepartDate