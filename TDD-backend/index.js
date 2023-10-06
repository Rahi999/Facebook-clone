// import supertest from "supertest";

const base_url = "http://localhost:8080/";
const sum = (a, b) => {
    return a + b;
}

const getHomeRouteStatus = () => {
    return fetch(base_url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.status;
        })
        .catch((err) => {
            return err;
        });
};


module.exports = { sum, getHomeRouteStatus }