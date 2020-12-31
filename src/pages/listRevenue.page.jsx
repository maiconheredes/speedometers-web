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


const ListRevenuePage = ({ data, handlers }) => {
    ListRevenuePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Receitas'}</h2>
        <TableNoWrap striped bordered hover responsive>
            <thead>
                <tr>
                    <th>{'Id'}</th>
                    <th>{'Título'}</th>
                    <th>{'Valor'}</th>
                    <th>{'Parcelas'}</th>
                    <th>{'Último Recebimento'}</th>
                    <th>{'Ações'}</th>
                </tr>
            </thead>
            <tbody>
                {data.revenues.map(revenue => <tr key={revenue.id}>
                    <td>{revenue.id}</td>
                    <td>{revenue.title}</td>
                    <td>{money(revenue.value)}</td>
                    <td>{revenue.installment} / {revenue.installments}</td>
                    <td><FullDate stringDate={revenue.lastPayment} /></td>
                    <td style={{ padding: '15px' }}>
                        <Row>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faFile}
                                    link={Paths.administration.revenue.show.replace(':idPayment', revenue.id)}
                                    tooltip={'Visualizar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faEdit}
                                    link={Paths.administration.revenue.edit.replace(':idPayment', revenue.id)}
                                    tooltip={'Editar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    onClick={() => handlers.confirmRemoveRevenue(revenue.id)}
                                    icon={faTimes}
                                    tooltip={'Excluir'}
                                />
                            </Col>
                            {revenue.installment !== revenue.installments && <Col lg={3} className={'text-center'}>
                                <ExecutePayment payment={revenue} tooltip={'Receber'} callBackFunc={handlers.loadRevenues} />
                            </Col>}
                        </Row>
                    </td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={3}>{'Valor Total'}</th>
                    <th colSpan={3}>{money(data.totalValueRevenues)}</th>
                </tr>
            </tfoot>
        </TableNoWrap>
        <ButtonHistory 
            path={Paths.administration.revenue.create}
            label={'Criar receita'}
        />
    </AdminContainer>
};

export default ListRevenuePage;
