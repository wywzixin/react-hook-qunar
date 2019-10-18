import React, { useState, useMemo, useEffect,useCallback,memo} from 'react';
import PropTypes from 'prop-types'; //类型
import classnames from 'classnames';
import './CitySelector.css';
import CityList from './CityList.jsx'
import Suggest from './Suggest.jsx'

const CitySelector = memo(function CitySelector(props) {
    const { show, cityData, isLoading, onBack,fetchCityData,onSelect } = props;

    const [searchKey, setSearchKey] = useState('');

    //const key = searchKey.trim();
    //searchKey 只要searchkey不变，trim不会重新计算，key不变
    const key = useMemo(() => searchKey.trim(), [searchKey])
    useEffect(() => {
        if (!show || cityData || isLoading) {
            return;
        }

        fetchCityData();
    }, [show, cityData, isLoading]);

    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
    }, []);
    
    const outputCitySections = () => {
        if (isLoading) {
            return <div>loading</div>;
        }

        if (cityData) {
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            );
        }

        return <div>error</div>;
    };

    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={() => { onBack() }}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    onClick={() => setSearchKey('')}
                    className={classnames('search-clean', {
                        hidden: key.length === 0,
                    })}
                >
                    &#xf063;
                </i>
            </div>
            {Boolean(key) && (<Suggest searchKey={key} onSelect={key => onSelect(key)} />)}
            { outputCitySections()}
        </div>
    )
})

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData:PropTypes.object,
    isLoading:PropTypes.bool.isRequired,
    onBack:PropTypes.func.isRequired
}

export default CitySelector