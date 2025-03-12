import React, { useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { createReview, createReviewReport, updateReview } from '../services/Api';
import * as Icon from 'react-bootstrap-icons';
import { useAuth } from './AuthContext';

const WriteReviewModal = (props) => {
  const { user } = useAuth();
  
  const [rating, setRating] = React.useState(-1);
  const [comment, setComment] = React.useState("");
  const [disableSubmit, setDisableSubmit] = React.useState(true);

  useEffect(() => {    
    if (props.data !== null) {
      setRating(props.data.rating);
      setComment(props.data.description);
    }
    else {
      setRating(-1);
      setComment("");
      setDisableSubmit(true);
    }
  }, [props.show]);

  useEffect(() => {
    validateSubmit();
  }, [rating]);

  const validateSubmit = () => {
    if (rating === -1)
      setDisableSubmit(true);
    else
      setDisableSubmit(false);
  };

  const closeModal = () => {
    props.onClose();

    setTimeout(() => {
      setRating(-1);
      setComment("");
    }, 300);
  };

  const confirm = () => {
      const review = {
        "rating": rating,
        "description": comment
      }

      props.onConfirm(review);
  };

  const fillStars = () => {
    const stars = [];

    if (props.data !== null && user.id !== props.data.reviewerId) {
      for (let i = 0; i < 5; i++) {
        if (rating < i + 1)
          stars.push(<Icon.Star size={24} color="grey" />)
        else
          stars.push(<Icon.StarFill size={24} color="gold" />)
      }
    }
    else {
      for (let i = 0; i < 5; i++) {
        if (rating < i + 1)
          stars.push(<Icon.Star size={24} color="grey" cursor="pointer" onClick={() => setRating(i + 1)} />)
        else
          stars.push(<Icon.StarFill size={24} color="gold" cursor="pointer" onClick={() => setRating(i + 1)} />)
      }
    }

    return <tbody id="select-rating" className="d-flex gap-1">{stars}</tbody>;
  }

  return (
    <Modal
      {...props}
      backdrop="static"
      centered>
      <Modal.Header>
        <Modal.Title>
          {props.data !== null ? "Edit Review" : "Create Review"}
        </Modal.Title>
        <button type="button" class="btn-close" aria-label="Close" onClick={() => closeModal()}></button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select rating</Form.Label>
            {fillStars()}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={"Write comment (optional)"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
          disabled={disableSubmit}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WriteReviewModal;
