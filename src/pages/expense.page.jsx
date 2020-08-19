import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
} from 'react-bootstrap';

import {
    AdminContainer, 
    MainMenu,
} from '../components';
import {
    money,
} from '../utils';


const ExpensePage = ({ data, handlers }) => {
    ExpensePage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Despesas'}</h2>
        <Table striped bordered hover responsive>
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
                    <td></td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={2}>{'Valor Total'}</th>
                    <th colSpan={2}>{money(data.totalValueExpenses)}</th>
                </tr>
            </tfoot>
        </Table>
    </AdminContainer>
};

export default ExpensePage;
