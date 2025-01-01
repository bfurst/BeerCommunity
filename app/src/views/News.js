import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Icon from 'react-bootstrap-icons';
import { Container, Card, CardGroup, Row, Col, Form, FormControl, Button, InputGroup } from 'react-bootstrap';

import { parse, format } from 'date-fns';

import '../styles/style.css';

import { getNews } from '../services/Api';
import Pagination from '../components/Pagination';
import { Loading } from '../components/Loading';
import NewsNotFound from '../components/NewsNotFound';


export default function News() {
    const navigation = useNavigate();

    const [data, setData] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [length, setLength] = React.useState(null);

    useEffect(() => {
        getNewsData(page);
    }, [page]);

    const getNewsData = async (pageNumber) => {
        try {
            const news = await getNews(pageNumber, searchTerm);
            setLength(news.length);
            setData(news.data);
        } catch {
            navigation("/error");
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        getNewsData(1);
    };

    const clearSearch = async () => {
        try {
            const news = await getNews(1, '');
            setSearchTerm('');
            setPage(1);
            setLength(news.length);
            setData(news.data);
        } catch {
            navigation("/error");
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        getNewsData(pageNumber);
    }

    if (data === null) {
        return <Loading />;
    }

    return (
        <Container className="d-flex mt-5 justify-content-center">
            <Col>
                <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between my-5 gap-3">
                    <Col xs={12} md="auto">
                        <Form className="d-flex flex-column flex-md-row gap-2" onSubmit={handleSearch}>
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
                                        onClick={clearSearch}
                                    />
                                )}
                            </InputGroup>
                            <Button className="btn-primary mt-2 mt-md-0 w-100 w-md-auto" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </div>

                <CardGroup className="flex-column justify-content-center gap-3 mb-5">
                    {data.length > 0 ? (
                        data.map((newsItem) => {
                            const date = parse(newsItem.updatedAt, 'yyyy-MM-dd HH:mm:ss', new Date());
                            const displayDate = format(date, 'dd-MM-yyyy');

                            return (
                                <Card key={newsItem.id} className="d-flex flex-column flex-lg-row mb-3">
                                    <Col xs={12} lg={4}>
                                        <Card.Img
                                            className="img-fluid w-100"
                                            src={`https://localhost/uploads/news/${newsItem.image}`}
                                            style={{ height: '100%', objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col className="d-flex flex-column">
                                        <Card.Body className="text-start">
                                            <Row className="d-flex justify-content-between align-items-center mb-2">
                                                <Card.Title className="w-75">{newsItem.subject}</Card.Title>
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
                            );
                        })
                    ) : (
                        <NewsNotFound
                            onReturn={clearSearch}
                        />
                    )}
                </CardGroup>

                {length > 5 && (
                    <Pagination
                        pages={Math.ceil(length / 5)}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                )}
            </Col>
        </Container>
    );
}
