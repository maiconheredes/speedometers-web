import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';

import { 
    AdminContainer, 
    MainMenu, 
    BackButton, 
    PaymentPartialForm
} from '../components';
import Paths from '../router/paths';


const EditExpensePage = ({ data, handlers }) => {
    EditExpensePage.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Editar despesa'}</h2>
        <Form onSubmit={event => handlers.editExpense(event)}>
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
                        style={{ float: 'right' }}
                        children={'Salvar'}
                        type={'submit'}
                    />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default EditExpensePage;
