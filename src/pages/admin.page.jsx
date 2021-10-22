import React from 'react';
import PropTypes from 'prop-types';

import {
    AdminContainer,
    MainMenu,
} from '../components';


const AdminPage = ({ data, handlers }) => {
    AdminPage.propTypes = {
        data: PropTypes.object.isRequired,
        handlers: PropTypes.object.isRequired,
    };

    return <AdminContainer
        menu={<MainMenu />}
    >
        <p>Página de Dashboard</p>
    </AdminContainer>
};

export default AdminPage;
