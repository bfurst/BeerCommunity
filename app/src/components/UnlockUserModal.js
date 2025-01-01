import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UnlockUserModal = (props) => {

    if (props.user === null)
        return;

    return (
        <Modal
            {...props}
            size="md"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header>
                <Modal.Title>Unlock user account</Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to unlock <b>{props.user}</b>'s account? This action will disable issued restriction.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => props.onConfirm()}>
                    Unlock
                </Button>
                <Button variant="secondary" onClick={() => props.onClose()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default UnlockUserModal;