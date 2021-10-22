import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';

import {
    AdminContainer,
    MainMenu,
    BackButton,
    PaymentPartialForm,
} from '../components';
import Paths from '../router/paths';


const CreateExpensePage = ({ data, handlers }) => {
    CreateExpensePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Criar despesa'}</h2>
        <Form onSubmit={event => handlers.createExpense(event)}>
            <PaymentPartialForm
                handlers={handlers}
                payment={data.expense}
            />
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.expense.index} />
                </Col>
                <Col>
                    <Button
                        variant={'success'}
                        style={{float: 'right'}}
                        children={'Cadastrar'}
                        type={'submit'}
                    />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default CreateExpensePage;
