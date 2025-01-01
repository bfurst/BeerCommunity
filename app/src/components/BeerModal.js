import 'bootstrap/dist/css/bootstrap.css';
import { useDropzone } from 'react-dropzone';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Button, Dropdown, Col, Row, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
import { createReviewDislike, createReviewLike, deleteReview, getBeerCategories, getBeerShades, getCountries, getReviews, removeReviewDislike, removeReviewLike } from '../services/Api';
import { parse, format, setYear } from 'date-fns';
import TextBox from './TextBox';
import { Loading } from './Loading';

function BeerModal(props) {
  const [name, setName] = React.useState('');
  const [nameValid, setNameValid] = React.useState(false);
  const [shades, setShades] = React.useState(null);
  const [shade, setShade] = React.useState('1');
  const [displayShade, setDisplayShade] = React.useState('');
  const [categories, setCategories] = React.useState(null);
  const [category, setCategory] = React.useState('1');
  const [displayCategory, setDisplayCategory] = React.useState('');
  const [alcoholPercentage, setAlcoholPercentage] = React.useState('');
  const [alcoholPercentageValid, setAlcoholPercentageValid] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [yearIntroduced, setYearIntroduced] = React.useState('');
  const [yearIntroducedValid, setYearIntroducedValid] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [image, setImage] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [fileErrorMsg, setFileErrorMsg] = React.useState('');
  const [submitDisabled, setSubmitDisabled] = React.useState(null);

  useEffect(() => {
    setCategories(props.categories);
    setShades(props.shades);

    if (props.data !== null) {
      setName(props.data.name);
      setImage(props.data.image);
      setAlcoholPercentage(props.data.alcoholPercentage);
      setDescription(props.data.description);
      setYearIntroduced(props.data.yearIntroduced);
      setIsAvailable(props.data.isAvailable);
      setCategory(props.data.categoryId);
      setShade(props.data.shadeId);
    }
    else {
      setName('');
      setImage('');
      setAlcoholPercentage('');
      setDescription('');
      setYearIntroduced('');
      setIsAvailable(true);
      setCategory('1');
      setShade('1');
    }

  }, [props.show]);

  useEffect(() => {
    if (categories !== null) {
      const selectedCategory = categories.find(c => c.id == category);
      setDisplayCategory(selectedCategory.name);
    }
  }, [category, categories]);

  useEffect(() => {
    if (shades !== null) {
      const selectedShade = shades.find(s => s.id == shade);
      setDisplayShade(selectedShade.shade);
    }
  }, [shade, shades]);

  useEffect(() => {
    if (nameValid && descriptionValid && alcoholPercentageValid && yearIntroducedValid && image !== '')
      setSubmitDisabled(false);
    else
      setSubmitDisabled(true);
  }, [nameValid, descriptionValid, alcoholPercentageValid, yearIntroducedValid, image])

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

  const confirm = () => {
    const data = {
      "name": name,
      "file": file,
      "alcoholPercentage": parseFloat(alcoholPercentage),
      "description": description,
      "yearIntroduced": yearIntroduced,
      "isAvailable": isAvailable,
      "categoryId": parseInt(category),
      "shadeId": parseInt(shade)
    };

    props.onConfirm(data);
  };

  if (shades === null || displayShade === '' || categories === null || displayCategory === '')
    return <Loading />

  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Dodaj novu pivu</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex justify-content-center mb-4">
            <Form.Group style={{ width: '100%' }}>
              <div
                {...getRootProps()}
                className="d-flex justify-content-center align-items-center"
                style={{
                  border: '2px dashed #ccc',
                  width: '100%',
                  height: '300px',
                  cursor: 'pointer',
                  overflow: 'hidden',
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
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <p>Povucite sliku ovdje ili kliknite za učitavanje</p>
                )}
              </div>
              <p className="text-danger" style={{ fontSize: 10 }}>{fileErrorMsg}</p>
            </Form.Group>
          </div>

          <Row>
            <Col>

              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Name</Form.Label>
                <TextBox.Simple
                  value={props.data && props.data.name}
                  placeholder={"Enter beer name"}
                  setData={(text, isValid) => { setName(text); setNameValid(isValid); }}
                />
              </Form.Group>

              <Dropdown onSelect={e => setCategory(e)} className="d-flex flex-column mt-2">
                <Dropdown.Toggle className="btn-secondary text-start" id="dropdown-basic">
                  Category: {displayCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map(category => (
                    <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Description</Form.Label>
                <TextBox.Area
                  value={props.data && props.data.description}
                  placeholder={"Enter beer description"}
                  setData={(text, isValid) => { setDescription(text); setDescriptionValid(isValid); }}
                />
              </Form.Group>

              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Percentage of alcohol</Form.Label>
                <TextBox.DecimalNumber
                  value={props.data && props.data.alcoholPercentage}
                  placeholder="Enter alcohol percentage (example 4.5)"
                  min={0}
                  max={100}
                  maxLength={5}
                  decimals={1}
                  errorMessage="Decimal number is not valid"
                  optional={false}
                  setData={(text, isValid) => { setAlcoholPercentage(text); setAlcoholPercentageValid(isValid); }}
                />
              </Form.Group>

              <Dropdown onSelect={e => setShade(e)} className="d-flex flex-column mt-2">
                <Dropdown.Toggle className="btn-secondary text-start" id="dropdown-basic">
                  Shade: {displayShade}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {shades.map(shade => (
                    <Dropdown.Item key={shade.id} eventKey={shade.id}>{shade.shade}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group controlId="yearFounded" className="mt-2">
                <Form.Label>Year of introduction</Form.Label>
                <TextBox.Number
                  value={props.data && props.data.yearIntroduced}
                  placeholder={"Enter year of introduction"}
                  min={804}
                  max={new Date().getFullYear()}
                  maxLength={4}
                  errorMessage={"Field value must be number between 804 and " + new Date().getFullYear()}
                  setData={(text, isValid) => { setYearIntroduced(text); setYearIntroducedValid(isValid); }}
                />
              </Form.Group>

              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Is currently available?</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={isAvailable ? "Yes" : "No"}
                  checked={isAvailable}
                  onClick={() => setIsAvailable(!isAvailable)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose()}>
          Zatvori
        </Button>
        <Button variant="primary" disabled={submitDisabled} onClick={confirm}>
          Spremi
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default BeerModal;
