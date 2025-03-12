import Card from 'react-bootstrap/Card';
import '../styles/style.css';
import React, { useEffect } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { addFavorite, getBeerCategories, getBeers, getBeerShades, getBrewery, removeFavorite } from '../services/Api';
import { parse, format } from 'date-fns';
import * as Icon from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import CommentsModal from '../components/CommentsModal';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';

export default function Beers() {
    const { id } = useParams();
    const navigation = useNavigate();

    const [brewery, setBrewery] = React.useState(null);
    const [length, setLength] = React.useState(null);
    const [displayData, setDisplayData] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('favorites');
    const [category, setCategory] = React.useState('0');
    const [displayCategories, setDisplayCategories] = React.useState(null);
    const [displayCategory, setDisplayCategory] = React.useState('');
    const [shade, setShade] = React.useState('0');
    const [displayShades, setDisplayShades] = React.useState(null);
    const [displayShade, setDisplayShade] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [showComments, setShowComments] = React.useState(false);
    const [selectedBeer, setSelectedBeer] = React.useState(null);

    const filters = {
        "favorites": "Favorites first",
        "newest": "Newest first",
        "alphabetically": "A - Z",
        "rating": "By rating",
        "reviews": "By reviews"
    };

    useEffect(() => {
        getBreweryInfo();
    }, []);

    useEffect(() => {
        setPage(1);
        fill(1);
    }, [category, shade, sortOrder]);

    useEffect(() => {
        if (displayCategories !== null) {
            const selectedCategory = displayCategories.find(c => c.id == category);
            setDisplayCategory(selectedCategory.name);
        }
    }, [category, displayCategories]);

    useEffect(() => {
        if (displayShades !== null) {
            const selectedShade = displayShades.find(s => s.id == shade);
            setDisplayShade(selectedShade.shade);
        }
    }, [shade, displayShades]);

    const getBreweryInfo = async () => {
        try {
            const brewery = await getBrewery(id);
            setBrewery(brewery);
        } catch {
            navigation("/error");
        }
    };

    const fill = async (pageNumber) => {
        const categories = await getBeerCategories();;
        const shades = await getBeerShades();
        const beers = await getBeers(id, pageNumber, searchTerm, sortOrder, category, shade);
        setLength(beers["length"]);
        setDisplayData(beers["data"]);

        const defaultCategoryOption = {
            "id": 0,
            "name": "All",
        };

        const defaultShadeOption = {
            "id": 0,
            "shade": "All",
        };

        setDisplayCategories([defaultCategoryOption, ...categories]);
        setDisplayShades([defaultShadeOption, ...shades]);
    };

    const sortData = (data) => {
        if (data !== null) {
            let sortedData = [...data];
            sortedData.sort((b1, b2) => {
                if (b1.IsFavorite != b2.IsFavorite)
                    return b2.IsFavorite - b1.IsFavorite

                return b2.YearIntroduced - b1.YearIntroduced;
            });

            setDisplayData(sortedData);
        }
    }

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
            const beers = await getBeers(id, 1, searchTerm, sortOrder, category, shade);
            setPage(1);
            setLength(beers["length"]);
            setDisplayData(beers["data"]);
        } catch {
            navigation("/error");
        }
    };

    const clearSearch = async () => {
        try {
            const beers = await getBeers(id, 1, '', sortOrder, category, shade);
            setSearchTerm('');
            setPage(1);
            setLength(beers["length"]);
            setDisplayData(beers["data"]);
        } catch {
            navigation("/error");
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        fill(pageNumber);
    }

    const markAsFavorite = async (beerId) => {
        try {
            await addFavorite(beerId);
            const newData = displayData.map(b =>
                b.id === beerId
                    ? { ...b, isFavorite: true }
                    : b
            );

            sortData(newData);
        } catch {
            navigation("/error");
        }
    }

    const unmarkFavorite = async (beerId) => {
        try {
            await removeFavorite(beerId);
            const newData = displayData.map(b =>
                b.id === beerId
                    ? { ...b, isFavorite: false }
                    : b
            );

            sortData(newData);
        } catch {
            navigation("/error");
        }
    }

    if (displayData === null || brewery === null || displayCategories === null || displayShades === null)
        return;

    return (
        <Container className="d-flex flex-column justify-content-center">
            <div className="brewery-title-container">
                <h1 className="brewery-title text-center">{brewery.name}</h1>
            </div>
            <div className="d-flex flex-wrap flex-column flex-md-row justify-content-between align-items-start gap-3 my-5">
                <Col xs={12} md="auto" className="d-flex align-items-start">
                    <Form className="d-flex flex-column flex-md-row gap-2 w-100" onSubmit={handleSearch}>
                        <InputGroup className="position-relative w-100">
                            <FormControl
                                type="text"
                                placeholder="Search beer..."
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
                        <Button className="btn-success mt-2 mt-md-0 w-100 w-md-auto" onClick={handleSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>

                <div className="d-flex flex-wrap flex-md-nowrap gap-3 w-md-auto">
                    <Col xs={12} md="auto">
                        <Dropdown onSelect={e => setSortOrder(e)} className="w-100">
                            <Dropdown.Toggle className="btn-primary text-start w-100" id="dropdown-basic">
                                Filter: {filters[sortOrder]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.entries(filters).map(([key, value]) => (
                                    <Dropdown.Item key={key} eventKey={key}>
                                        {value}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={12} md="auto">
                        <Dropdown onSelect={e => setCategory(e)} className="w-100">
                            <Dropdown.Toggle className="btn-primary text-start w-100" id="dropdown-basic">
                                Category: {displayCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {displayCategories.map(category => (
                                    <Dropdown.Item key={category.id} eventKey={category.id}>
                                        {category.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={12} md="auto">
                        <Dropdown onSelect={e => setShade(e)} className="w-100">
                            <Dropdown.Toggle className="btn-primary text-start w-100" id="dropdown-basic">
                                Shade: {displayShade}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {displayShades.map(shade => (
                                    <Dropdown.Item key={shade.id} eventKey={shade.id}>
                                        {shade.shade}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </div>
            </div>


            <Row className="w-100 justify-content-center">
                {
                    displayData.length > 0 ?
                        displayData.map((beer, index) => {

                            return (
                                <Col xs={12} md={8} lg={4} className="d-flex justify-content-center" key={index}>
                                    <Card className={beer.isFavorite ? "mb-4 shadow-sm border-2 border-danger" : "mb-4 shadow-sm"} style={{ marginRight: 5, width: 380 }}>
                                        {beer.isFavorite && <Icon.Star size={24} color='gold' className="mt-1 me-1" style={{ position: 'absolute', alignSelf: 'end' }} />}
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
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="button" id="dropdown-basic" style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
                                                            <Icon.MenuApp size={24} />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="1" onClick={() => { setShowComments(true); setSelectedBeer(beer) }}>Comments</Dropdown.Item>
                                                            {
                                                                beer.isFavorite ?
                                                                    <Dropdown.Item eventKey="2" onClick={() => unmarkFavorite(beer.id)}>Remove from favorites</Dropdown.Item> :
                                                                    <Dropdown.Item eventKey="2" onClick={() => markAsFavorite(beer.id)}>Mark as favorite</Dropdown.Item>
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <p>
                                                    <small style={{ color: "grey" }}>{displayShades[beer.shadeId].shade}</small>
                                                    <small className="ms-3" style={{ color: "grey" }}>{beer.alcoholPercentage + "% ALC"}</small>
                                                </p>                                                <Card.Text className="text-muted h-25">{beer.description}</Card.Text>
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
                            <h1 style={{ color: "white" }}>Oops, there is no beers found. Sorry.</h1>
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

            <CommentsModal
                show={showComments}
                data={selectedBeer}
                onShow={() => setShowComments(true)}
                onClose={() => { setShowComments(false); setSelectedBeer(null) }}
                onHide={() => setShowComments(false)}
            />
        </Container>
    );
}