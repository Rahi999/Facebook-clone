const {validateSingleUserResponseBody} = require("../utils/singleUser");

describe("Get single user API route test", () => {
    describe("Single user api body validation", () => {
        test("Response body should have the valid firstname data", async () => {
            const firstNameResponseBody = await validateSingleUserResponseBody("firstname", "Rahi");
            expect(firstNameResponseBody).toBe(true)
        })
        test("First response body should have the valid email data", async () => {
            const userEmailResponseBody = await validateSingleUserResponseBody("email", "ahilh871@gmail.com");
            expect(userEmailResponseBody).toBe(true);
        })
        test("First response body should have the valid phone", async () => {
            const userPhoneResponseBody = await validateSingleUserResponseBody("phone", 8084216452);
            expect(userPhoneResponseBody).toBe(true)
        })
        test("First response body should have the valid id", async () => {
            const userIdResponseBody = await validateSingleUserResponseBody("_id", "64a3f8ea9e295db4a9bb5aec");
            expect(userIdResponseBody).toBe(true)
        })
    })
})