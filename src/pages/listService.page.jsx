import React from 'react';
import PropTypes from 'prop-types';
import {
    Col, Row,
} from 'react-bootstrap';
import {
    faFile, faEdit, faTimes,
} from '@fortawesome/free-solid-svg-icons';

import {
    AdminContainer,
    MainMenu,
    IconButton,
    ButtonHistory,
    FullDate,
    ExecutePayment,
} from '../components';
import {
    money,
} from '../utils';
import Paths from '../router/paths';
import { TableNoWrap } from '../styles/styles';


const ListServicePage = ({ data, handlers }) => {
    ListServicePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Serviços'}</h2>
        <TableNoWrap striped bordered hover responsive>
            <thead>
                <tr>
                    <th>{'Id'}</th>
                    <th>{'Nome'}</th>
                    <th>{'CPF'}</th>
                    <th>{'Valor'}</th>
                    <th>{'Parcelas'}</th>
                    <th>{'Último Recebimento'}</th>
                    <th>{'Ações'}</th>
                </tr>
            </thead>
            <tbody>
                {data.services.map(service => <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.cpf}</td>
                    <td>{money(service.payment.value)}</td>
                    <td>{service.payment.installment} / {service.payment.installments}</td>
                    <td><FullDate stringDate={service.payment.lastPayment} /></td>
                    <td style={{ padding: '15px' }}>
                        <Row>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faFile}
                                    link={Paths.administration.service.show.replace(':idService', service.id)}
                                    tooltip={'Visualizar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faEdit}
                                    link={Paths.administration.service.edit.replace(':idService', service.id)}
                                    tooltip={'Editar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    onClick={() => handlers.confirmRemoveService(service.id)}
                                    icon={faTimes}
                                    tooltip={'Excluir'}
                                />
                            </Col>
                            {service.payment.installment !== service.payment.installments && <Col lg={3} className={'text-center'}>
                                <ExecutePayment payment={service.payment} tooltip={'Receber'} callBackFunc={handlers.loadServices} />
                            </Col>}
                        </Row>
                    </td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={3}>{'Valor Total'}</th>
                    <th colSpan={4}>{money(data.totalValueServices)}</th>
                </tr>
            </tfoot>
        </TableNoWrap>
        <ButtonHistory 
            path={Paths.administration.service.create}
            label={'Criar serviço'}
        />
    </AdminContainer>
};

export default ListServicePage;
