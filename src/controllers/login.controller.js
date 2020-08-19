import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoginPage from '../pages/login.page';
import { 
    inDevelopment, 
    knownErrors, 
    handlingRequest,
    isLogged
} from '../utils';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Paths from '../router/paths';


const LoginController = () => {
    const [componentMount, setComponentMount] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const history = useHistory();

    const {
        login: loginService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();

    const login = async (event) => {
        if (event) event.preventDefault();

        dispatch(alterLoading(true));
        const [error, response] = await requester(loginService, {
            body: JSON.stringify({
                email,
                password,
            }),
        });
        dispatch(alterLoading(false));

        handlingRequest(
            error, response,
            error => dispatch(setNotification({
                message: knownErrors(error.message),
            })),
            () => dispatch(setNotification({
                message: 'Ocorreu algum erro no sistema.',
            })),
            response => {
                localStorage.setItem('token', response.token);
                history.push(Paths.administration);
            }
        );
    };

    useEffect(() => {
        if (inDevelopment()) {
            console.log('password', password);
            console.log('email', email);
        }
    }, [
        password,
        email,
    ]);

    useEffect(() => {
        if (componentMount) {
            if (!isLogged()) {
                history.push(Paths.administration);
            }

            setComponentMount(false);
        }
    }, [componentMount, history]);

    const data = {
        password,
        email,
    };

    const handlers = {
        setPassword,
        setEmail,
        login,
    };

    return <LoginPage data={data} handlers={handlers} />
};

export default LoginController;
