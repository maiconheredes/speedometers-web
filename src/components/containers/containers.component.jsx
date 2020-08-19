import React from 'react'
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { 
    HeaderCol, 
    MenuCol, 
    ContentCol, 
    H5Header, 
    LogoutButton
} from '../../styles/styles';
import Paths from '../../router/paths';
import { isLogged } from '../../utils';


export const LoginContainer = ({
    children, header, footer
}) => {
    LoginContainer.propTypes = {
        children: PropTypes.any.isRequired,
        header: PropTypes.any,
        footer: PropTypes.any,
    };

    return <>
        <header>
            {header}
        </header>
        <main>
            {children}
        </main>
        <footer>
            {footer}
        </footer>
    </>
};

export const AdminContainer = ({ children, menu }) => {
    AdminContainer.propTypes = {
        children: PropTypes.any.isRequired,
        menu: PropTypes.any,
    };

    const history = useHistory();

    const logout = () => {
        localStorage.setItem('token', null);
        history.push(Paths.login);
    };

    return <>
        <header>
            <Container fluid>
                <Row>
                    <HeaderCol>
                        <H5Header>{'SPEEDOMETERS'}</H5Header>
                        {isLogged() && <LogoutButton onClick={() => logout()}>
                            {'Sair'}
                        </LogoutButton>}
                    </HeaderCol>
                </Row>
            </Container>
        </header>
        <main>
            <Container fluid>
                <Row>
                    <MenuCol lg={2}>
                        {menu}
                    </MenuCol>
                    <ContentCol lg={10}>
                        {children}
                    </ContentCol>
                </Row>
            </Container>
        </main>
        <footer></footer>
    </>
};