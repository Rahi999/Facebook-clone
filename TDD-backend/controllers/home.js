const request = require("supertest")

const base_url = "http://localhost:8080";

const getHomeRouteStatus = async () => {
    const response = await request(base_url).get("/");
    return response.statusCode;
};

const validateHomerouteHeaders = async (headerName, headerValue) => {
    const response = await request(base_url).get("/");
    return response.headers[headerName] === headerValue
}

module.exports = { getHomeRouteStatus, validateHomerouteHeaders }