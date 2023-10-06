const request = require("supertest");
require('dotenv').config();

const base_url = process.env.BASE_URL;

const getSinglePostStatuseCodeValidation = async (expected_statusCode) => {
    const response = await request(base_url).get(`/post/get/${process.env.POST_ID}`).set("Authorization", process.env.TOKEN);
    console.log("Status code is:-----", response.status);
    return response.statusCode == expected_statusCode;
}

module.exports = {getSinglePostStatuseCodeValidation}