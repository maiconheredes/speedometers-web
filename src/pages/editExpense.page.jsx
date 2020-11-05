import React from 'react';
import PropTypes from 'prop-types';
import { AdminContainer, MainMenu, BackButton, ExpensePartialForm } from '../components';
import { Form, Col, Button } from 'react-bootstrap';
import Paths from '../router/paths';


const EditExpensePage = ({ data, handlers }) => {
    EditExpensePage.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Criar despesa'}</h2>
        <Form onSubmit={event => handlers.editExpense(event)}>
            <ExpensePartialForm
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

export default EditExpensePage;
