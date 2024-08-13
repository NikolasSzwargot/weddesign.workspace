# Docker

## Prerequisites
You need to have docker desktop installed (preferably version 4.32).

## Launching
1. Start docker desktop.
2. Navigate in the console to the docker directory
```cd .\apps\docker```
3. Start docker container
```docker-compose up```

## Connecting docker's db to webstorm
Download the plugin "Database tools and SQL for webstorm".
Create the new connection:
- Host: localhost
- Port: 5432
- Authenticator: User & Password
- User: admin
- Password: weLoveWeddings!
- Database: Postgres

