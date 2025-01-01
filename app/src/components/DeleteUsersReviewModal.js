import React, { useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton, Form, Col } from 'react-bootstrap';
import { createReview, createReviewReport, updateReview } from '../services/Api';
import * as Icon from 'react-bootstrap-icons';
import TextBox from './TextBox';

const DeleteUsersReviewModal = (props) => {

  const [sendNotification, setSendNotification] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionValid, setDescriptionValid] = React.useState(false);

  useEffect(() => {
    setSendNotification(false);
    setDescription("");
    setDescriptionValid(false);
  }, [props.show]);

  const confirm = () => {
    const data = {
      "id": props.data.id,
      "notifyUser": sendNotification,
      "description": description
    };

    props.onConfirm(data);
  };

  if (props.data === null)
    return;

  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

      <Modal.Header>
        <Modal.Title>Delete user review</Modal.Title>
        <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
      </Modal.Header>
      <Modal.Body>
        <div>
          Are you sure you want to delete <b>{props.data.reviewerUsername}</b>'s review?
        </div>
        <Form>
          <Form.Group controlId="formDescription" className="mt-2">
            <Form.Label>Send notification to user?</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={sendNotification ? "Yes" : "No"}
              checked={sendNotification}
              onClick={() => setSendNotification(!sendNotification)}
            />
          </Form.Group>

          {
            sendNotification ?
              <Form.Group controlId="formDescription" className="mt-2">
                <div className="mb-3">
                <Form.Label className="mb-0">Description</Form.Label>
                <br />
                <small style={{ color: "grey" }}>
                  <i>Please, note that description will be mailed to user</i>
                </small>
                </div>
                <TextBox.Area
                  value={description}
                  placeholder={"Enter description"}
                  setData={(text, isValid) => { setDescription(text); setDescriptionValid(isValid); }}
                />
              </Form.Group>
              : ""
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          disabled={sendNotification ? !descriptionValid : false}
          onClick={confirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => props.onClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUsersReviewModal;
