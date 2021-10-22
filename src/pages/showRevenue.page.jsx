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


const ShowRevenuePage = ({ data, handlers }) => {
    ShowRevenuePage.propTpes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    const {
        revenue,
    } = data;

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Visualizar receita'}</h2>
        <Form onSubmit={() => {}}>
            <Form.Row>
                <Col lg={6}>
                    <InputText
                        value={revenue.title}
                        id={'payment-title'}
                        label={'Título'}
                        readOnly
                    />
                </Col>
                <Col>
                    <MoneyInput
                        value={revenue.value}
                        label={'Valor'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col lg={6}>
                    <InputNumber
                        value={revenue.installments}
                        id={'payment-installments'}
                        label={'Parcelas'}
                        readOnly
                    />
                </Col>
                <Col>
                    <InputNumber
                        value={revenue.installment}
                        id={'payment-installment'}
                        label={'Parcelas faturadas'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <InputText
                        value={revenue.description}
                        id={'payment-description'}
                        label={'Descrição'}
                        as={'textarea'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.revenue.index} />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default ShowRevenuePage;
