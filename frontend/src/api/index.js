const axios = require("axios");
const BASE_URL='http://localhost:3001/api'


/**
 * make a HTTP request to the backend
 * @param {string} method - HTTP method used for request
 * @param {string} url - Endpoint for request
 * @param {object} body - Body of request
 * @returns {object} data
 */
async function apiCall(method, url, body) {
    return new Promise((resolve, reject) => {
        return axios[method](BASE_URL + path, body)
        .then(response => {
            return resolve(response.data)
        })
        .catch(err => {
            return reject(err.response.data.error)
        });
    });
}

async function createUser() {
    try {
        params = {
            signupCode: "1234",
            email: "calum@google.com",
            password: "test"
        }
        let user = await apiCall("post", "/users/login", params)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}
createUser()

module.exports = request