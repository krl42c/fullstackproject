# syntax=docker/dockerfile:1

FROM eclipse-temurin
WORKDIR /

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:resolve

COPY src ./src
COPY db.mv.db ./db.mv.db

CMD ["./mvnw", "spring-boot:run"]


