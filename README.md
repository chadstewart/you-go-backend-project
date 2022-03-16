
# Chad Stewart YouGo Back-End Project 0: Pics or It Didn't Happen

This is an app written by [Chad Stewart](https://www.github.com/ChadStewart) for the [YouGo](https://www.github.com/zenhorace/YouGo) practice project.

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

### Running the application

Before attempting to run the project make sure to run the command:

    chmod +x ./prepare.sh

Run the above command in the folder of the project which should contain the prepare.sh file.

Currently there's two commands that can be used to start the project.

    npm start
    npm run dev

Both commands will check for and delete a 'dist' folder and an 'images' folder from the project folder. It will then create an images folder, run the TypeScript compiler and then run the compiled JavaScript code.

## The Server

This is a web server which with currently 5 endpoints:

<ul>
<li>image/image_resize: Resizes an image between 1% - 99% it's original size. *Completed*</li>
<li>image/grayscale: Grayscales an image *To Be Developed*</li>
<li>image/transformation: Transforms an image based on a few parameters *To Be Developed*</li>
<li>*TBD*</li>
<li>*TBD*</li>
</ul>

The server will accept post requests with images in base64 and only accepts image/jpeg and image/png files currently. All other files and requests will be rejected.

### My Design Decisions

You can find a document listing my design decisions [here](./nodejs/design-decisions.md)

### Acknowledgements

Just want to give a quick shout to [zenHorace](https://twitter.com/zenhorace) and [Pawn](https://twitter.com/Elixir_Js) for putting together this project and the community around it!