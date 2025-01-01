import Card from 'react-bootstrap/Card';
import '../styles/style.css';
import React, { useEffect } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { createBrewery, deleteBrewery, getAdminBreweries, getBreweries, getCountries, getNews, updateBrewery } from '../services/Api';
import { parse, format } from 'date-fns';
import * as Icon from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Form, FormControl, Button, Dropdown, InputGroup } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import { useNavigate, Link } from 'react-router-dom';
import CustomToggle from '../components/CustomToggle';
import BreweryModal from '../components/BreweryModal';
import ConfirmModal from '../components/ConfirmModal';
import { Loading } from '../components/Loading';

export default function AdminBreweries() {
    const navigation = useNavigate();

    const [length, setLength] = React.useState(null);
    const [displayData, setDisplayData] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('reports');
    const [country, setCountry] = React.useState('0');
    const [displayCountry, setDisplayCountry] = React.useState('');
    const [countries, setCountries] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);
    const [showAddBreweryModal, setShowAddBreweryModal] = React.useState(false);
    const [showUpdateBreweryModal, setShowUpdateBreweryModal] = React.useState(false);
    const [selectedBrewery, setSelectedBrewery] = React.useState(null);

    const filters = {
        "reports": "By reports",
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
            const breweries = await getAdminBreweries(pageNumber, searchTerm, sortOrder, country);
            setLength(breweries["length"]);
            setDisplayData(breweries["data"]);

            const defaultOption = {
                "id": 0,
                "name": "All",
                "code": ""
            };

            setCountries([defaultOption, ...countries]);
        } catch {
            //
            navigation("/error", {});
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
            //
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
            //
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        fill(pageNumber);
    }

    const addBrewery = async (data) => {
        try {
            setShowAddBreweryModal(false);
            setSelectedBrewery(null);

            const brewery = {
                "title": data["title"],
                "description": data["description"],
                "url": data["url"],
                "yearFounded": data["yearFounded"],
                "countryId": data["countryId"]
            };

            const formData = new FormData();
            formData.append("breweryData", JSON.stringify(brewery));
            formData.append("imageFile", data["file"]);

            await createBrewery(formData);
            fill(page);
        } catch {
            //
        }
    }

    const passBreweryData = (brewery) => {
        const updatedBrewery = Object.assign({}, brewery);
        updatedBrewery.image = `https://localhost/uploads/breweries/${updatedBrewery.image}`
        setSelectedBrewery(updatedBrewery);
        setShowUpdateBreweryModal(true);
    }

    const updateBreweryData = async (data) => {
        const brewery = {
            "id": selectedBrewery.id,
            "title": data["title"],
            "description": data["description"],
            "url": data["url"],
            "yearFounded": data["yearFounded"],
            "countryId": data["countryId"]
        };

        setShowUpdateBreweryModal(false);
        setSelectedBrewery(null);

        const formData = new FormData();
        formData.append("breweryData", JSON.stringify(brewery));

        if (data["file"] !== null)
            formData.append("imageFile", data["file"]);

        await updateBrewery(formData);
        fill(page);
    };

    const removeBrewery = async () => {
        try {
            setShowConfirmModal(false);
            await deleteBrewery(selectedBrewery.id);

            if (displayData.length === 1) {
                const newPage = page !== 1 ? page - 1 : page;
                handlePageChange(newPage);
            }
            else {
                fill(page);
            }

        } catch {

        }
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
                <Col xs={12} md="auto" className="ms-auto">
                    <Button className="btn-success d-flex flex-column w-100" onClick={() => setShowAddBreweryModal(true)}>
                        Add Brewery
                    </Button>
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
                                            <Dropdown style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, appearance: 'none' }}>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
                                                    <Icon.ThreeDotsVertical className="ms-auto" size={24} color="white" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="1" onClick={() => passBreweryData(brewery)}>Edit</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2" onClick={() => { setSelectedBrewery(brewery); setShowConfirmModal(true) }}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
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
                                                {
                                                    brewery.numberOfReports > 0 &&
                                                    <div className="d-flex align-items-center mb-3">
                                                        <Icon.Flag size={24} color="red" title="Reported reviews" />
                                                        <span>&nbsp;<b>{brewery.numberOfReports}</b>&nbsp;Reported reviews</span>
                                                    </div>
                                                }
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

            <ConfirmModal
                show={showConfirmModal}
                message="Are you sure you want to delete news?"
                reviewId={selectedBrewery !== null && selectedBrewery.id}
                onConfirm={removeBrewery}
                onClose={() => setShowConfirmModal(false)}
            />
            <BreweryModal
                show={showAddBreweryModal}
                data={null}
                onConfirm={addBrewery}
                onClose={() => setShowAddBreweryModal(false)}
            />
            <BreweryModal
                show={showUpdateBreweryModal}
                data={selectedBrewery}
                onConfirm={updateBreweryData}
                onClose={() => setShowUpdateBreweryModal(false)}
            />

        </Container>
    );
}