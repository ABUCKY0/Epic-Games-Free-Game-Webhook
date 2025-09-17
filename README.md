Epic Free Games Webhook

Script to be run in cron that posts new Epic Games free (weekly) games. 

Create docker-compose.override.yml with the following content:

```yml
version: "3.8"
services:
  epic-free-games:
    environment:
      - WEBHOOK_URL=<discord webhook url>
```

Then create an empty ids.txt file.