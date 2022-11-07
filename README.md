# Full stack project

Source files for the final full stack project.

Angular front end is located in /usersfront.
Spring boot back end is located in /usersbackend

Running with docker:

```cli
docker-compose up --build -d
```

OR

```cli
./build.sh
```

Nginx will launch on: [http://localhost:4200](http://localhost:4200).

The spring-boot API runs on [http://localhost:8080/api/users](http://localhost:8080/api/users) and [http://localhost:8080/api/user_types](http://localhost:8080/api/user_types).

