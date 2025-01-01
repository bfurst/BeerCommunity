import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = (props) => {

    return (
        <Modal
            {...props}
            size="md"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header>
                <Modal.Title>Confirm action</Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.onConfirm()}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={() => props.onClose()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ConfirmModal;