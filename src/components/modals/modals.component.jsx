import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { unsetNotification } from '../../actions/notifications.action';


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

export const NotificationsModals = () => {
    const notifications = useSelector(state => state.NotificationsReducer);

    const dispatch = useDispatch();

    const onConfirm = async (event, notification) => {
        if (event) event.preventDefault();
        await notification.onConfirm();

        dispatch(unsetNotification(notification));
    };

    const onClose = async (event, notification) => {
        if (event) event.preventDefault();
        await notification.onClose();

        dispatch(unsetNotification(notification));
    };

    return <>
        {notifications.map(notification => <Modal
            key={notification.id}
            show={true}
            onHide={(event) => onClose(event, notification)}
            size={'lg'}
            centered
        >
            <Modal.Header closeButton onClick={event => onClose(event, notification)}>
                {notification.title ? <Modal.Title>{notification.title}</Modal.Title> : <></>}
            </Modal.Header>

            {notification.message ? <Modal.Body>{notification.message}</Modal.Body> : <></>}

            <Modal.Footer>
                <Button variant={'secondary'} onClick={event => onClose(event, notification)}>{'Fechar'}</Button>
                <Button variant={'primary'} onClick={event => onConfirm(event, notification)}>{'Ok'}</Button>
            </Modal.Footer>
        </Modal>)}
    </>
};