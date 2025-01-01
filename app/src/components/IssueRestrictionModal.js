import React, { useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { createReview, createReviewReport, updateReview } from '../services/Api';
import * as Icon from 'react-bootstrap-icons';
import { useAuth } from './AuthContext';
import TextBox from './TextBox';
import { useNavigate } from 'react-router-dom';

const IssueRestrictionModal = (props) => {
    const navigation = useNavigate();
    
    const [restrictionCategory, setRestrictionCategory] = React.useState(1);
    const [displayRestrictionCategory, setDisplayRestrictionCategory] = React.useState('');
    const [description, setDescription] = React.useState("");
    const [descriptionValid, setDescriptionValid] = React.useState(false);
    const [restrictionDuration, setRestrictionDuration] = React.useState(1);
    const [displayRestrictionDuration, setDisplayRestrictionDuration] = React.useState('');

    useEffect(() => {
        setRestrictionCategory(1);
        setDescription("");
        setRestrictionDuration(1);
    }, [props.show]);

    useEffect(() => {
        if (props.reportCategories !== null) {
          const selectedCategory = props.reportCategories.find(c => c.id == restrictionCategory);
          setDisplayRestrictionCategory(selectedCategory.name);
        }
      }, [restrictionCategory, props.reportCategories]);

      useEffect(() => {
        if (props.restrictionCategories !== null) {
          const selectedCategory = props.restrictionCategories.find(c => c.id == restrictionDuration);
          setDisplayRestrictionDuration(selectedCategory.name);
        }
      }, [restrictionDuration, props.restrictionCategories]);

    const closeModal = () => {
        props.onClose();

        setTimeout(() => {
            setRestrictionCategory(1);
            setDescription("");
            setRestrictionDuration(1);
        }, 300);
    };

    const confirm = async () => {
        try {
            const restriction = {
                "reportCategory": restrictionCategory,
                "description": description,
                "restrictionDuration": restrictionDuration
            }

            props.onConfirm(restriction);
        } catch {
            navigation("/error", {});
        }
    };

    if (props.restrictionCategories === null || props.user === null)
        return;

    return (
        <Modal
            {...props}
            backdrop="static"
            centered>
            <Modal.Header>
                <Modal.Title>
                    Issue Restriction
                </Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => closeModal()}></button>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to issue restriction to user <b>{props.user}</b>?
                <Form className="mt-3">
                    <Form.Group>
                        <Form.Label>Select report category</Form.Label>
                        <Dropdown onSelect={e => setRestrictionCategory(e)} className="d-flex flex-column mt-2">
                            <Dropdown.Toggle className="btn-secondary text-start" id="dropdown-basic">
                                Report category: {displayRestrictionCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {props.reportCategories.map(category => (
                                    <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Select restriction category</Form.Label>
                        <Dropdown onSelect={e => setRestrictionDuration(e)} className="d-flex flex-column mt-2">
                            <Dropdown.Toggle className="btn-secondary text-start" id="dropdown-basic">
                                Restriction duration: {displayRestrictionDuration}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {props.restrictionCategories.map(category => (
                                    <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-2">
                        <Form.Label>Description</Form.Label>
                        <TextBox.Area
                            placeholder={"Enter description"}
                            setData={(text, isValid) => { setDescription(text); setDescriptionValid(isValid); }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => confirm()}
                    disabled={!descriptionValid}
                >
                    Issue Restriction
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default IssueRestrictionModal;

