const {validateSingleUserResponseBody, singleUserHeaderValidation, validateSingleUserStatusCode} = require("../utils/singleUser");

describe("Get single user API route test", () => {
    describe("Single user api body validation", () => {
        it("Should have the 200 status code", async () => {
            const getSingleUserStatusCode = await validateSingleUserStatusCode(200);
            expect(getSingleUserStatusCode).toBe(true);
        })
        test("Response body should have the valid firstname data", async () => {
            const firstNameResponseBody = await validateSingleUserResponseBody("firstname", process.env.FIRSTNAME);
            expect(firstNameResponseBody).toBe(true)
        })
        test("First response body should have the valid email data", async () => {
            const userEmailResponseBody = await validateSingleUserResponseBody("email", process.env.EMAIL);
            expect(userEmailResponseBody).toBe(true);
        })
        test("First response body should have the valid phone", async () => {
            const userPhoneResponseBody = await validateSingleUserResponseBody("phone", Number(process.env.PHONE));
            expect(userPhoneResponseBody).toBe(true)
        })
        test("First response body should have the valid id", async () => {
            const userIdResponseBody = await validateSingleUserResponseBody("_id", process.env.ID);
            expect(userIdResponseBody).toBe(true)
        })
        it("Should have the header content type as application/json", async () => {
            const contentTypeSingleUserHeader = await singleUserHeaderValidation("content-type", "application/json; charset=utf-8");
            expect(contentTypeSingleUserHeader).toBe(true);
        })
        it("Should have the connection header as close", async () => {
            const connectionSingleUserHeader = await singleUserHeaderValidation("connection", "close");
            expect(connectionSingleUserHeader).toBe(true)
        })
    })
})