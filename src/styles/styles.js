import styled from 'styled-components';
import { Form, Col, Table } from 'react-bootstrap';


export const ContainerPage = styled.div`
    background-color: #3e3e3e;
    height: 100vh;
    width: 100vw;
`;

export const LoginForm = styled(Form)`
    transform: translate(-50%, -50%);
    background-color: whitesmoke;
    border-radius: 0.25rem;
    position: relative;
    padding: 30px;
    width: 300px;
    left: 50%;
    top: 50%;
`;

export const HeaderCol = styled(Col)`
    box-shadow: 0px 0px 5px black;
    background-color: #3e3e3e;
    color: white;

    @media (min-width: 992px) {
        height: 5vh;
    }
`;

export const MenuCol = styled(Col)`
    background-color: darkslategray;
    box-shadow: 0px 0px 5px black;
    color: white;

    a {
        color: white !important;
        &:hover {
            font-weight: bolder;
        }
    }

    @media (min-width: 992px) {
        height: 95vh;
    }
`;

export const ContentCol = styled(Col)`
    overflow-y: scroll;
    padding: 15px;

    @media (min-width: 992px) {
        height: 95vh;
    }
`;

export const H5Header = styled.h5`
    margin-bottom: 5px;
    margin-top: 5px;
`;

export const LogoutButton = styled.span`
    transform: translateY(-50%);
    position: absolute;
    cursor: pointer;
    right: 15px;
    top: 50%;
`;

export const TableNoWrap = styled(Table)`
    th, td {
        white-space: nowrap;
    }
`;
