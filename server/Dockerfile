# ==========================================
# Stage 1: Build (Compilación)
# ==========================================
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace/app

# Copiar el wrapper de Maven y la definición del proyecto
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Descargar dependencias offline para aprovechar la caché de capas de Docker
RUN ./mvnw dependency:go-offline -B

# Copiar el código fuente
COPY src src

# Compilar empaquetando el .jar y omitiendo tests para acelerar el build local
RUN ./mvnw clean package -DskipTests

# ==========================================
# Stage 2: Runtime (Ejecución)
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Decisión Arquitectónica: Seguridad (Principio de Mínimos Privilegios)
# Ejecutar el contenedor como usuario no-root.
RUN addgroup -S physaflow && adduser -S physaflow -G physaflow
USER physaflow:physaflow

# Extraer el artefacto compilado del stage anterior
COPY --from=builder /workspace/app/target/*.jar app.jar

# Exponer el puerto estándar HTTP
EXPOSE 8080

# Configurar el punto de entrada optimizado para Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]