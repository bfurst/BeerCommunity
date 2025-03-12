import 'bootstrap/dist/css/bootstrap.css';
import { useDropzone } from 'react-dropzone';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Button, Dropdown, Col, Row, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
import { createReviewDislike, createReviewLike, deleteReview, getCountries, getReviews, removeReviewDislike, removeReviewLike } from '../services/Api';
import { parse, format, setYear } from 'date-fns';
import TextBox from './TextBox';
import { Loading } from './Loading';
import { useLocation, useNavigate } from 'react-router-dom';

function BreweryModal(props) {
  const navigation = useNavigate();

  const [countries, setCountries] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [titleValid, setTitleValid] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [linkValid, setLinkValid] = React.useState(false);
  const [yearFounded, setYearFounded] = React.useState('');
  const [yearFoundedValid, setYearFoundedValid] = React.useState(false);
  const [country, setCountry] = React.useState('1');
  const [displayCountry, setDisplayCountry] = React.useState('');
  const [image, setImage] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [fileErrorMsg, setFileErrorMsg] = React.useState('');
  const [submitDisabled, setSubmitDisabled] = React.useState(null);

  useEffect(() => {
    getBreweryData();
  }, []);

  useEffect(() => {
    if (props.data !== null) {
      setTitle(props.data.name);
      setDescription(props.data.description);
      setCountry(props.data.countryId);
      setLink(props.data.url);
      setYearFounded(props.data.yearFounded);
      setImage(props.data.image);
    }
    else {
      setTitle('');
      setDescription('');
      setCountry('1');
      setLink('');
      setYearFounded('');
      setImage('');
    }

  }, [props.show]);

  useEffect(() => {
    if (countries !== null){
      const selectedCountry = countries.find(c => c.id == country);
      setDisplayCountry(selectedCountry.name);
    }
  }, [country, countries]);

  useEffect(() => {
    if (titleValid && descriptionValid && linkValid && yearFoundedValid && image !== '')
      setSubmitDisabled(false);
    else
      setSubmitDisabled(true);
  }, [titleValid, descriptionValid, linkValid, yearFoundedValid, image])

  const getBreweryData = async () => {
    try {
      const countries = await getCountries();
      setCountries(countries);
    } catch {
      navigation("/error");
    }
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

  const confirm = () => {
    const data = {
      "title": title,
      "description": description,
      "countryId": parseInt(country),
      "url": link,
      "yearFounded": yearFounded,
      "file": file
    };

    props.onConfirm(data);
  };

  if (countries === null || displayCountry === '')
    return;

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Add new brewery</Modal.Title>
        <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <Form.Group style={{ width: '100%', height: '100%' }}>
                <div
                  {...getRootProps()}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px dashed #ccc',
                    width: '100%',
                    height: '100%',
                    minHeight: '267px',
                    cursor: 'pointer',
                    overflow: 'hidden'
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
                    <p>Drag & drop the image here or click to upload</p>
                  )}
                </div>
                <p className="text-danger" style={{ fontSize: 10 }}>{fileErrorMsg}</p>
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex flex-column justify-content-between">
              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Title</Form.Label>
                <TextBox.Simple
                  value={props.data && props.data.name}
                  placeholder={"Unesite naslov"}
                  setData={(text, isValid) => { setTitle(text); setTitleValid(isValid) }}
                />
              </Form.Group>

              <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Description</Form.Label>
                <TextBox.Area
                  value={props.data && props.data.description}
                  placeholder={"Unesite opis"}
                  setData={(text, isValid) => { setDescription(text); setDescriptionValid(isValid) }}
                />
              </Form.Group>

              <Dropdown onSelect={e => setCountry(e)} className="d-flex flex-column mt-2">
                <Dropdown.Toggle className="btn-secondary text-start" id="dropdown-basic">
                  Country: {displayCountry}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    countries.map(country => {
                      return <Dropdown.Item eventKey={country.id}>{country.name}</Dropdown.Item>
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group controlId="formLink" className="mt-2">
                <Form.Label>Official website</Form.Label>
                <TextBox.Url
                  value={props.data && props.data.url}
                  placeholder={"Unesite URL"}
                  regex={/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/}
                  errorMessage={"Web link is not valid URL!"}
                  setData={(text, isValid) => { setLink(text); setLinkValid(isValid) }}
                />
              </Form.Group>

              <Form.Group controlId="yearFounded" className="mt-2">
                <Form.Label>Year of foundation</Form.Label>
                <TextBox.Number
                  value={props.data && props.data.yearFounded}
                  placeholder={"Unesite godinu osnivanja"}
                  min={804}
                  max={new Date().getFullYear()}
                  maxLength={4}
                  errorMessage={"Field value must be number between 804 and " + new Date().getFullYear()}
                  setData={(text, isValid) => { setYearFounded(text); setYearFoundedValid(isValid) }}
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

export default BreweryModal;
