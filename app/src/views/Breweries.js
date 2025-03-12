import Card from 'react-bootstrap/Card';
import '../styles/style.css';
import React, { useEffect } from 'react';
import { getBreweries, getCountries } from '../services/Api';
import { parse } from 'date-fns';
import * as Icon from 'react-bootstrap-icons';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, InputGroup } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';

export default function Breweries() {
    const navigation = useNavigate();

    const [length, setLength] = React.useState(null);
    const [displayData, setDisplayData] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('newest');
    const [countries, setCountries] = React.useState(null);
    const [country, setCountry] = React.useState('0');
    const [displayCountry, setDisplayCountry] = React.useState('');
    const [page, setPage] = React.useState(1);

    const filters = {
        "newest": "Newest first",
        "alphabetically": "A - Z",
        "rating": "By rating",
        "reviews": "By reviews"
    };

    useEffect(() => {
        setPage(1);
        fill(1);
    }, [country, sortOrder]);

    useEffect(() => {
        if (countries !== null) {
            const selectedCountry = countries.find(c => c.id == country);
            setDisplayCountry(selectedCountry.name);
        }
    }, [country, countries]);

    const fill = async (pageNumber) => {
        try {
            const countries = await getCountries();
            const breweries = await getBreweries(pageNumber, searchTerm, sortOrder, country);
            setLength(breweries["length"]);
            setDisplayData(breweries["data"]);

            const defaultOption = {
                "id": 0,
                "name": "All",
                "code": ""
            };

            setCountries([defaultOption, ...countries]);
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

    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            const breweries = await getBreweries(1, searchTerm, sortOrder, country);
            setPage(1);
            setLength(breweries["length"]);
            setDisplayData(breweries["data"]);
        } catch {
            navigation("/error");
        }
    };

    const clearSearch = async () => {
        try {
            const breweries = await getBreweries(1, '', sortOrder, country);
            setSearchTerm('');
            setPage(1);
            setLength(breweries["length"]);
            setDisplayData(breweries["data"]);
        } catch {
            navigation("/error");
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        fill(pageNumber);
    }

    if (displayData === null || countries === null)
        return <Loading />;

    return (
        <Container className="d-flex flex-column">
            <div className="d-flex flex-column flex-md-row justify-content-start my-5 gap-3">
                <Col xs={12} md="auto">
                    <Form inline className="d-flex flex-column flex-md-row gap-2" onSubmit={handleSearch}>
                        <InputGroup className="position-relative w-100">
                            <FormControl
                                type="text"
                                placeholder="Search brewery..."
                                className="mr-sm-2"
                                style={{ width: "100%", borderRadius: "0.375rem", paddingRight: "2.5rem" }}
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
                        <Button className="btn-success mt-2 mt-md-0" onClick={handleSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md="auto">
                    <Dropdown onSelect={e => setSortOrder(e)} className="d-flex flex-column">
                        <Dropdown.Toggle className="btn-primary text-start" id="dropdown-basic">
                            Filter: {filters[sortOrder]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Object.entries(filters).map(([key, value]) => {
                                    return <Dropdown.Item eventKey={key}>{value}</Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={12} md="auto">
                    <Dropdown onSelect={e => setCountry(e)} className="d-flex flex-column">
                        <Dropdown.Toggle className="btn-primary text-start" id="dropdown-basic">
                            Country: {displayCountry}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                countries.map(country => {
                                    return <Dropdown.Item eventKey={country.id}>{country.name}</Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </div>


            <Row className="d-flex justify-content-center">
                {
                    displayData.length > 0 ?
                        displayData.map((brewery, index) => {
                            const date = parse(brewery.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());
                            var isNew = (new Date() - date) / (1000 * 60 * 60 * 24) <= 7;

                            return (
                                <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                    <Card className={isNew ? "mb-4 shadow-sm border-2 border-primary" : "mb-4 shadow-sm"} style={{ marginRight: 5, width: 380 }}>
                                        <Col style={{ position: 'relative', maxHeight: 200 }}>
                                            <Card.Img
                                                className="img-fluid rounded w-100"
                                                src={`https://localhost/uploads/breweries/${brewery.image}`}
                                                alt={brewery.name}
                                                style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '15px 0 0 15px' }}
                                            />
                                        </Col>
                                        <Col className="d-flex flex-column justify-content-between h-100">
                                            <Card.Body className="text-start mt-0 mb-auto">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <Card.Title className="text-wrap">{brewery.name}</Card.Title>
                                                    {isNew && <b className="bg-primary text-white border border-primary rounded-pill p-1 text-center" style={{ maxHeight: 34 }}>New !</b>}
                                                </div>
                                                <Card.Text className="text-muted h-25">{brewery.description}</Card.Text>
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
                                                        Website
                                                    </a>
                                                </div>
                                            </Card.Footer>
                                        </Col>
                                    </Card>
                                </Col>
                            );
                        })
                        :
                        <div>
                            <h1 style={{ color: "white" }}>Oops, there is no breweries found. Sorry.</h1>
                        </div>
                }
            </Row>
            {
                length > 12 &&
                <Pagination
                    pages={Math.ceil(length / 12)}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />
            }

        </Container>
    );
}