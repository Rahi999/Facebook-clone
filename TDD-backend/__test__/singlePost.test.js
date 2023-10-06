const {getSinglePostStatuseCodeValidation} = require("../utils/singlePost");

describe("post API validation", () => {
    describe("Get a single post API validation", () => {
        test("It should have the statusCode as 200", async () => {
            const singlePostApiStatusCode =  await getSinglePostStatuseCodeValidation(200);
            expect(singlePostApiStatusCode).toBe(true);
        })
    })
})