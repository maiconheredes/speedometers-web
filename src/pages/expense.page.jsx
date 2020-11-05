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
} from '../components';
import {
    money,
} from '../utils';
import Paths from '../router/paths';
import { TableNoWrap } from '../styles/styles';


const ExpensePage = ({ data, handlers }) => {
    ExpensePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Despesas'}</h2>
        <TableNoWrap striped bordered hover responsive>
            <thead>
                <tr>
                    <th>{'Id'}</th>
                    <th>{'Título'}</th>
                    <th>{'Valor'}</th>
                    <th>{'Ações'}</th>
                </tr>
            </thead>
            <tbody>
                {data.expenses.map(expense => <tr key={expense.id}>
                    <td>{expense.id}</td>
                    <td>{expense.title}</td>
                    <td>{money(expense.value)}</td>
                    <td style={{ padding: '15px' }}>
                        <Row>
                            <Col lg={4} className={'text-center'}>
                                <IconButton
                                    icon={faFile}
                                    link={Paths.administration.expense.show.replace(':idPayment', expense.id)}
                                    tooltip={'Visualizar'}
                                />
                            </Col>
                            <Col lg={4} className={'text-center'}>
                                <IconButton
                                    icon={faEdit}
                                    link={Paths.administration.expense.edit.replace(':idPayment', expense.id)}
                                    tooltip={'Editar'}
                                />
                            </Col>
                            <Col lg={4} className={'text-center'}>
                                <IconButton
                                    onClick={() => handlers.confirmRemoveExpense(expense.id)}
                                    icon={faTimes}
                                    tooltip={'Excluir'}
                                />
                            </Col>
                        </Row>
                    </td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={2}>{'Valor Total'}</th>
                    <th colSpan={2}>{money(data.totalValueExpenses)}</th>
                </tr>
            </tfoot>
        </TableNoWrap>
        <ButtonHistory 
            path={Paths.administration.expense.create}
            label={'Criar despesa'}
        />
    </AdminContainer>
};

export default ExpensePage;
