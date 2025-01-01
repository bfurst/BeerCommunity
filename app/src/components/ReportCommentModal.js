import React, { useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { createReviewReport } from '../services/Api';
import { useNavigate } from 'react-router-dom';

const ReportCommentModal = (props) => {
  const navigation = useNavigate();

  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const categories = {
    "1": "Inappropriate Content",
    "2": "Spam",
    "3": "Fake Account",
    "4": "Sharing Personal Information",
    "5": "Other"
  }

  useEffect(() => {
    validateSubmit();
  }, [category, description]);

  const sendReport = async () => {
    try {
      const report = {
        "reviewId": props.reviewId,
        "categoryId": category,
        "description": description
      };

      await createReviewReport(report);
      props.onReportSent();
    } catch {
      navigation("/error", {});
    }
  };

  const validateSubmit = () => {
    if (!category || (category === "5" && description.length === 0))
      setDisableSubmit(true);
    else
      setDisableSubmit(false);
  }

  return (
    <Modal
      {...props}
      backdrop="static"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Report Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={categories[category] || "Choose a category"}
              onSelect={(e) => setCategory(e)}>
              {Object.keys(categories).map(key => (
                <Dropdown.Item key={key} eventKey={key}>
                  {categories[key]}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={category === "5" ? "Additionaly details required" : "Provide additional details (optional)"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required={category === "5" ? true : false}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => sendReport()}
          disabled={disableSubmit}
        >
          Submit Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportCommentModal;
