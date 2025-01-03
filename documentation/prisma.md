# Prisma

## Prerequisites
Install prisma ORM

```yarn add prisma```

```yarn add @prisma/client```

## Migrating data from database
In the folder ```apps/backend/prisma/migrations``` there is a list of migrations from others. 
You can navigate through all scripts by the catalog's name (date + short name).
To import one of the sql you can just go to the script and run it on your database.
To import all of them you can pull the changes.

## Migrating data to database
In schema.prisma you need to define models.
To push models into the table in db you have 2 options:

1. You finished developing
2. You are still developing

In the first option you can migrate data.
Go to the ```apps/backend``` and run ```npx prisma migrate dev --name "your_migration_name"```.
After that the sql files will appear in migrations folder. 
These should be pushed to the main branch, because all the developers might need them.

In the second option you want to push changes into your db without creating sql files.
Go to the ```apps/backend``` and run ```npx prisma db push```.

## Using prisma as ORM
For further information please go to the official prisma documentation. 

## Database dumps
To make a dump write in terminal:
```pg_dump -U admin -h localhost -p 5432 postgres > SQL_FILE_FULL_PATH```
You will need to provide a password for our database (weLoveWeddings!).
please, copy that file to the migration folder.
To import a dump write in terminal:
```psql -U admin -h localhost -p 5432 -d postgres -f SQL_FILE_FULL_PATH```
You will need to provide a password for our database (weLoveWeddings!).


Thank you from the mountains <3

