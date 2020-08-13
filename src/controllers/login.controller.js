import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from '../pages/login.page';
import { inDevelopment } from '../utils';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';


const LoginController = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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

        console.log(error, response);
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
