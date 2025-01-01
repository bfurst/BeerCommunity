import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Button, Dropdown, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';
import { activateUserAccount, adminDeleteReview, adminUpdateReview, createRestriction, createReview, createReviewDislike, createReviewLike, deleteReview, deleteUsersReview, getAdminReviews, removeReviewDislike, removeReviewLike } from '../services/Api';
import { parse, format } from 'date-fns';
import ReportCommentModal from './ReportCommentModal';
import WriteReviewModal from './WriteReviewModal';
import ConfirmModal from './ConfirmModal';
import AdminDeleteReviewModal from './DeleteUsersReviewModal';
import IssueRestrictionModal from './IssueRestrictionModal';
import UnlockUserModal from './UnlockUserModal';
import { Loading } from './Loading';

const AdminCommentsModal = (props) => {
  const { user } = useAuth();
  const navigation = useNavigate();

  const [displayData, setDisplayData] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('reports');
  const [selectedReview, setSelectedReview] = React.useState(null);
  const [showAddReviewModal, setShowAddReviewModal] = React.useState(false);
  const [showUpdateReviewModal, setShowUpdateReviewModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showUnlockUserModal, setshowUnlockUserModal] = React.useState(false);
  const [showDeleteUsersReviewModal, setShowDeleteUsersReviewModal] = React.useState(false);
  const [showIssueRestrictionModal, setShowIssueRestrictionModal] = React.useState(false);
  const [usersReview, setUsersReview] = React.useState(null);

  const sortOrderMap = {
    'reports': 'By reports',
    'newest': 'Newest first',
    'popular': 'Popular',
    'ratingHigh': 'Highest rating',
    'ratingLow': 'Lowest rating',
  };

  useEffect(() => {
    getReviewsData();
  }, [props.data, sortOrder])

  const getReviewsData = async () => {
    try {
      if (props.data !== null) {
        const reviews = await getAdminReviews(props.data.id, sortOrder);
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

  const addReview = async (data) => {
    try {

      const review = {
        "rating": data["rating"],
        "description": data["description"],
        "beerId": props.data.id
      };

      await createReview(review);
      setShowAddReviewModal(false);
      getReviewsData();
      props.onShow();
    } catch {
      navigation("/error", {});
    }
  }

  const updateReview = async (data) => {
    try {

      const review = {
        "id": selectedReview.id,
        "rating": data["rating"],
        "description": data["description"],
      };

      await adminUpdateReview(review);
      const displayDataUpdated = displayData.map((review) =>
        review.id === selectedReview.id ? { ...review, rating: data["rating"], description: data["description"] } : review
      );

      setDisplayData(displayDataUpdated);
      setSelectedReview(null);
      setShowUpdateReviewModal(false);
      props.onShow();
    } catch {
      navigation("/error", {});
    }
  }

  const displayRemoveReviewModal = (review) => {
    setSelectedReview(review);

    if (review.reviewerId === user.id)
      setShowConfirmModal(true);
    else
      setShowDeleteUsersReviewModal(true);

    props.onHide()
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

  const removeUsersReview = async (data) => {
    try {
      await deleteUsersReview(data);

      const filteredData = displayData.filter(review => review.id !== data["id"]);
      sortData(filteredData);

      setShowDeleteUsersReviewModal(false);
      setSelectedReview(null);
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
      navigator("/error", {});
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
      navigator("/error", {});
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
      navigator("/error", {});
    }
  }

  const issueRestriction = async (data) => {
    try {
      const restriction = {
        "userId": selectedReview.reviewerId,
        "description": data["description"],
        "reportCategoryId": data["reportCategory"],
        "restrictionCategoryId": data["restrictionDuration"]
      };

      const rewiewsData = displayData.map(review =>
        review.id === selectedReview.id ?
          {
            ...review,
            userLocked: true,
          } :
          review
      );

      setDisplayData(rewiewsData);
      setSelectedReview(null);
      setShowIssueRestrictionModal(false);
      props.onShow();

      await createRestriction(restriction);

    } catch {
      navigation("/error", {});
    }
  }

  const unlockUserAccount = async () => {
    try {
      const userId = selectedReview.reviewerId;
      const data = displayData.map(review =>
        review.id === selectedReview.id ?
          {
            ...review,
            userLocked: false,
          } :
          review
      );

      setDisplayData(data);
      setSelectedReview(null);
      setshowUnlockUserModal(false);
      props.onShow();

      await activateUserAccount(userId);

    } catch {
      navigation("/error", {});
    }
  }

  const popover = (reports) => (
    <Popover id="info-popover">
      <Popover.Body>
        {reports.map((report, index) => (
          <div className="d-flex flex-row gap-3 align-items-center" key={index}>
            <b>{report.username}</b>
            <small>{report.categoryName}</small>
          </div>
        ))}
      </Popover.Body>
    </Popover>
  );

  if (props.data !== null || displayData === null)
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
                setShowAddReviewModal(true);
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
                {
                  Object.entries(sortOrderMap).map(([key, value]) => {
                    return <Dropdown.Item eventKey={key}>{value}</Dropdown.Item>
                  })
                }
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
                    <div className="d-flex flex-row gap-3">
                      <Col>
                        <div className="d-flex flex-row align-items-center gap-3">
                          <img
                            src={"https://localhost/uploads/profile/" + review.reviewerProfileImage}
                            className="rounded-circle"
                            style={{ width: "24px", height: "24px", objectFit: "cover" }}
                          />
                          <h5>{review.reviewerUsername}</h5>
                          {
                            review.userLocked ?
                              <Icon.PersonLock color="green" cursor="pointer" size={24} title="Unlock user" onClick={() => { setshowUnlockUserModal(true); setSelectedReview(review); unlockUserAccount(); props.onHide() }} />
                              :
                              <Icon.PersonDash color="red" cursor="pointer" size={24} title="Issue user restriction" onClick={() => { setShowIssueRestrictionModal(true); setSelectedReview(review); props.onHide() }} />
                          }
                          {
                            review.reviewReports.length > 0 &&
                            <>
                              <div className="d-flex flex-row gap-2">
                                <OverlayTrigger
                                  trigger={["hover", "focus"]}
                                  placement="top"
                                  overlay={popover(review.reviewReports)}
                                >
                                  <Icon.InfoCircle className="mt-1" color="grey" cursor="pointer" size={16} title="Info" />
                                </OverlayTrigger>
                                {review.reviewReports.length} Reports
                              </div>
                            </>
                          }
                        </div>
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
                        <div className="d-flex ms-auto gap-3">
                          <Icon.Pencil className="ms-auto" color="black" cursor="pointer" size={24} title="Edit review" onClick={() => { setSelectedReview(review); setShowUpdateReviewModal(true); props.onHide() }} />
                          <Icon.Trash3 className="ms-auto" color="red" cursor="pointer" size={24} title="Delete review" onClick={() => displayRemoveReviewModal(review)} />
                        </div>
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
        show={showAddReviewModal}
        data={null}
        onConfirm={addReview}
        onHide={() => { setShowAddReviewModal(false); props.onShow() }}
        onClose={() => { setShowAddReviewModal(false); setSelectedReview(null); props.onShow() }}
      />

      <WriteReviewModal
        show={showUpdateReviewModal}
        data={selectedReview}
        onConfirm={updateReview}
        onHide={() => { setShowUpdateReviewModal(false); props.onShow() }}
        onClose={() => { setShowUpdateReviewModal(false); setSelectedReview(null); props.onShow() }}
      />

      <AdminDeleteReviewModal
        show={showDeleteUsersReviewModal}
        data={selectedReview}
        onConfirm={removeUsersReview}
        onHide={() => { setShowDeleteUsersReviewModal(false); props.onShow() }}
        onClose={() => { setShowDeleteUsersReviewModal(false); setSelectedReview(null); props.onShow() }}
      />

      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this review?"
        id={usersReview !== undefined && usersReview.id}
        onConfirm={removeReview}
        onHide={() => { setShowConfirmModal(false); props.onShow() }}
        onClose={() => { setShowConfirmModal(false); props.onShow() }}
      />

      <UnlockUserModal
        show={showUnlockUserModal}
        user={selectedReview !== null && selectedReview.reviewerUsername}
        onConfirm={unlockUserAccount}
        onHide={() => { setshowUnlockUserModal(false); props.onShow() }}
        onClose={() => { setshowUnlockUserModal(false); props.onShow() }}
      />

      <IssueRestrictionModal
        show={showIssueRestrictionModal}
        user={selectedReview !== null && selectedReview.reviewerUsername}
        reportCategories={props.reportCategories}
        restrictionCategories={props.restrictionCategories}
        onConfirm={issueRestriction}
        onHide={() => { setShowIssueRestrictionModal(false); setSelectedReview(null); props.onShow() }}
        onClose={() => { setShowIssueRestrictionModal(false); setSelectedReview(null); props.onShow() }}
      />
    </div>
  );
}

export default AdminCommentsModal;