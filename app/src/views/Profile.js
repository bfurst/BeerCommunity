import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import '../styles/style.css';

import { parse, format } from 'date-fns';

import { countReviews, removeProfileImage, uploadProfileImage } from '../services/Api';
import { useAuth } from '../components/AuthContext';
import ResetEmailModal from '../components/ResetEmailModal';
import ConfirmModal from '../components/ConfirmModal';
import { Loading } from '../components/Loading';

export default function Profile() {
    const { user, updateUserProfileImage } = useAuth();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [reviewsCount, setReviewsCount] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [showEmailResetModal, setShowEmailResetModal] = useState(false);
    const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);

    useEffect(() => {
        if (user.profileImage) {
            setImage(`https://localhost/uploads/profile/${user.profileImage}`);
        }
        fetchReviewsCount();
    }, []);

    const fetchReviewsCount = async () => {
        try {
            const numberOfReviews = await countReviews();
            setReviewsCount(numberOfReviews);
        } catch {
            navigate("/error");
        }
    };

    const saveProfileImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadedImage = await uploadProfileImage(formData);
            updateUserProfileImage(uploadedImage.fullName);
        } catch {
            navigate("/error");
        }
    };

    const deleteProfileImage = async () => {
        try {
            await removeProfileImage();
            setImage(null);
            updateUserProfileImage(null);
        } catch {
            navigate("/error");
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: (acceptedFiles) => {
            setErrorMsg('');
            const file = acceptedFiles[0];

            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);

            saveProfileImage(file);
        },
        onDropRejected: (rejectedFiles) => {
            if (rejectedFiles[0]) {
                setErrorMsg("File type not supported or file is too large!");
            }
        },
        accept: {
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        maxSize: 1048576,
        multiple: false,
    });

    const formatDisplayDate = () => {
        const date = parse(user.accountCreated, 'yyyy-MM-dd', new Date());
        return format(date, 'dd-MM-yyyy');
    };

    if (reviewsCount === null) return <Loading />;

    return (
        <Container className="d-flex flex-column gap-3 my-auto align-items-center">
            <Row className="d-flex justify-content-center gap-3 my-5">
                <Card className="text-center p-3" style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title className="mb-3">Upload Profile Image</Card.Title>
                        <div
                            {...getRootProps()}
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                border: image ? "none" : "2px dashed #ccc",
                                borderRadius: "50%",
                                width: "150px",
                                height: "150px",
                                cursor: "pointer",
                                overflow: "hidden",
                                margin: "0 auto",
                            }}
                        >
                            <input {...getInputProps()} />
                            <Image
                                src={image}
                                className="w-100 h-100"
                                roundedCircle
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <p className="mt-2" style={{ fontSize: 12 }}>
                            Please, upload profile picture. You can upload by clicking or drag and drop.
                        </p>
                        <p className="text-danger" style={{ fontSize: 10 }}>{errorMsg}</p>
                    </Card.Body>
                    <Card.Footer className="d-flex flex-row justify-content-center gap-3" style={{ backgroundColor: "transparent", border: "none" }}>
                        <Button variant="primary" style={{ fontSize: 12 }} onClick={() => document.querySelector('input[type="file"]').click()}>
                            Choose File
                        </Button>
                        {image && (
                            <Button variant="danger" style={{ fontSize: 12 }} onClick={deleteProfileImage}>
                                Remove Image
                            </Button>
                        )}
                    </Card.Footer>
                </Card>

                <Card className="p-3" style={{ width: "36rem" }}>
                    <Card.Body>
                        <Card.Title className="mb-4">User Profile</Card.Title>

                        <Row className="mb-3">
                            <Col xs={6}><strong>Username:</strong></Col>
                            <Col xs={6}>{user.username}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><strong>Email:</strong></Col>
                            <Col xs={6}>{user.email}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><strong>Total Reviews:</strong></Col>
                            <Col xs={6}>{reviewsCount.numberOfReviews}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><strong>Member Since:</strong></Col>
                            <Col xs={6}>{formatDisplayDate()}</Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between" style={{ backgroundColor: "transparent", border: "none" }}>
                        <Button variant="primary" onClick={() => setShowEmailResetModal(true)}>Change Email</Button>
                        <Button variant="warning" onClick={() => navigate("/verification-required", { state: { email: user.email, type: "pswd-reset" } })}>
                            Reset Password
                        </Button>
                        <Button variant="danger" onClick={() => setShowAccountDeleteModal(true)}>Delete Account</Button>
                    </Card.Footer>
                </Card>
            </Row>

            <ConfirmModal
                show={showAccountDeleteModal}
                message={"Are you sure you want to permanently delete your account?"}
                onConfirm={() => navigate("/verification-required", { state: { email: user.email, type: "delete-account" } })}
                onClose={() => setShowAccountDeleteModal(false)}
            />
            <ResetEmailModal show={showEmailResetModal} onClose={() => setShowEmailResetModal(false)} />
        </Container>
    );
}
