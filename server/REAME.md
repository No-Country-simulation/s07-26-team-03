# PhysaFlow Backend Server

## Overview
Backend API for PhysaFlow, a data center stranded capacity calculator with a viral and analytical focus.

## Stack & Architecture
*   **Language:** Java 21 (LTS) with Virtual Threads enabled.
*   **Framework:** Spring Boot 4.0.7
*   **Database:** PostgreSQL with HikariCP.
*   **Migrations:** Flyway.
*   **Architecture Pattern:** Strict Layered Architecture (Controllers -> Services -> Repositories).
*   **Mapping & Boilerplate:** MapStruct 1.6.3 and Lombok 1.18.36.

## Folder Structure Convention
The project adheres to domain-driven layer isolation:
*   `application/controller/`: Stateless REST endpoints. Input validation via `@Valid`.
*   `application/dto/`: Immutable Records for data transfer.
*   `application/exception/`: Global `@ControllerAdvice` handling.
*   `domain/service/`: Pure business logic (e.g., mathematical formulas).
*   `domain/model/`: JPA Entities (no business logic, just state).
*   `infrastructure/repository/`: Spring Data JPA interfaces.