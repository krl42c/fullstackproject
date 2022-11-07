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

Note: You might have to wait a few seconds/reload before the initial data gets fetched from the server when launching both images at the sime time, this could be solvented by using a [resolver](https://angular.io/api/router/Resolve) but i didn't have time to implement it.
