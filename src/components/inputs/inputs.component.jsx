import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import {
    validateValue,
} from '../../utils';


export const InputText = ({ 
    id, label = ' ', 
    type = 'text',
    ...rest 
}) => {
    InputText.propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    };

    return <Form.Group id={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest}
            type={type} 
            value={validateValue(rest.value)}
        />
    </Form.Group>
};
