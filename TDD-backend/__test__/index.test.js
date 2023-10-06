const supertest = require("supertest")
const {sum, getHomeRouteStatus} = require("../index")

test("1 and 2 should be 3", () => {
    expect(sum(1, 2)).toBe(3)
})

describe("Home route", () => {
    describe("get / route", () => {
        it("Should return 200 status code", async () => {
            const status = await getHomeRouteStatus();
            expect(status).toBe(200);
        })
    })
})
