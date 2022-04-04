
# Chad Stewart YouGo Back-End Project 0: Pics or It Didn't Happen

This is an app written by [Chad Stewart](https://www.github.com/ChadStewart) for the [YouGo](https://www.github.com/YouGoDevs/YouGo-Backend-Track) practice project.

This project was to complete [part 0](https://github.com/YouGoDevs/YouGo-Backend-Track/blob/main/Project-0.md#part-0-the-agreement) of the practice project.

### Technologies Used:

<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>TypeScript</li>
<li>Sharp</li>
</ul>

### Quick Note!!

The project is in the nodejs folder and you'll need to navigate to that folder before following the instructions below.

### Installing Dependencies

You can install all dependencies for this app by running the command:

    npm i

This is an https server. You'll need a SSL key and certificate to use this which will need to be installed in `nodejs/cert`.

### Running the application

Currently there's two commands that can be used to start the project.

    npm start
    npm run dev

<ul>
<li>npm start will compile ts files into a dist folder and then run the app there.</li>
<li>npm run dev will start nodemon and listen for changes in your ts files and relaunch the server.</li>
</ul>

### Running tests for the application

You can run tests for the application using this command:

    npm test

### Viewing the Swagger Documentation for the API

You can view the Swagger Documentation for the API by starting the application using either command above and then navigating to this link: https://localhost:3000/api-docs

### The Server

This is a web server which with currently 5 endpoints:

<ul>
<li>image/image_resize: Resizes an image between 1% - 99% it's original size.</li>
<li>image/grayscale: Grayscales an image</li>
<li>image/transformation: Transforms an image based on a few parameters</li>
<li>image/blur: Adds a Gaussian Blur to an image</li>
<li>image/negate: Negates all the colors of an image.</li>
</ul>

The server will accept post requests with images in base64 and only accepts image/jpeg and image/png files currently. All other files and requests will be rejected.

### My Design Decisions

You can find a document listing my design decisions [here](./nodejs/design-decisions.md)

### Acknowledgements

Just want to give a quick shout to [zenHorace](https://twitter.com/zenhorace) and [SheidHeda](https://twitter.com/Elixir_Js) for putting together this project and the community around it!