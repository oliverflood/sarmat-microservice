# CS 361 Sarmat Microservice

## Description
This is a microservice made for my partner's game Sarmat in our CS 361 class which uses HTTP POST requests as a communication pipeline. This microservice runs forever using pm2 on ```http://flip1.engr.oregonstate.edu:56709/pick-character``` which requires you to be on the OSU VPN to access. Feel free to run it locally by installing the packages with ```npm install``` and ```pm2 start server.js```. The service takes an array of characterId and weights and randomly returns a characterId with weighed odds. 

## Request
Send a POST request to ```http://flip1.engr.oregonstate.edu:56709/pick-character``` containing a JSON object with an array of characterId and weights like this:

```
{ 
  "characters": [
    { "characterId": "SNIPER", "weight": 100 },
    { "characterId": "HAXXOR", "weight": 10 },
    { "characterId":"FLAMER", "weight": 5 }
  ]
}
```

The higher the weight, the higher the likelyhood of a character being selected. In the above example, SNIPER has a 100/115 probability of being chosen, HAXXOR a 10/115 probability, and FLAMER a 5/115 probability. 

## Reponse
You will receive a response with a randomly selected charactedId in the JSON body. Here's an example response: 

```
{
  "characterId":"SNIPER"
}
``` 

The response just includes the same characterId that was sent. The service will also return a 400 error if an array with weights is not sent (invalid input) and a 500 error if for some reason the server fails to pick a character. 

## UML Diagram
