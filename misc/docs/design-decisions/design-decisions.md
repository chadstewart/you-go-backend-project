# Project Design Decisions

## Technology Choices

I chose to use Node/Express since I already have a solid JavaScript background and spinning up a server in Node would be pretty fast. I honestly still want to write this project in Golang once everything is completed but for now, I'll focus on using Node.

Chose to use TypeScript to add static typing as well and to continue to learn TypeScript. Something that I really appreciate is having access to ES6 syntax in Node since it'll be compiled down to something Node will run. Definitely made the project more fun to write rather than writing ES5 stuff.

I ended up using Sharp for image processing. This choice was mainly because I heard that it was one of if not the most popular JS library for image processing and manipulation so it felt like an easy choice.

For logging, I ended up going with Winston because it was one of the more popular logging frameworks for Node. Admittedly I don't have too much knowledge here and so I just went with the best recommendation.

## Endpoint Design

I chose to split the endpoints rather than have a single image endpoint. I personally like to be more explicit when I'm coding and will always choice an implementation if I feel it helps with clarity. As opposed to building out a mechanism to choose the different alterations, I figured having the endpoints labeled explicitly would be clearer for other devs using the service. I also feel like the structure of the controller is a bit cleaner but that could be just me. For right now, that endpoints only accept image/jpeg and image/png mostly to keep things simple. Each endpoint will handle validating it's own parameters before attempting to get and decode the base64 string. The endpoints take a json object where the image data is sent and all the necessary parameters are defined. Honestly, I did this because it made the whole thing simple to implement and I was very use to constructing objects properly so I felt more comfortable staying in that realm.

<ul>
<li>Image Resize: I decided that I would only allow the image to be compressed to 1% - 99% of it's original size. The blood oath I took when I attended art school forbids me to allow anyone to purposefully create a pixelated image. I decided to create an image manipulation function for the stuff with sharp. The original idea was that it would have all the image manipulation related functionality and you'd just pass the relevant information but just building this function out seems like tha's way too complicated of a task. I'll have to reassess how I think about doing image manipulation. I'll also likely do this for every other endpoint</li>
<li>Image Grayscale: Not much to say about this honestly. It's very similar to Image Resize except taking out the resize specific parts.
</li>
<li>Image Transformation: So I decided that image transformation would allow you to do up to 4 different manipulations on an image. The manipulations do not rely on another being done to be done and you don't need to do all 4 at once. The end point will do the manipulations specified and will ignore manipulations that aren't. To deliver the specifications, I made the user make an object with the specific manipulations specified. There are specific validations on each manipulations which the end points will give you an error on if you don't do them properly. The validations right now only exist in the end point file since I figured this end point would be the only place that does this validation. I am exploring it though so that it can be tested properly.
</li>
<li>Image Blur: Not much to say about this honestly. It's very similar to Image Resize except taking out the resize specific parts.
</li>
<li>Image Negate: Not much to say about this honestly. It's very similar to Image Resize except taking out the resize specific parts. (Noticed this was copied and pasted yet? =P)
</li>
</ul>

## Services

When I started the project, I didn't have the concept of having services separate from my endpoints. Originally, any image manipulation was done directly in the controller. Now I have a services folder that stores the business logic I want to use.

<li>Image Manipulation: Originally in each controller, I migrated them all to a file in services and put a gateway function to call the specific manipulation I needed with correct parameters</li>

## Image Upload

I chose to do image uploads using base64 mostly because I hadn't used the technique before and I thought it would be a fun thing to implement. Honestly, the reason why it took me so long to work on this part of the project was I had no clue how to approach it and decided that I'd seek help from a friend but wasn't able to see them for some time. After a while, I just decided to wrestle with it myself and wrestle with it I did, lol.

I also know that there will be a point in the project where we implement data persistence and I like the idea of storing image files as text. My only concern in this approach is that the text file that holds my example base64 image is 80+ kb in site versus the original image's 60-something kb. As far as I can tell, that isn't a constant ratio but that's a fair amount of size increase for store the image as text. I'm worried about larger images and the potential growth in file size.

This brings me to the 50 mb limit I put for the body parser limit. So to be honest, I don't have a lot of experience with using base64 files and when I was doing some reading in an attempt to do the base64 conversion and it had suggested putting a 50 mb limit so I headed their warning.

## Response Validation

As said before, I am only allowing image/jpeg and image/png as data types for now. To do validation, I just created an object that has the data types as keys and their values as true. I just wanted to ensure that JavaScript didn't read a potentially falsy value in the object and do... well JavaScript things. I then loop through the object and match the key to the data type from the base64 string. If there's a hit, then it's considered valid. Now that I'm thinking about it, since I'm using only the key, the value doens't matter too much but I'd still rather not have JavaScript have a falsy value and do something silly.

I also validate that the entire string is a base64 formatted string before attempting to validate the type and then pulling out the base64 string itself. This is done through Regex which I admittedly didn't write myself (I should also note that I also didn't write the decoder for the base64 string) and just compare the string to the Regex. I'm very unfamiliar with validating a base64 image so if there are better implementations or maybe even packages that'll do this job better, please let me know.

## Testing

The test suite currently will test all api endpoints and all the utilies seperately. I have the coverage tag on the test script so I can see how much of coverage I have and it was pretty good simply testing the endpoints but I also want that when a test fails, it'll tell me specifically which function fails.

## Logging

I currently log all the requests that come to the server, I log all the responses and I log when services are completed successfully. I also log errors whenever they occur. I log errors as errors and I log when the api sends an error to the user but responds appropriately as warnings. I'm not sure if this is correct but I wanted a way to differentiate between actual errors and just user error to see if users are having trouble using the api. Everything else I log as info.

## And that's it

Thanks for taking the time to read through this. It's a bit lengthy but I hope this was helpful in showing my thought process throughout the project.