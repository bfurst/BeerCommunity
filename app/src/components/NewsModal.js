import React, { useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton, Form, Row, Col } from 'react-bootstrap';
import { createReview, createReviewReport, updateReview, uploadNewsImage } from '../services/Api';
import * as Icon from 'react-bootstrap-icons';
import { useDropzone } from 'react-dropzone';
import { setDefaultOptions } from 'date-fns';

const NewsModal = (props) => {

  const [subject, setSubject] = React.useState('');
  const [subjectValid, setSubjectValid] = React.useState(false);
  const [subjectErrorMsg, setSubjectErrorMsg] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [fileErrorMsg, setFileErrorMsg] = React.useState('');
  const [image, setImage] = React.useState('');
  const [submitDisabled, setSubmitDisabled] = React.useState(null);

  useEffect(() => {

    if (props.data !== null){
      setSubject(props.data.subject);
      setDescription(props.data.body);
      setImage(props.data.image);
    }
    else{
      setSubject('');
      setDescription('');
      setImage('');
      setFile(null);
    }

  }, [props.show]);

  useEffect(() => {

    if (subject.length === 0) {
      setSubjectValid(false);
    }
    else if (subject.length >= 255) {
      setSubjectValid(false);
      setSubjectErrorMsg("Maximum subject length reached!");
    }
    else {
      setSubjectValid(true);
      setSubjectErrorMsg('');
    }
  }, [subject]);

  useEffect(() => {

    if (description.length === 0) {
      setDescriptionValid(false);
    }
    else if (description.length >= 1000) {
      setDescriptionValid(false);
      setDescriptionErrorMsg("Maximum subject length reached!");
    }
    else {
      setDescriptionValid(true);
    }
  }, [description]);

  useEffect(() => {

    if (subjectValid && descriptionValid && image !== '')
      setSubmitDisabled(false);
    else
      setSubmitDisabled(true);
  }, [subjectValid, descriptionValid, image])

  const confirm = () => {
    const data = {
      "subject": subject,
      "description": description,
      "file": file
    };

    props.onConfirm(data);
  };

  const onDropAccepted = acceptedFiles => {
    setFileErrorMsg('');
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
    setFile(file);
  };

  const onDropRejected = (rejectedFiles) => {
    const file = rejectedFiles[0];
    if (file) {
      setFileErrorMsg("File type not supported or file is too large!");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      'image/jpeg': [".jpeg"],
      'image/png': [".png"],
      'image/webp': [".webp"]
    },
    maxSize: 1048576,
    multiple: false,
  });

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      centered>
      <Modal.Header>
        <Modal.Title>Dodaj novu stavku</Modal.Title>
        <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Naslov</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={subject === '' ? false : !subjectValid}
                  placeholder="Enter title"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <Form.Control.Feedback className="validation-error" type="invalid">
                  {subjectErrorMsg}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter description"
                  value={description}
                  isInvalid={description === '' ? false : !descriptionValid}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Form.Control.Feedback className="validation-error" type="invalid">
                  {descriptionErrorMsg}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Col>

          <Col md={6}>
            <div
              {...getRootProps()}
              className="d-flex justify-content-center align-items-center"
              style={{
                border: '2px dashed #ccc',
                width: '100%',
                height: 267,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
            <p className="text-danger" style={{ fontSize: 10 }}>{fileErrorMsg}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose()}>
          Close
        </Button>
        <Button variant="primary" disabled={submitDisabled} onClick={() => confirm()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
