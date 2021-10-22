import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


export const FullDate = ({ stringDate, ...rest }) => {
    FullDate.propTypes = {
        stringDate: PropTypes.string,
    };

    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        if (stringDate !== undefined && stringDate !== '')
            setDate(new Date(stringDate));
    }, [stringDate]);

    return <>
        {stringDate === null && <span>-</span>}
        {stringDate !== null && <span {...rest}>
            {('0' + date.getDate()).slice(-2)}/{(date.getMonth() + 1)}/{date.getFullYear()}{' '}
            {('0' + date.getHours()).slice(-2)}:{('0' + date.getMinutes()).slice(-2)}
        </span>}
    </>
};
