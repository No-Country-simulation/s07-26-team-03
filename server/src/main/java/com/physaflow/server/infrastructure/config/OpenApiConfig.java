package com.physaflow.server.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI physaFlowOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("PhysaFlow Core Engine API")
                        .description("Documentación oficial del motor analítico y transaccional de PhysaFlow para el cálculo de capacidad varada (Stranded MW) y desperdicio energético en centros de datos.")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")));
    }
}