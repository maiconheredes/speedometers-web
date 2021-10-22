import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Paths from '../../router/paths';


export const MainMenu = () => {
    return <Navbar expand={'lg'}>
        <Navbar.Toggle aria-controls={'responsive-navbar-nav'} />
        <Navbar.Collapse id={'responsive-navbar-nav'}>
            <Nav className={'flex-column'}>
                <Nav.Item>
                    <LinkContainer to={Paths.administration.index}>
                        <Nav.Link>{'Dashboard'}</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to={Paths.administration.cashier.index}>
                        <Nav.Link>{'Caixas'}</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to={Paths.administration.service.index}>
                        <Nav.Link>{'Serviços'}</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to={Paths.administration.revenue.index}>
                        <Nav.Link>{'Receitas'}</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to={Paths.administration.expense.index}>
                        <Nav.Link>{'Despesas'}</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
};
