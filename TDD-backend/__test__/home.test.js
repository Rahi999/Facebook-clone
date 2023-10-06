const {getHomeRouteStatus, validateHomerouteHeaders} = require("../controllers/home")

describe("Test home route API", () => {
    describe("get / route", () => {
        test("It Should return 200 status code", async () => {
            const statusCode = await getHomeRouteStatus();
            expect(statusCode).toBe(200);
        });
        test("It should have the header content type as json", async () => {
            const contentTypeHeader = await validateHomerouteHeaders("content-type", "text/html; charset=utf-8");
            expect(contentTypeHeader).toBe(true)
        });
        test("It should have the content length as 24", async () => {
            const contentTypeHeader = await validateHomerouteHeaders("content-length", "24");
            expect(contentTypeHeader).toBe(true)
        });
        test("It should have the x-powred-by header as Express", async () => {
            const xPoweredByHeader = await validateHomerouteHeaders("x-powered-by", "Express");
            expect (xPoweredByHeader).toBe(true);
        })
    });
})
