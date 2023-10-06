require('dotenv').config();
const request = require("supertest");

const base_url = process.env.BASE_URL;

const validateSingleUserStatusCode = async (statusCode) => {
    const response = await request(base_url).get("/users/secure/getDemoDatas");
    return response.statusCode === statusCode;
}

const validateSingleUserResponseBody = async (key, value) => {
    const response = await request(base_url).get("/users/secure/getDemoDatas");
    const responseBody = response.body[0];
    return responseBody[key] === value
}

const singleUserHeaderValidation = async (headerName, headerValue) => {
    const response = await request(base_url).get("/users/secure/getDemoDatas");
    return response.headers[headerName] === headerValue;
}

module.exports = {validateSingleUserResponseBody, singleUserHeaderValidation, validateSingleUserStatusCode}