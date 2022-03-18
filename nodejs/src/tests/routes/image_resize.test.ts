import request from "supertest";
import { app, secureServer as server } from "../../app";
import requestPayload from "../test_utils/test-payload";

describe("Images Resize Route", () => {
  afterEach(done => {
    server.close();
    done();
  });

  it('It should send a 200 status code with a json payload with a proper request', async () => {
    const testObject = requestPayload;
  
    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

    const receivedObject = JSON.parse(res.text);

    expect(res.statusCode).toEqual(200);
    expect(receivedObject).toBeDefined();
  });

  it('It should send a 415 status code when the wrong data type is used', async () => {
    const testObject = requestPayload;
  
    testObject.base64String = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

                     console.log(res);
    expect(res.statusCode).toEqual(415);
  });

  it('It should send a 400 status code when percentageScale is bigger than 99', async () => {
    const testObject = requestPayload;
  
    testObject.percentageScale = 100;

    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });



  it('It should send a 400 status code when percentageScale is smaller than 1', async () => {
    const testObject = requestPayload;
  
    testObject.percentageScale = 0;

    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it('It should send a 400 status code when missing percentageScale', async () => {
    const testObject = requestPayload;
  
    delete testObject.percentageScale;

    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it('It should send a 400 status code when missing base64String', async () => {
    const testObject = requestPayload;
  
    delete testObject.base64String;    

    const res = await request(app)
                     .post("/image/image_resize")
                     .send(testObject);

    expect(res.statusCode).toEqual(400);
  });

  it('It should send a 501 status code when using a HTTP GET', async () => {
    const res = await request(app).get("/image/image_resize");

    expect(res.statusCode).toEqual(501);
  });

  it('It should send a 501 status code when using a HTTP PUT', async () => {
    const res = await request(app).put("/image/image_resize");

    expect(res.statusCode).toEqual(501);
  });

  it('It should send a 501 status code when using a HTTP PATCH', async () => {
    const res = await request(app).patch("/image/image_resize");

    expect(res.statusCode).toEqual(501);
  });

  it('It should send a 501 status code when using a HTTP DELETE', async () => {
    const res = await request(app).delete("/image/image_resize");

    expect(res.statusCode).toEqual(501);
  });
});