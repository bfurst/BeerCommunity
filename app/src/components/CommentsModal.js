import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Button, Dropdown, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
import { createReviewDislike, createReviewLike, deleteReview, getReviews, removeReviewDislike, removeReviewLike } from '../services/Api';
import { parse, format } from 'date-fns';
import ReportCommentModal from './ReportCommentModal';
import WriteReviewModal from './WriteReviewModal';
import ConfirmModal from './ConfirmModal';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';

const CommentsModal = (props) => {
  const { user } = useAuth();
  const navigation = useNavigate();

  const [displayData, setDisplayData] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('newest');
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [selectedReview, setSelectedReview] = React.useState(null);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [usersReview, setUsersReview] = React.useState(null);

  const sortOrderMap = {
    'newest': 'Newest first',
    'popular': 'Popular',
    'ratingHigh': 'Highest rating',
    'ratingLow': 'Lowest rating',
  };

  useEffect(() => {
    fill();
  }, [props.data, sortOrder])

  const fill = async () => {
    try {
      if (props.data !== null) {
        const reviews = await getReviews(props.data.id, sortOrder);
        sortData(reviews);
      }
    } catch {
      navigation("/error", {});
    }
  };

  const sortData = (data) => {
    if (data !== null) {
      let sortedData = [...data];
      let userReview = sortedData.find(review => review.reviewerId === user.id);

      setUsersReview(userReview);

      switch (sortOrder) {
        default:
          break;
        case "newest":
          sortedData.sort((r1, r2) => {
            return new Date(r2.createdAt) - new Date(r1.createdAt)
          });
          break;
        case "popular":
          sortedData.sort((r1, r2) => r2.numberOfLikes - r1.numberOfLikes);
          break;
        case "ratingHigh":
          sortedData.sort((r1, r2) => r2.rating - r1.rating);
          break;
        case "ratingLow":
          sortedData.sort((r1, r2) => r1.rating - r2.rating);
          break;
      }

      if (userReview !== undefined)
        sortedData.sort((r1) => {
          if (r1.reviewerId === userReview.reviewerId) {
            return -1;
          }
        });

      setDisplayData(sortedData);
    }
  }


  const calculateStars = (number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (number >= i + 1)
        stars.push(<Icon.StarFill size={24} color='gold' />);
      else
        stars.push(<Icon.Star size={24} color='gold' />);
    }

    return <tbody>{stars}</tbody>;
  };

  const calculateTime = (createdAt) => {
    const date = parse(createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());
    const daysDiff = (new Date() - date) / (1000 * 60 * 60 * 24);

    if (daysDiff < 1)
      return "today";
    else if (daysDiff < 7)
      return parseInt(daysDiff) + " days ago";
    else if (daysDiff < 14)
      return "1 week ago";
    else if (daysDiff >= 14 && daysDiff < 30)
      return parseInt(daysDiff / 7) + " weeks ago";
    else if (daysDiff < 60)
      return "1 month ago";
    else if (daysDiff < 365)
      return parseInt(daysDiff / 30) + " months ago";
    else if (daysDiff / 365 < 2)
      return "1 year ago"
    else
      return parseInt(daysDiff / 365) + " years ago";
  };

  const removeReview = async () => {
    try {
      await deleteReview(usersReview.id);

      const data = displayData.filter(review => review.id !== usersReview.id);
      sortData(data);

      setShowConfirmModal(false);
      props.onShow();
    } catch {
      navigation("/error", {});
    }
  };

  const likeReview = async (id) => {
    try {
      const data = displayData.map(review =>
        review.id === id ?
          {
            ...review,
            numberOfLikes: review.numberOfLikes + 1,
            numberOfDislikes: review.isDisliked ? review.numberOfDislikes - 1 : review.numberOfDislikes,
            isLiked: true,
            isDisliked: false
          } :
          review
      );

      setDisplayData(data);
      await createReviewLike(id);
    } catch {
      navigator("/error", {});
    }
  }

  const removeLikeFromReview = async (id) => {
    try {
      const data = displayData.map(review =>
        review.id === id ?
          {
            ...review,
            numberOfLikes: review.numberOfLikes - 1,
            isLiked: false,
          } :
          review
      );

      setDisplayData(data);
      await removeReviewLike(id);
    } catch {
      navigation("/error", {});
    }
  }

  const dislikeReview = async (id) => {
    try {
      const data = displayData.map(review =>
        review.id === id ?
          {
            ...review,
            numberOfDislikes: review.numberOfDislikes + 1,
            numberOfLikes: review.isLiked ? review.numberOfLikes - 1 : review.numberOfLikes,
            isLiked: false,
            isDisliked: true
          } :
          review
      );

      setDisplayData(data);
      await createReviewDislike(id);
    } catch {
      navigation("/error", {});
    }
  }

  const removeDislikeFromReview = async (id) => {
    try {
      const data = displayData.map(review =>
        review.id === id ?
          {
            ...review,
            numberOfDislikes: review.numberOfDislikes - 1,
            isDisliked: false,
          } :
          review
      );

      setDisplayData(data);
      await removeReviewDislike(id);
    } catch {
      navigation("/error", {});
    }
  }

  const handleReviewReportSent = () => {
    try {
      const data = displayData.map(review =>
        review.id === selectedReview.id ?
          { ...review, IsReported: true, } :
          review
      );

      setSelectedReview(null);
      setShowReportModal(false);
      setDisplayData(data);

      props.onShow();
    } catch {
      navigation("/error", {});
    }
  }

  const handleReport = (report) => {
    props.onHide()

    setSelectedReview(report);
    setShowReportModal(true);
  };

  const handleReviewAdded = () => {
    setSelectedReview(null);
    setShowReviewModal(false);
    fill();

    props.onShow();
  };

  if (props.data == null || displayData === null)
    return <Loading />

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex flex-wrap justify-content-between gap-3 align-items-center">
          <Modal.Title className="me-auto text-nowrap" id="contained-modal-title-vcenter">
            {props.data.name}
          </Modal.Title>
          <button type="button" class="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
          <div className="d-flex flex-column justify-content-end flex-md-row w-100 gap-2">
            <Button
              className="w-100 w-md-auto"
              disabled={usersReview !== undefined}
              style={{ backgroundColor: "purple", borderColor: "purple", width: "140px", minWidth: "140px" }}
              onClick={() => {
                setShowReviewModal(true);
                props.onHide();
              }}
            >
              Write comment
            </Button>

            <Dropdown onSelect={e => setSortOrder(e)} className="w-100 w-md-auto" style={{ width: "140px", minWidth: "140px" }}>
              <Dropdown.Toggle className="btn-primary w-100 text-start" id="dropdown-basic">
                Filter: {sortOrderMap[sortOrder]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="newest">Newest first</Dropdown.Item>
                <Dropdown.Item eventKey="popular">Popular</Dropdown.Item>
                <Dropdown.Item eventKey="ratingHigh">Highest rating</Dropdown.Item>
                <Dropdown.Item eventKey="ratingLow">Lowest rating</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Modal.Header>

        <Modal.Body>
          {
            displayData.length > 0 ?
              displayData.map((review) => {
                return (
                  <div className="mb-3">
                    <div className="d-flex flex-row align-items-center gap-3">
                      <Col>
                        <img
                          src={"https://localhost/uploads/profile/" + review.reviewerProfileImage}
                          className="rounded-circle"
                          style={{ width: "24px", height: "24px", objectFit: "cover" }}
                        />
                        <h5>{review.reviewerUsername}</h5>
                        <h6 className="d-flex align-items-center"><i style={{ color: "grey" }}>{calculateTime(review.createdAt)}</i></h6>
                      </Col>
                      {calculateStars(review.rating)}
                    </div>
                    <p>
                      {review.description}
                    </p>
                    <div className="d-flex flex-row gap-3">
                      <div className="d-flex flex-row">
                        {
                          usersReview !== undefined && usersReview.id === review.id ?
                            <Icon.HandThumbsUp color="grey" size={24} title="Like" />
                            :
                            review.isLiked ?
                              <Icon.HandThumbsUpFill color="green" cursor="pointer" size={24} title="Liked" onClick={() => removeLikeFromReview(review.id)} />
                              :
                              <Icon.HandThumbsUp color="grey" cursor="pointer" size={24} title="Like" onClick={() => likeReview(review.id)} />
                        }
                        <span className="ms-1">
                          {review.numberOfLikes}
                        </span>
                      </div>
                      <div className="d-flex flex-row">
                        {
                          usersReview !== undefined && usersReview.id === review.id ?
                            <Icon.HandThumbsDown color="red" size={24} title="Dislike" />
                            :
                            review.isDisliked ?
                              <Icon.HandThumbsDownFill color="red" cursor="pointer" size={24} title="Disliked" onClick={() => removeDislikeFromReview(review.id)} />
                              :
                              <Icon.HandThumbsDown color="red" cursor="pointer" size={24} title="Dislike" onClick={() => dislikeReview(review.id)} />
                        }
                        <span className="ms-1">
                          {review.numberOfDislikes}
                        </span>
                      </div>
                      {
                        usersReview !== undefined && usersReview.id === review.id ?
                          <div className="d-flex ms-auto gap-3">
                            <Icon.Pencil className="ms-auto" color="black" cursor="pointer" size={24} title="Edit review" onClick={() => { setShowReviewModal(true); setSelectedReview(review); props.onHide() }} />
                            <Icon.Trash3 className="ms-auto" color="red" cursor="pointer" size={24} title="Delete review" onClick={() => { setShowConfirmModal(true); props.onHide() }} />
                          </div>
                          :
                          review.isReported ?
                            <Icon.PersonExclamation className="ms-auto" color="grey" size={24} title="Review alredy reported" />
                            :
                            <Icon.PersonExclamation className="ms-auto" color="red" cursor="pointer" size={24} title="Report comment" onClick={() => handleReport(review)} />
                      }
                    </div>
                  </div>
                );
              })
              :

              <div className="my-3">
                <p style={{ color: "grey" }}>There are no comments for this beer yet.</p>
              </div>
          }
        </Modal.Body>
      </Modal>
      <WriteReviewModal
        show={showReviewModal}
        beerId={props.data.id}
        data={selectedReview}
        onHide={() => { setShowReviewModal(false); props.onShow() }}
        onClose={() => { setShowReviewModal(false); setSelectedReview(null); props.onShow() }}
        onReviewAdded={handleReviewAdded}
      />

      <ReportCommentModal
        show={showReportModal}
        id={selectedReview !== null && selectedReview.id}
        onHide={() => { setShowReportModal(false); props.onShow() }}
        onClose={() => { setShowReportModal(false); props.onShow() }}
        onReportSent={handleReviewReportSent}
      />

      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this review?"
        id={usersReview !== undefined && usersReview.id}
        onConfirm={removeReview}
        onHide={() => { setShowConfirmModal(false); props.onShow() }}
        onClose={() => { setShowConfirmModal(false); props.onShow() }}
      />
    </div>
  );
}

export default CommentsModal;