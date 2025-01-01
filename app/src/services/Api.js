const BASE_URL = 'https://localhost:443/api';

const buildQueryParams = (params) =>
    new URLSearchParams(params).toString();

export const isAuthenticated = async () => {
    try {

        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/users/isValid?token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok)
            return await response.json();
        else
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const login = async (credenentials) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenentials)
        });

        if (response.ok || response.status === 403 || response.status === 404) {

            const token = response.ok ? await response.json() : "";
            const data = {
                "status": response.status,
                "token": token["token"]
            };

            return data;
        }
        else
            throw new Error(`HTTP status code: ${response.status}`);
    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const sendEmailVerificationToken = async (email) => {
    try {
        const data = {
            email: email
        };

        const response = await fetch(`${BASE_URL}/users/verify-email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const userExistsByUsername = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/existsByUsername?username=${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.text();
            return result == 'true';
        }
        else {
            throw new Error(`HTTP status code: ${response.status}`);
        }
    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const userExistsByEmail = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/users/existsByEmail?email=${email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userExists = await response.text();
            return userExists == 'true';
        }
        else {
            throw new Error(`HTTP status code: ${response.status}`);
        }
    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getUserByEmail = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/users/user?email=${email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok)
            return await response.json();
        else
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const register = async (user) => {
    try {
        const responseData = {
            id: "",
            email: "",
            reCaptcha: ""
        };

        const response = await fetch(`${BASE_URL}/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            responseData["id"] = data.id;
            responseData["email"] = data.email;
            return responseData;
        }
        else if (response.status == '400') {
            const data = await response.json();
            if (data.error === "reCAPTCHA validation failed")
                responseData["reCaptcha"] = data.message;
            else
                throw new Error(`HTTP status code: ${response.status}`);
        }
        else {
            throw new Error(`HTTP status code: ${response.status}`);
        }
    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
};

export const completeRegistration = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/verify-email/${token}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const sendChangeEmailToken = async (email) => {
    try {
        const data = {
            email: email
        };

        const response = await fetch(`${BASE_URL}/users/verify-email-change`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const sendAccountDeleteToken = async () => {
    try {

        const response = await fetch(`${BASE_URL}/users/verify-account-delete`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const changeEmail = async (token) => {
    try {
        const data = {
            token: token
        };

        const response = await fetch(`${BASE_URL}/users/email-change`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const sendResetPswdToken = async (email) => {
    try {
        const data = {
            email: email
        };

        const response = await fetch(`${BASE_URL}/users/verify-pswd-reset`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const resetPassword = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/users/pswd-reset`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const deleteAccount = async (token) => {
    try {

        const data = {
            token: token
        };

        const response = await fetch(`${BASE_URL}/users/delete-account`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const uploadProfileImage = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/users/upload-image`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const createNews = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/news`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const updateNews = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/news`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const removeProfileImage = async () => {
    try {
        await fetch(`${BASE_URL}/users/remove-image`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        });

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getNews = async (pageNumber, searchTerm) => {
    try {

        const response = await fetch(`${BASE_URL}/func/news?page=${pageNumber}&search=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        const data = {
            length: response.headers.get("Data-Counter"),
            data: await response.json()
        }

        return data;

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const deleteNews = async (newsId) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/news/${newsId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const createBrewery = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const updateBrewery = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const deleteBrewery = async (breweryId) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries/${breweryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/countries`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getBrewery = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/func/breweries/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getBreweries = async (page, search, filter, country) => {
    try {
        const response = await fetch(`${BASE_URL}/func/breweries?page=${page}&search=${search}&filter=${filter}&country=${country}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        const data = {
            length: response.headers.get("Data-Counter"),
            data: await response.json()
        }

        return data;

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getAdminBreweries = async (page, search, filter, country) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/breweries?page=${page}&search=${search}&filter=${filter}&country=${country}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        const data = {
            length: response.headers.get("Data-Counter"),
            data: await response.json()
        }

        return data;

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getTopBreweries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/breweries/top`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getBeerCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/beer-categories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getBeerShades = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/beer-shades`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const createBeer = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries/beers`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getBeers = async (breweryId, page, search, filter, category, shade) => {
    try {
        const params = {
            breweryId,
            page,
            search,
            filter,
            category,
            shade
        };

        const response = await fetch(`${BASE_URL}/func/beers?${buildQueryParams(params)}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        const data = {
            length: response.headers.get("Data-Counter"),
            data: await response.json()
        }

        return data;

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getAdminBeers = async (breweryId, page, search, filter, category, shade) => {
    try {
        const params = {
            breweryId,
            page,
            search,
            filter,
            category,
            shade
        };

        const response = await fetch(`${BASE_URL}/admin/beers?${buildQueryParams(params)}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        const data = {
            length: response.headers.get("Data-Counter"),
            data: await response.json()
        }

        return data;

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getTopBeers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/breweries/beers/top`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getRandomNewBeers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/breweries/beers/new`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const updateBeer = async (data) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries/beers`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: data
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const deleteBeer = async (beerId) => {
    try {

        const response = await fetch(`${BASE_URL}/admin/breweries/beers/${beerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getFavorites = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/favorites`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const addFavorite = async (beerId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/favorite?id=${beerId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const removeFavorite = async (beerId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/favorite?id=${beerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getRestrictionCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/admin/restriction-categories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getReportCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/report-categories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getReviews = async (beerId, filter) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews?id=${beerId}&filter=${filter}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const getAdminReviews = async (beerId, filter) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/reviews?id=${beerId}&filter=${filter}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}


export const countReviews = async () => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/count`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        await log(exception);
        throw new Error(exception);
    }
}

export const createQuery = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/users/query`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok || response.status === 429) {
            const data = {
                "status": response.status,
                "query": await response.json()
            };

            return data;
        }
        else {
            throw new Error(`HTTP status code: ${response.status}`);
        }

    } catch (exception) {
        //
        alert(exception);
        await log(exception);
        throw new Error(exception);
    }
}

export const createReviewLike = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${reviewId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const removeReviewLike = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${reviewId}/like`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const createReviewDislike = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${reviewId}/dislike`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const removeReviewDislike = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${reviewId}/dislike`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const createReviewReport = async (report) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${report["reviewId"]}/report`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}


export const createReview = async (review) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const updateReview = async (review) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const adminUpdateReview = async (review) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/reviews`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/func/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const deleteUsersReview = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const createRestriction = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/restrictions`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

        return await response.json();

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const activateUserAccount = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/unlock-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok)
            throw new Error(`HTTP status code: ${response.status}`);

    } catch (exception) {
        //
        alert(exception);
        await log({ "Error": exception.toString() });
        throw new Error(exception);
    }
}

export const log = async (data) => {
    try {
        alert(data.toString());
        const response = await fetch(`${BASE_URL}/users/log-error`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok)
            return await response.text();
    } catch (exception) {
        console.log("Unable to log error");
    }
}