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


const CreateServicePage = ({ data, handlers }) => {
    CreateServicePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Criar serviço'}</h2>
        <Form onSubmit={event => handlers.createService(event)}>
            <PaymentPartialForm
                handlers={handlers}
                payment={data.service.payment}
                fieldPrefix={'payment.'}
            />
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.service.index} />
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

export default CreateServicePage;
