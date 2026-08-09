package com.physaflow.server.application.exception;

/**
 * Excepción de dominio lanzada cuando el motor analítico de PhysaFlow
 * no puede localizar una configuración activa (CalculationConfiguration)
 * en la base de datos para ejecutar las fórmulas matemáticas.
 */
public class ConfigurationNotFoundException extends RuntimeException {

    /*
     * mensaje detallado que explica la ausencia de la configuración.
     */
    public ConfigurationNotFoundException(String message) {
        super(message);
    }

    /*
     * Construye una nueva excepción con un mensaje detallado y la causa raíz.
     */
    public ConfigurationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }


}