#!/bin/sh

docker build -t phitrus-bot .
heroku container:push web --app phitrus-bot
heroku container:release web --app phitrus-bot

