import request from "supertest";
import { app } from "../../app";
import { resizeRequestPayload } from "../test-helpers/test-payload";
import fs from "fs";

describe("Images Blur Route", () => {
  afterAll(() => {
    fs.rmSync("images", { recursive: true, force: true });
  });

  it("It should send a 200 status code with a json payload with a proper request", async () => {
    const testObject = resizeRequestPayload;
  
    const res = await request(app)
                     .post("/v1/image/blur")
                     .send(testObject);

    const receivedObject = JSON.parse(res.text);

    expect(res.statusCode).toEqual(200);
    expect(receivedObject).toBeDefined();
  });

  it("It should send a 400 status code when the base64 string isn\"t properly formatted", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.base64String = "dat:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/blur")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 415 status code when the wrong data type is used", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.base64String = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/blur")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(415);
  });

  it("It should send a 400 status code when missing base64String", async () => {
    const testObject = resizeRequestPayload;
  
    delete testObject.base64String;    

    const res = await request(app)
                     .post("/v1/image/blur")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 405 status code when using a HTTP GET", async () => {
    const res = await request(app).get("/v1/image/blur");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PUT", async () => {
    const res = await request(app).put("/v1/image/blur");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PATCH", async () => {
    const res = await request(app).patch("/image/blur");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP DELETE", async () => {
    const res = await request(app).delete("/image/blur");

    expect(res.statusCode).toEqual(405);
  });
});