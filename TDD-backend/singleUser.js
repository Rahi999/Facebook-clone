const request = require("supertest");

const base_url = "http://localhost:8080";

const validateSingleUserResponseBody = async (key, value) => {
    const response = await request(base_url).get("/users/secure/getDemoDatas");
    const responseBody = response.body[0];
    return responseBody[key] === value
}

module.exports = {validateSingleUserResponseBody}