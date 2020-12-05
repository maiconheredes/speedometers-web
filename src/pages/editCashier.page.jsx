import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';

import { 
    AdminContainer, 
    MainMenu, 
    BackButton, 
    CashierPartialForm
} from '../components';
import Paths from '../router/paths';


const EditCashierPage = ({ data, handlers }) => {
    EditCashierPage.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Editar caixa'}</h2>
        <Form onSubmit={event => handlers.editCashier(event)}>
            <CashierPartialForm
                handlers={handlers}
                data={data}
            />
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.expense.index} />
                </Col>
                <Col>
                    <Button
                        style={{ float: 'right' }}
                        children={'Editar'}
                        type={'submit'}
                    />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default EditCashierPage;
