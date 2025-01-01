//https://www.google.com/recaptcha/admin/site/701323429/setup
//secret 6LelWM0pAAAAAM6qTHwsnfAMRkECQXA6XilRdHIS
//site 6LelWM0pAAAAAE0Tnf0qjByC7PlfAMruZfS6N806

import Card from 'react-bootstrap/Card';
import '../styles/style.css';
import * as Icon from 'react-bootstrap-icons';
import React, { useEffect } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { createNews, deleteNews, getNews, getRandomNewBeers, isAuthenticated, updateNews } from '../services/Api';
import { parse, format } from 'date-fns';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import WriteNewsModal from '../components/NewsModal';
import NewsModal from '../components/NewsModal';
import { useAuth } from '../components/AuthContext';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function AdminNews() {
    const navigation = useNavigate();

    const [data, setData] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [length, setLength] = React.useState(null);
    const [selectedNews, setSelectedNews] = React.useState(null);
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);
    const [showAddNewsModal, setShowAddNewsModal] = React.useState(false);
    const [showUpdateNewsModal, setShowUpdateNewsModal] = React.useState(false);

    useEffect(() => {
        getNewsData(page);
    }, []);

    const getNewsData = async (pageNumber) => {
        try {
            const news = await getNews(pageNumber, searchTerm);
            setLength(news["length"]);
            setData(news["data"]);

        } catch {

        }
    }

    const handleSearch = (e) => {
        try {
            e.preventDefault();
            setPage(1);
            getNewsData(1);
        } catch {
            //
        }
    };

    const clearSearch = async () => {
        try {
            const news = await getNews(1, '');
            setSearchTerm('');
            setPage(1);
            setLength(news["length"]);
            setData(news["data"]);
        } catch {
            //
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        getNewsData(pageNumber);
    }

    const addNews = async (data) => {
        try {
            setShowAddNewsModal(false);
            setSelectedNews(null);

            const news = {
                "subject": data["subject"],
                "body": data["description"]
            };

            const formData = new FormData();
            formData.append("newsData", JSON.stringify(news));
            formData.append("imageFile", data["file"]);

            await createNews(formData);
            getNewsData(page);
        } catch {

        }
    }

    const passNewsData = (newsItem) => {
        const updatedNewsItem = Object.assign({}, newsItem);
        updatedNewsItem.image = `https://localhost/uploads/news/${updatedNewsItem.image}`
        setSelectedNews(updatedNewsItem);
        setShowUpdateNewsModal(true);
    }

    const updateNewsData = async (data) => {
        const news = {
            "id": selectedNews.id,
            "subject": data["subject"],
            "body": data["description"]
        };

        setShowUpdateNewsModal(false);
        setSelectedNews(null);

        const formData = new FormData();
        formData.append("newsData", JSON.stringify(news));

        if (data["file"] !== null)
            formData.append("imageFile", data["file"]);

        await updateNews(formData);
        getNewsData(page);
    };

    const removeNews = async () => {
        try {
            setShowConfirmModal(false);
            await deleteNews(selectedNews.id);

            if (data.length === 1) {
                const newPage = page !== 1 ? page - 1 : page;
                handlePageChange(newPage);
            }
            else {
                getNewsData(page);
            }

        } catch {

        }
    }

    if (data === null)
        return <Loading />;

    return (
        <Container className="d-flex" >
            <Col>
                <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between my-5 gap-3">
                    <Col xs={12} md="auto">
                        <Form inline className="d-flex flex-column flex-md-row gap-2" onSubmit={handleSearch}>
                            <InputGroup className="position-relative w-100">
                                <FormControl
                                    type="text"
                                    placeholder="Search news..."
                                    className="mr-sm-2"
                                    style={{ width: "100%", borderRadius: "0.375rem", paddingRight: "2.5rem", minWidth: "360px" }}
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {searchTerm !== '' && (
                                    <Icon.XCircle
                                        size={24}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: 'pointer',
                                            color: 'grey',
                                            zIndex: 10,
                                        }}
                                        onClick={() => clearSearch()}
                                    />
                                )}
                            </InputGroup>
                            <Button className="btn-primary mt-2 mt-md-0 w-100 w-md-auto" onClick={(e) => handleSearch(e)}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md="auto" className="mt-2 mt-md-0">
                        <Button className="btn-success text-nowrap w-100 w-md-auto" onClick={() => setShowAddNewsModal(true)}>
                            Add News
                        </Button>
                    </Col>
                </div>

                <CardGroup className="flex-column justify-content-center gap-3 mb-5">
                    {
                        data.length > 0 ?
                            data.map((newsItem) => {
                                const date = parse(newsItem.updatedAt, 'yyyy-MM-dd HH:mm:ss', new Date());
                                const displayDate = format(date, 'dd-MM-yyyy');

                                return (
                                    <Card className="d-flex flex-column flex-lg-row rounded" style={{ marginRight: 5, minHeight: 286 }}>
                                        <Col xs={12} lg={4}>
                                            <Card.Img
                                                className="img-fluid w-100 rounded"
                                                src={`https://localhost/uploads/news/${newsItem.image}`}
                                                style={{ height: '100%', objectFit: 'cover' }}
                                            />
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <Card.Body className="text-start">
                                                <Row className="d-flex justify-content-between align-items-center mb-2">
                                                    <Card.Title className="w-75">{newsItem.subject}</Card.Title>
                                                    <div className="d-flex justify-content-end gap-3 w-25">
                                                        <Icon.Pencil color="black" cursor="pointer" size={24} title="Edit review" onClick={() => passNewsData(newsItem)} />
                                                        <Icon.Trash3 color="red" cursor="pointer" size={24} title="Delete review" onClick={() => { setSelectedNews(newsItem); setShowConfirmModal(true) }} />
                                                    </div>
                                                </Row>
                                                <Card.Text>{newsItem.body}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer
                                                className="text-end me-3 mb-2"
                                                style={{ borderTop: "none", backgroundColor: "white", color: "grey" }}
                                            >
                                                {displayDate}
                                            </Card.Footer>
                                        </Col>
                                    </Card>
                                )
                            })
                            :
                            <div>
                                <h1 style={{ color: "white" }}>Oops, there is no news found. Sorry.</h1>
                            </div>
                    }
                </CardGroup>
                {
                    length > 5 &&
                    <Pagination
                        pages={Math.ceil(length / 5)}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                }
            </Col>

            <ConfirmModal
                show={showConfirmModal}
                message="Are you sure you want to delete news?"
                reviewId={selectedNews !== null && selectedNews.id}
                onConfirm={removeNews}
                onClose={() => setShowConfirmModal(false)}
            />
            <NewsModal
                show={showAddNewsModal}
                data={null}
                onConfirm={addNews}
                onClose={() => setShowAddNewsModal(false)}
            />
            <NewsModal
                show={showUpdateNewsModal}
                data={selectedNews}
                onConfirm={updateNewsData}
                onClose={() => setShowUpdateNewsModal(false)}
            />

        </Container>
    );
}