import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';

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

export const MoneyInput = ({
    label = ' ', onChange = () => { },
    onChangeValue = () => { },
    ...rest
}) => {
    MoneyInput.propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        onChangeValue: PropTypes.func,
    };

    return <>
        {label && <label>{label}</label>}
        <InputGroup style={{ flexWrap: 'nowrap' }}>
            <InputGroup.Prepend>
                <InputGroup.Text>{'R$'}</InputGroup.Text>
            </InputGroup.Prepend>
            <CurrencyInput {...rest}
                style={{ minWidth: '150px' }}
                onChange={onChangeValue}
                onChangeEvent={onChange}
                className={'form-control'}
                decimalSeparator={','}
                thousandSeparator={'.'}
            />
        </InputGroup>
    </>
};
