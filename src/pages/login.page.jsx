import React from 'react';
import PropTypes from 'prop-types';

import {
    LoginContainer, 
    InputText,
} from '../components';
import { 
    ContainerPage, LoginForm,
} from '../styles/styles';
import { Button } from 'react-bootstrap';


const LoginPage = ({ data, handlers }) => {
    LoginPage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <LoginContainer>
        <ContainerPage>
            <LoginForm onSubmit={event => handlers.login(event)}>
                <InputText
                    onChange={event => handlers.setEmail(event.target.value)}
                    label={'E-mail'}
                    type={'email'}
                    value={data.email}
                    required
                />
                <InputText
                    onChange={event => handlers.setPassword(event.target.value)}
                    label={'Senha'}
                    type={'password'}
                    value={data.password}
                    required
                />
                <Button type={'submit'} children={'Logar'} />
            </LoginForm>
        </ContainerPage>
    </LoginContainer>
};

export default LoginPage;
