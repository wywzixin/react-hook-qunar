import React, { memo} from 'react';
import PropTypes from 'prop-types'; //类型
import './CitySelector.css';


const AlphaIndex = memo(function AlphaIndex(props) {
    const { alpha, onClick } = props;

    return (
        <i className="city-index-item" onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    );
});

AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default AlphaIndex