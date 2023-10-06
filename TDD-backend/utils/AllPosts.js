require('dotenv').config();
const request = require("supertest");

const base_url = process.env.BASE_URL;

const validateResponseCode = async (statusCode) => {
    const response = await request(base_url).get("/post/get").set("Authorization", process.env.TOKEN);
    return response.statusCode === statusCode;
}

const validateAllPostsHeader = async (headerName, headerValue) => {
    const response = await request(base_url).get("/post/get").set("Authorization", process.env.TOKEN);
    return response.headers[headerName] === headerValue;
}

module.exports = {validateResponseCode, validateAllPostsHeader}