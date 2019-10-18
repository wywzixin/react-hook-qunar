import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { h0 } from '../../common/fp';
import Header from '../Header/Header.jsx';
import Month from './Month.jsx'
import './DateSelector.css';


function DateSelector(props){
     const {show,onSelect,onBack} = props 

     //当前月的零时零分零秒
     const now = new Date() 
     now.setHours(0)
     now.setSeconds(0)
     now.setMinutes(0)
     now.setMilliseconds(0)
     now.setDate(1)

     //getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数
     const monthSequence = [now.getTime()]
     now.setMonth(now.getMonth() + 1)
     monthSequence.push(now.getTime())

     now.setMonth(now.getMonth() + 1)
     monthSequence.push(now.getTime())
     
     return (
         <div className={classnames('date-selector',{hidden:!show})}>
             <Header title="日期选择" onBack={onBack}></Header>
             <div className="date-selector-tables">
                 {
                     monthSequence.map( month => {
                        return (
                            <Month 
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                            />
                        )
                     })
                 }
             </div>
         </div>
     )
}

DateSelector.prototype = {
    show: PropTypes.bool.isRequired,
    onSelect:PropTypes.func.isRequired,
    onBack:PropTypes.func.isRequired,
}

export default DateSelector