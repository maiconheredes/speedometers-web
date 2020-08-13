import React from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


export const LoadingModal = () => {
    const loading = useSelector(state => state.LoadingReducer);

    return loading && <Modal
        show={true}
        onHide={() => { }}
        size={'xs'}
        centered
    >
        <Modal.Body className={'text-center'}>
            <FontAwesomeIcon icon={faSpinner} size={'6x'} pulse />
        </Modal.Body>
    </Modal>
};
