import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form } from 'react-bootstrap';

import {
    AdminContainer,
    BackButton,
    MainMenu,
    CashierPartialForm
} from '../components';
import Paths from '../router/paths';


const CreateCashierPage = ({ data, handlers }) => {
    CreateCashierPage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Criar caixa'}</h2>
        <Form onSubmit={event => handlers.createCashier(event)}>
            <CashierPartialForm
                handlers={handlers}
                data={data}
            />
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.cashier.index} />
                </Col>
                <Col>
                    <Button
                        style={{float: 'right'}}
                        children={'Cadastrar'}
                        type={'submit'}
                    />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default CreateCashierPage;
