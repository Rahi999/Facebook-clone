const {validateResponseCode, validateAllPostsHeader} = require("../utils/AllPosts");

describe("Get all posts API validation", () => {
    describe("All posts related api validation", () => {
        test("it Should have the status code as 200", async () => {
            const getAllPostsStatusCode = await validateResponseCode(200);
            expect(getAllPostsStatusCode).toBe(true);
        })
        test("It should have the header content-type as application/json", async () => {
            const getAllPostsContentTypeHeader = await validateAllPostsHeader("content-type", "application/json; charset=utf-8");
            expect(getAllPostsContentTypeHeader).toBe(true);
        });
        test("It should have the header a-powered-by as Express", async () => {
            const getAllPostsXpoweredByHeader = await validateAllPostsHeader("x-powered-by", "Express");
            expect(getAllPostsXpoweredByHeader).toBe(true);
        });
        test("It should have the header connection as close", async () => {
            const getAllPostsConnectionHeaderValidation = await validateAllPostsHeader("connection", "close");
            expect(getAllPostsConnectionHeaderValidation).toBe(true);
        });
        test("It should have the correct value for etag header", async () => {
            const getAllPostsEtagHeaderValidation = await validateAllPostsHeader("etag", 'W/"988-fqZfZz+zOEeaMz1rrhdGI9YQIBs"');
            expect(getAllPostsEtagHeaderValidation).toBe(true);
        });
    })
})