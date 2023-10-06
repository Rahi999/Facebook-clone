const {validateSingleUserResponseBody} = require("../utils/singleUser");

describe("Get single user API route test", () => {
    describe("Single user api body validation", () => {
        test("Response body should be the same", async () => {
            const firstNameResponseBody = await validateSingleUserResponseBody("firstname", "Rahi");
            expect(firstNameResponseBody).toBe(true)
        })
    })
})