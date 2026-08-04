FROM eclipse-temurin:21-jdk-ubi10-minimal AS builder

WORKDIR /app

COPY pom.xml .
COPY .mvn ./.mvn
COPY mvnw .

RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests -B


FROM eclipse-temurin:21-jre-ubi10-minimal

WORKDIR /app

RUN groupadd -r appuser && useradd -r -g appuser appuser

USER appuser

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]