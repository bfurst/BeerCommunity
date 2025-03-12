import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import '../styles/style.css';

import { createQuery } from '../services/Api';
import TextBox from '../components/TextBox';

export default function AboutUs() {
    const navigation = useNavigate();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [subject, setSubject] = useState("");
    const [subjectValid, setSubjectValid] = useState(false);
    const [message, setMessage] = useState("");
    const [messageValid, setMessageValid] = useState(false);
    const [disableConfirm, setDisableConfirm] = useState(true);
    const [queryResponseInfo, setQueryResponseInfo] = useState("");
    const [requestLimitReached, setRequestLimitReached] = useState(false);

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    useEffect(() => {
        setDisableConfirm(!(emailValid && subjectValid && messageValid));
    }, [emailValid, subjectValid, messageValid]);

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            const query = { email, subject, body: message };
            const response = await createQuery(query);

            if (response["status"] === 429) {
                setRequestLimitReached(true);
                setQueryResponseInfo("Daily request limit reached. Please, try again later.");
            }
            else {
                setRequestLimitReached(false);
                setQueryResponseInfo("Message sent successfully. We will answer you soon.");
            }
        } catch {
            navigation("/error");
        }
    };

    return (
        <Container className="d-flex flex-column gap-3 my-3 align-items-center">
            <Card style={{ width: "52vw", marginRight: 5 }}>
                <div className="d-flex flex-column flex-lg-row">
                    <Col className="d-flex flex-column col-lg-6 col-sm-12 mb-4 mb-lg-0">
                        <iframe
                            className="w-100 h-100"
                            src="https://www.youtube.com/embed/9BnCP8OUpEI?si=FaGuprdIC9_b6aRv"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </Col>
                    <Col className="d-flex flex-column col-lg-6 col-sm-12">
                        <Card.Body className="text-start">
                            <Card.Title>Welcome</Card.Title>
                            <Card.Text>
                                to BeerCommunity, the premier community for beer enthusiasts! Here, you can discover new brews, review your favorites, and connect with fellow beer lovers. Stay updated with the latest beer news, join engaging forums, and participate in exclusive events and workshops. Our extensive beer database and user ratings help you explore and appreciate the diverse world of beer. Join us at BrewHub and share your passion for beer. Cheers to new discoveries and unforgettable beer adventures!
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </div>
            </Card>

            <Card style={{ width: "52vw", marginRight: 5 }}>
                <div className="d-flex flex-column flex-lg-row">
                    <Card.Body className="text-start">
                        <Card.Title>Contact Us</Card.Title>
                        <Card.Text>
                            We’d love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out. Our team at BrewHub is here to help and ensure you have the best experience possible.
                        </Card.Text>
                        <Card.Text className="pt-3">
                            <strong>Email: </strong>
                            <a href="mailto: admin@revbeer.info">admin@revbeer.info</a><br />
                            <strong>Phone: </strong>+385 123 1234<br />
                        </Card.Text>
                    </Card.Body>
                    <Col className="d-flex flex-column text-start col-lg-6 col-sm-12">
                        <Card.Body>
                            <Card.Title>Send us a message</Card.Title>
                            <Form id="contact-form" style={{ textAlign: "left" }}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="register-label">Email address</Form.Label>
                                    <TextBox.Simple
                                        placeholder={"Enter email address"}
                                        regex={emailPattern}
                                        errorMessage={"Email addres does not have valid form"}
                                        setData={(text, isValid) => { setEmail(text); setEmailValid(isValid) }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicSubject">
                                    <Form.Label className="register-label">Subject</Form.Label>
                                    <TextBox.Simple
                                        placeholder={"Enter subject"}
                                        setData={(text, isValid) => { setSubject(text); setSubjectValid(isValid) }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicMessage">
                                    <Form.Label className="register-label">Message</Form.Label>
                                    <TextBox.Area
                                        placeholder={"Enter message"}
                                        setData={(text, isValid) => { setMessage(text); setMessageValid(isValid); }}
                                    />
                                </Form.Group>
                                <Button
                                    disabled={disableConfirm}
                                    variant="outline-primary w-100"
                                    type="submit"
                                    onClick={sendMessage}
                                >
                                    Confirm
                                </Button>
                                <div
                                    className={`mt-2 ${requestLimitReached ? 'invalid-feedback' : 'valid-feedback'}`}
                                    style={{ minHeight: 21, display: "block" }}
                                >
                                    {queryResponseInfo}
                                </div>
                            </Form>
                        </Card.Body>
                    </Col>
                </div>
            </Card>
        </Container>
    );
}
