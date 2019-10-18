import React, { memo} from 'react';
import PropTypes from 'prop-types'; //类型
import AlphaIndex from './AlphaIndex.jsx'
import CitySection from './CitySection.jsx'
import './CitySelector.css';

const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
});

const CityList = memo(function CityList(props) {
    const { sections, toAlpha, onSelect } = props;

    return (
        <div className="city-list">
            <div className="city-cate">
                {sections.map(section => {
                    return (
                        <CitySection
                            key={section.title}
                            title={section.title}
                            cities={section.citys}
                            onSelect={onSelect}
                        />
                    );
                })}
            </div>
            <div className="city-index">
                {alphabet.map(alpha => {
                    return (
                        <AlphaIndex
                            key={alpha}
                            alpha={alpha}
                            onClick={toAlpha}
                        />
                    );
                })}
            </div>
        </div>
    );
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired,
};

export default CityList