import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../styles/style.css';
import * as Icon from 'react-bootstrap-icons';
import React, { useEffect, useReducer } from 'react';
import { Col, Row, Dropdown } from 'react-bootstrap';
import { getBeers, getFavorites, getRandomNewBeers, getTopBeers, getTopBreweries } from '../services/Api';
import { parse, format } from 'date-fns';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigation = useNavigate();

    const [favorites, setFavorites] = React.useState(null);
    const [topBreweries, setTopBreweries] = React.useState(null);
    const [topBeers, setTopBeers] = React.useState(null);
    const [newBeers, setNewBeers] = React.useState(null);

    useEffect(() => {
        getNewBeers();
        getMyFavorites();
        getBreweries();
        getBeers();
    }, [])

    const getMyFavorites = async () => {
        try {
            const favorites = await getFavorites();
            setFavorites(favorites);
        } catch {
            navigation("/error");
        }
    };

    const getBreweries = async () => {
        try {
            const breweries = await getTopBreweries();
            setTopBreweries(breweries);
        } catch {
            navigation("/error");
        }
    };

    const getBeers = async () => {
        try {
            const beers = await getTopBeers();
            setTopBeers(beers);
        } catch {
            navigation("/error");
        }
    };

    const getNewBeers = async () => {
        try {
            const beers = await getRandomNewBeers();
            setNewBeers(beers);
        } catch {
            navigation("/error");
        }
    };

    const calculateStars = (number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (number - i > 0.75)
                stars.push(<Icon.StarFill size={24} color='gold' />);
            else if (number - i > 0.25)
                stars.push(<Icon.StarHalf size={24} color='gold' />);
            else
                stars.push(<Icon.Star size={24} color='gold' />);
        }

        return <tbody>{stars}</tbody>;
    };

    if (topBreweries === null || topBeers === null || newBeers === null || favorites === null)
        return <Loading />;

    return (
        <Container className="d-flex flex-column my-5 justify-content-center" >
            <Row className="my-3">
                <div className="brewery-title-container">
                    <h1 className="brewery-title text-start">New beers</h1>
                </div>
                <Card className="overflow-hidden" style={{ width: '100%' }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div id="scroll-container" style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
                            {
                                newBeers.length > 0 ?
                                    newBeers.map((beer, index) => {
                                        return (
                                            <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                                <Card className="mb-4 shadow-sm" style={{ marginRight: 5, width: 380 }}>
                                                    <Card.Img
                                                        className="img-fluid rounded w-100"
                                                        src={`https://localhost/uploads/beers/${beer.image}`}
                                                        alt={beer.name}
                                                        style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '15px 0 0 15px' }}
                                                    />
                                                    <Col className="d-flex flex-column justify-content-between h-100">
                                                        <Card.Body className="text-start mt-0 mb-auto">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <Card.Title className="text-wrap">{beer.name}</Card.Title>
                                                            </div>
                                                            <Card.Text className="text-muted h-25">{beer.description}</Card.Text>
                                                            <div className="d-flex align-items-center mb-3">
                                                                {calculateStars(beer.grade)}
                                                                <span>&nbsp;<b>{beer.grade} / 5</b></span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <Icon.ChatLeftText size={24} color='#0d6efd' />
                                                                <span>&nbsp;<b>{beer.numberOfReviews}</b>&nbsp;Reviews</span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <b>{beer.isAvailable ? <span style={{ color: "green" }}>Available !</span> : <span color="red" style={{ color: "red" }}>Not Available !</span>}</b>
                                                            </div>
                                                        </Card.Body>
                                                        <Card.Footer className="text-start bg-white border-0 gap-1 mb-0" style={{ borderRadius: '0 0 15px 0' }}>
                                                            <div className="text-muted text-nowrap">Introduced in {beer.yearIntroduced}.</div>
                                                        </Card.Footer>
                                                    </Col>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                    :
                                    <div>
                                        <h3>New beers will be available soon...</h3>
                                    </div>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Row>

            <Row className="my-3">
                <div className="brewery-title-container">
                    <h1 className="brewery-title text-start">My favorites</h1>
                </div>
                <Card className="overflow-hidden" style={{ width: '100%' }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div id="scroll-container" style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
                            {
                                favorites.length > 0 ?
                                    favorites.map((beer, index) => {
                                        return (
                                            <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                                <Card className="mb-4 shadow-sm" style={{ marginRight: 5, width: 380 }}>
                                                    <Card.Img
                                                        className="img-fluid rounded w-100"
                                                        src={`https://localhost/uploads/beers/${beer.image}`}
                                                        alt={beer.name}
                                                        style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '15px 0 0 15px' }}
                                                    />
                                                    <Col className="d-flex flex-column justify-content-between h-100">
                                                        <Card.Body className="text-start mt-0 mb-auto">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <Card.Title className="text-wrap">{beer.name}</Card.Title>
                                                            </div>
                                                            <Card.Text className="text-muted h-25">{beer.description}</Card.Text>
                                                            <div className="d-flex align-items-center mb-3">
                                                                {calculateStars(beer.grade)}
                                                                <span>&nbsp;<b>{beer.grade} / 5</b></span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <Icon.ChatLeftText size={24} color='#0d6efd' />
                                                                <span>&nbsp;<b>{beer.numberOfReviews}</b>&nbsp;Reviews</span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <b>{beer.isAvailable ? <span style={{ color: "green" }}>Available !</span> : <span color="red" style={{ color: "red" }}>Not Available !</span>}</b>
                                                            </div>
                                                        </Card.Body>
                                                        <Card.Footer className="text-start bg-white border-0 gap-1 mb-0" style={{ borderRadius: '0 0 15px 0' }}>
                                                            <div className="text-muted text-nowrap">Introduced in {beer.yearIntroduced}.</div>
                                                        </Card.Footer>
                                                    </Col>
                                                </Card>
                                            </Col>

                                        );
                                    })
                                    :
                                    <div>
                                        <h3>No favorites selected</h3>
                                    </div>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Row>

            <Row className="my-3">
                <div className="brewery-title-container">
                    <h1 className="brewery-title text-start">Top 10 breweries</h1>
                </div>
                <Card className="overflow-hidden" style={{ width: '100%' }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div id="scroll-container" style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
                            {
                                topBreweries.map((brewery, index) => {
                                    const date = parse(brewery.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());
                                    var isNew = (new Date() - date) / (1000 * 60 * 60 * 24) <= 7;

                                    return (
                                        <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                            <Card className={isNew ? "mb-4 shadow-sm border-2 border-primary" : "mb-4 shadow-sm"} style={{ marginRight: 5, width: 380 }}>
                                                <Col>
                                                    <Card.Img
                                                        className="img-fluid rounded w-100"
                                                        src={`https://localhost/uploads/breweries/${brewery.image}`}
                                                        alt={brewery.name}
                                                        style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '15px 0 0 15px' }}
                                                    />
                                                </Col>
                                                <Col className="d-flex flex-column justify-content-between">
                                                    <Card.Body className="text-start">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <Card.Title className="text-wrap">{brewery.name}</Card.Title>
                                                            {isNew && <b className="bg-primary text-white border border-primary rounded-pill p-1 text-center" style={{ maxHeight: 34 }}>New !</b>}
                                                        </div>
                                                        <Card.Text className="text-muted">{brewery.description}</Card.Text>
                                                        <div className="d-flex align-items-center mb-3">
                                                            {calculateStars(brewery.grade)}
                                                            <span>&nbsp;<b>{brewery.grade} / 5</b></span>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <Icon.ChatLeftText size={24} color='#0d6efd' />
                                                            <span>&nbsp;<b>{brewery.numberOfReviews}</b>&nbsp;Reviews</span>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <span>Available <b>{brewery.availableBeers}</b> products !</span>
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer className="d-flex justify-content-between align-items-center bg-white border-0 gap-1" style={{ borderRadius: '0 0 15px 0' }}>
                                                        <div className="text-muted text-nowrap">Founded in {brewery.yearFounded}.</div>
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <a target="_blank" href={`./breweries/${brewery.id}`} rel="noopener noreferrer" className="btn btn-success btn-sm" >
                                                                Open
                                                            </a>
                                                            <a href={brewery.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                                                Official Website
                                                            </a>
                                                        </div>
                                                    </Card.Footer>
                                                </Col>
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Row>

            <Row className="my-3">
                <div className="brewery-title-container">
                    <h1 className="brewery-title text-start">Top 10 beers</h1>
                </div>
                <Card className="overflow-hidden" style={{ width: '100%' }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div id="scroll-container" style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
                            {
                                topBeers.map((beer, index) => {
                                    return (
                                        <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                            <Card className="mb-4 shadow-sm" style={{ marginRight: 5, width: 380 }}>
                                                <Card.Img
                                                    className="img-fluid rounded w-100"
                                                    src={`https://localhost/uploads/beers/${beer.image}`}
                                                    alt={beer.name}
                                                    style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '15px 0 0 15px' }}
                                                />
                                                <Col className="d-flex flex-column justify-content-between h-100">
                                                    <Card.Body className="text-start mt-0 mb-auto">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <Card.Title className="text-wrap">{beer.name}</Card.Title>
                                                        </div>
                                                        <Card.Text className="text-muted h-25">{beer.description}</Card.Text>
                                                        <div className="d-flex align-items-center mb-3">
                                                            {calculateStars(beer.grade)}
                                                            <span>&nbsp;<b>{beer.grade} / 5</b></span>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <Icon.ChatLeftText size={24} color='#0d6efd' />
                                                            <span>&nbsp;<b>{beer.numberOfReviews}</b>&nbsp;Reviews</span>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <b>{beer.isAvailable ? <span style={{ color: "green" }}>Available !</span> : <span color="red" style={{ color: "red" }}>Not Available !</span>}</b>
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer className="text-start bg-white border-0 gap-1 mb-0" style={{ borderRadius: '0 0 15px 0' }}>
                                                        <div className="text-muted text-nowrap">Introduced in {beer.yearIntroduced}.</div>
                                                    </Card.Footer>
                                                </Col>
                                            </Card>
                                        </Col>

                                    );
                                })
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}