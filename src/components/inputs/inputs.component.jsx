import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'react-uuid';

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

export const IconButton = ({
    link, icon, tooltip,
    onClick = () => { },
}) => {
    IconButton.propTypes = {
        link: PropTypes.string,
        icon: PropTypes.any,
        tooltip: PropTypes.string,
        onClick: PropTypes.func,
    };

    const [componentMount, setComponentMount] = useState(true);
    const [key, setKey] = useState(null);

    useEffect(() => {
        if (componentMount) {
            setKey(uuid());

            setComponentMount(false);
        }
    }, [componentMount]);

    return <OverlayTrigger
        key={key}
        placement={'bottom'}
        overlay={<Tooltip
            id={`tooltip-${key}`}
            children={tooltip}
        />}
        children={link ? <LinkContainer
            style={{ cursor: 'pointer' }}
            to={link}
            children={<FontAwesomeIcon
                icon={icon}
            />}
        /> : <span
            style={{ cursor: 'pointer' }}
            onClick={onClick}
        ><FontAwesomeIcon icon={icon} /></span>}
    />
};

export const ButtonHistory = ({ label = ' ', path = '' }) => {
    const history = useHistory();

    return <Button
        onClick={() => history.push(path)}
        children={label}
    />
};

export const BackButton = ({ path }) => {
    return <ButtonHistory path={path} label={'Voltar'} />
};
