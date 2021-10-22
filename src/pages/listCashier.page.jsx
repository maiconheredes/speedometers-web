import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { faFile, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import { 
    AdminContainer, 
    MainMenu,
    IconButton,
    ButtonHistory
} from '../components';
import Paths from '../router/paths';
import { TableNoWrap } from '../styles/styles';
import { money } from '../utils';


const ListCashierPage = ({ data, handlers }) => {
    ListCashierPage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <h2>{'Caixas'}</h2>
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
                {data.cashiers.map(cashier => <tr key={cashier.id}>
                    <td>{cashier.id}</td>
                    <td>{cashier.title}</td>
                    <td>{money(cashier.totalValue)}</td>
                    <td style={{ padding: '15px' }}>
                        <Row>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faFile}
                                    link={Paths.administration.cashier.show.replace(':idCashier', cashier.id)}
                                    tooltip={'Visualizar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    icon={faEdit}
                                    link={Paths.administration.cashier.edit.replace(':idCashier', cashier.id)}
                                    tooltip={'Editar'}
                                />
                            </Col>
                            <Col lg={3} className={'text-center'}>
                                <IconButton
                                    onClick={() => handlers.confirmRemoveCashier(cashier.id)}
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
                    <th colSpan={2}>{money(data.totalValueCashiers)}</th>
                </tr>
            </tfoot>
        </TableNoWrap>
        <ButtonHistory
            path={Paths.administration.cashier.create}
            label={'Criar caixa'}
        />
    </AdminContainer>
};

export default ListCashierPage;
