import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

import { 
    AdminContainer, 
    MainMenu,
    InputText,
    MoneyInput,
    BackButton,
    InputNumber
} from '../components';
import Paths from '../router/paths';


const ShowExpensePage = ({ data, handlers }) => {
    ShowExpensePage.propTpes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    const {
        expense,
    } = data;

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Visualizar despesa'}</h2>
        <Form onSubmit={() => {}}>
            <Form.Row>
                <Col lg={6}>
                    <InputText
                        value={expense.title}
                        id={'payment-title'}
                        label={'Título'}
                        readOnly
                    />
                </Col>
                <Col>
                    <MoneyInput
                        value={expense.value}
                        label={'Valor'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col lg={6}>
                    <InputNumber
                        value={expense.installments}
                        id={'payment-installments'}
                        label={'Parcelas'}
                        readOnly
                    />
                </Col>
                <Col>
                    <InputNumber
                        value={expense.installment}
                        id={'payment-installment'}
                        label={'Parcelas faturadas'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <InputText
                        value={expense.description}
                        id={'payment-description'}
                        label={'Descrição'}
                        as={'textarea'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.expense.index} />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default ShowExpensePage;
