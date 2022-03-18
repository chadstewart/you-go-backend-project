import request from "supertest";
import { app, secureServer as server } from "../../app";
import requestPayload from "../test_utils/test-payload";

describe("Index Route", () => {
  afterEach(done => {
    server.close();
    done();
  });

  it("It should get a 200 status code and get the message \'Server is live!\'", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Server is live!");
  });
});