import React from 'react'
import PropTypes from 'prop-types';


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
