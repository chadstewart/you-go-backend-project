import request from "supertest";
import { app } from "../../app";
import { transformationRequestPayload } from "../test-helpers/test-payload";
import fs from "fs";

describe("Images Transformation Route", () => {
  afterAll(() => {
    fs.rmSync("images", { recursive: true, force: true });
  });

  it("It should send a 200 status code with a json payload with a proper request", async () => {
    const testObject = transformationRequestPayload;
  
    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    const receivedObject = JSON.parse(res.text);

    expect(res.statusCode).toEqual(200);
    expect(receivedObject).toBeDefined();
  });

  it("It should send a 400 status code when the base64 string isn\"t properly formatted", async () => {
    const testObject = transformationRequestPayload;
  
    testObject.base64String = "dat:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 415 status code when the wrong data type is used", async () => {
    const testObject = transformationRequestPayload;
  
    testObject.base64String = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);
                     
    expect(res.statusCode).toEqual(415);
  });

  it("It should send a 400 status code when resizeScale in the transforamtionSpecs object is bigger than 99", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.resizeScale = 100;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when resizeScale in the transforamtionSpecs object is smaller than 1", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.resizeScale = 0;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when rotation in the transforamtionSpecs object is bigger than 359", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.rotation = 360;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when rotation in the transforamtionSpecs object is smaller than 1", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.rotation = 0;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when xAxisFlip in the transforamtionSpecs object is not a boolean", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.xAxisFlip = 0;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when yAxisFlip in the transforamtionSpecs object is not a boolean", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs.yAxisFlip = 0;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when the transforamtionSpecs object is empty", async () => {
    const testObject = transformationRequestPayload;
  
    if(testObject.transformationSpecs) testObject.transformationSpecs = {};

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when missing transformationSpecs", async () => {
    const testObject = transformationRequestPayload;
  
    delete testObject.transformationSpecs;

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 400 status code when missing base64String", async () => {
    const testObject = transformationRequestPayload;
  
    delete testObject.base64String;    

    const res = await request(app)
                     .post("/v1/image/transformation")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it("It should send a 405 status code when using a HTTP GET", async () => {
    const res = await request(app).get("/v1/image/transformation");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PUT", async () => {
    const res = await request(app).put("/v1/image/transformation");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP PATCH", async () => {
    const res = await request(app).patch("/v1/image/transformation");

    expect(res.statusCode).toEqual(405);
  });

  it("It should send a 405 status code when using a HTTP DELETE", async () => {
    const res = await request(app).delete("/v1/image/transformation");

    expect(res.statusCode).toEqual(405);
  });
});