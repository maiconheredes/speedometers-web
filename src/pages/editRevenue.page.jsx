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


const EditRevenuePage = ({ data, handlers }) => {
    EditRevenuePage.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Editar receita'}</h2>
        <Form onSubmit={event => handlers.editRevenue(event)}>
            <PaymentPartialForm
                handlers={handlers}
                payment={data.revenue}
            />
            <Form.Row>
                <Col>
                    <BackButton path={Paths.administration.revenue.index} />
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

export default EditRevenuePage;
