import request from "supertest";
import { app } from "../../../app";
import { resizeRequestPayload } from "../../test-helpers/test-payload";
import fs from "fs";

describe("Images Resize Route", () => {
  afterAll(() => {
    fs.rmSync("images", { recursive: true, force: true });
  });

  it("It should send a 200 status code with a json payload with a proper request", async () => {
    const testObject = resizeRequestPayload;
  
    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);

    const receivedObject = JSON.parse(res.text);

    expect(res.statusCode).toEqual(200);
    expect(receivedObject).toBeDefined();
  });

  it("It should send a 400 status code when the base64 string isn\"t properly formatted", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.base64String = "dat:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 415 status code when the wrong data type is used", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.base64String = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(415);
  });

  it("It should send a 400 status code when percentageScale is bigger than 99", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.percentageScale = 100;

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });



  it("It should send a 400 status code when percentageScale is smaller than 1", async () => {
    const testObject = resizeRequestPayload;
  
    testObject.percentageScale = 0;

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when missing percentageScale", async () => {
    const testObject = resizeRequestPayload;
  
    delete testObject.percentageScale;

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when missing base64String", async () => {
    const testObject = resizeRequestPayload;
  
    delete testObject.base64String;    

    const res = await request(app)
                     .post("/v1/image/resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 405 status code when using a HTTP GET", async () => {
    const res = await request(app).get("/v1/image/resize");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PUT", async () => {
    const res = await request(app).put("/image/resize");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PATCH", async () => {
    const res = await request(app).patch("/image/resize");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP DELETE", async () => {
    const res = await request(app).delete("/image/resize");

    expect(res.statusCode).toEqual(405);
  });
});