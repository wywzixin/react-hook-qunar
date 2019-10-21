import React, { memo,useMemo} from 'react';
import PropTypes from 'prop-types'
import URI from 'urijs';
import './List.css'

const ListItem = memo(function ListItem(props) {
    const { 
        dTime,
        aTime,
        dStation, 
        aStation, 
        trainNumber, 
        date,
        time,
        priceMsg,
        dayAfter
       } = props
       
    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('aStation', aStation)
            .setSearch('dStation', dStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', date)
            .toString();
    }, [aStation, dStation, trainNumber, date]);

       return (
           <li className="list-item">
               <a href={url}>
                   <span className="item-time">
                       <em>{dTime}</em>
                       <br/>
                       <em className="em-light">{aTime}<i className='time-after'>{dayAfter}</i></em>
                   </span>
                   <span className="item-stations ">
                       <em>
                           <i className="train-station train-start">始</i>
                           {dStation}
                       </em>
                       <br />
                       <em className="em-light">
                           <i className="train-station train-end">终 </i>
                           {aStation}
                       </em>
                   </span>
                   <span className="item-train">
                       <em>{trainNumber}</em>
                       <br/>
                       <em className="em-light">{time}</em>
                   </span>
                   <span className="item-ticket">
                       <em>{priceMsg}</em>
                       <br/>
                       <em className="em-light-orange"></em>
                   </span>
               </a>
           </li>
       )
})
ListItem.propTypes = {
    dTime: PropTypes.string.isRequired,  //出发时间
    aTime: PropTypes.string.isRequired,  //到达时间
    dStation: PropTypes.string.isRequired, //出发车站
    aStation: PropTypes.string.isRequired, //到达车站
    trainNumber: PropTypes.string.isRequired, //G153 车次
    date: PropTypes.string.isRequired,  //2019-10-19 日期
    time: PropTypes.string.isRequired,  //历时
    priceMsg: PropTypes.string.isRequired, //票价
    dayAfter: PropTypes.string.isRequired, //晚点
};

function List(props) {
    const { list } = props
    return (
        <ul className="list">
            {
                list.map(item => {
                    return (
                        <ListItem {...item} key={item.trainNumber} />
                    )
                })
            }
        </ul>
    )
}

List.prototypes = {
    List: PropTypes.array.isRequired
}

export default memo(List)