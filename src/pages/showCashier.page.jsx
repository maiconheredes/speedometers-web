import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

import { 
    AdminContainer, 
    MainMenu,
    InputText,
    MoneyInput,
    BackButton
} from '../components';
import Paths from '../router/paths';


const ShowCashierPage = ({ data, handlers }) => {
    ShowCashierPage.propTpes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    const {
        cashier,
    } = data;

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Visualizar caixa'}</h2>
        <Form onSubmit={() => {}}>
            <Form.Row>
                <Col lg={6}>
                    <InputText
                        value={cashier.title}
                        id={'cashier-title'}
                        label={'Título'}
                        readOnly
                    />
                </Col>
                <Col>
                    <MoneyInput
                        value={cashier.totalValue}
                        label={'Valor'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <InputText
                        value={cashier.description}
                        id={'cashier-description'}
                        label={'Descrição'}
                        as={'textarea'}
                        readOnly
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.cashier.index} />
                </Col>
            </Form.Row>
        </Form>
    </AdminContainer>
};

export default ShowCashierPage;
