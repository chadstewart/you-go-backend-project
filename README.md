
# Chad Stewart YouGo Back-End Project 0: Pics or It Didn't Happen

This is an app written by [Chad Stewart](www.github.com/ChadStewart) for the [YouGo](wwww.github.com/YouGo) practice project.

### Technologies Used:

<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>TypeScript</li>
<li>Nodemon</li>
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

### My Design Decisions

You can find a document listing my design decisions [here](./nodejs/design-decisions.md)

### Acknowledgements

Just want to give a quick shout to [zenHorace](https://twitter.com/zenhorace) and [Pawn](https://twitter.com/Elixir_Js) for putting together this project and the community around it!