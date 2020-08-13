import styled from 'styled-components';
import { Form } from 'react-bootstrap';


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