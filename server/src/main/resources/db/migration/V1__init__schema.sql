-- =============================================================================
-- V1__init_physaflow_schema.sql
-- Schema completo del MVP de PhysaFlow (Refactorizado para Producción).
-- =============================================================================

-- =============================================================================
-- FUNCIONES PL/pgSQL GLOBALES
-- =============================================================================
-- Función nativa para garantizar la actualización precisa de la columna updated_at
-- sin depender del ciclo de vida de Hibernate/JPA.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================================================
-- TABLA 1: calculations
-- =============================================================================
-- Motor Analítico - Cálculo de Stranded MW
CREATE TABLE calculations (
    id                  VARCHAR(12)   PRIMARY KEY,
    facility_mw         NUMERIC(10,2) NOT NULL,
    utilization_pct     NUMERIC(5,2)  NOT NULL,
    cooling_type        VARCHAR(32)   NOT NULL,
    stranded_pct        NUMERIC(5,2)  NOT NULL,
    stranded_mw         NUMERIC(10,2) NOT NULL,
    waste_usd_low       NUMERIC(15,2) NOT NULL,
    waste_usd_high      NUMERIC(15,2) NOT NULL,
    layers_payload      JSONB,
    parent_scenario_id  VARCHAR(12),
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ,

    -- Validaciones de rango e integridad matemática
    CONSTRAINT ck_calc_utilization
        CHECK (utilization_pct BETWEEN 0 AND 100),
    CONSTRAINT ck_calc_facility
        CHECK (facility_mw > 0),
    CONSTRAINT ck_calc_waste_range
        CHECK (waste_usd_low <= waste_usd_high),

    -- [NUEVO] Restricción dura de dominio para evitar corrupciones de tipos
    CONSTRAINT ck_calc_cooling_type
        CHECK (cooling_type IN ('air', 'liquid', 'immersion', 'hybrid')),

    -- Relación autorreferencial para comparación de escenarios
    CONSTRAINT fk_calc_parent_scenario
        FOREIGN KEY (parent_scenario_id)
        REFERENCES calculations(id)
        ON DELETE SET NULL,

    CONSTRAINT ck_calc_no_self_parent
        CHECK (parent_scenario_id IS NULL OR parent_scenario_id <> id)
);

-- Triggers e Índices
CREATE TRIGGER trg_calculations_updated_at
    BEFORE UPDATE ON calculations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_calculations_created_at ON calculations (created_at DESC);
CREATE INDEX idx_calculations_cooling_type ON calculations (cooling_type);
CREATE INDEX idx_calculations_parent_scenario_id ON calculations (parent_scenario_id);

COMMENT ON TABLE calculations IS 'Cálculos de Stranded MW. PK Base62 viral. Dev A (Sprint 1).';
COMMENT ON COLUMN calculations.id IS 'Token Base62 de 12 chars. Share_token viral.';
COMMENT ON COLUMN calculations.layers_payload IS 'Breakdown JSONB de 3 capas. NULL en Sprint 1.';

-- =============================================================================
-- TABLA 2: leads
-- =============================================================================
-- Captura de Leads (Want More?)
CREATE TABLE leads (
    id              BIGSERIAL     PRIMARY KEY,
    calculation_id  VARCHAR(12)   NOT NULL,
    email           VARCHAR(255)  NOT NULL,
    unlock_token    VARCHAR(32)   NOT NULL,
    ip_address      INET,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),

    -- Integridad referencial
    CONSTRAINT fk_leads_calculation
        FOREIGN KEY (calculation_id)
        REFERENCES calculations(id)
        ON DELETE CASCADE,

    -- [NUEVO] Fuerza la normalización de correos a nivel de motor SQL
    CONSTRAINT ck_leads_email_lower
        CHECK (email = lower(email)),

    -- Control de duplicados e idempotencia
    CONSTRAINT uq_leads_calculation_email
        UNIQUE (calculation_id, email),
    CONSTRAINT uq_leads_unlock_token
        UNIQUE (unlock_token)
);

-- Índices de búsqueda frecuente
CREATE INDEX idx_leads_calculation_id ON leads (calculation_id);
CREATE INDEX idx_leads_email ON leads (email);

COMMENT ON TABLE leads IS 'Usuarios desbloqueados. Dev B (Sprint 2).';
COMMENT ON COLUMN leads.unlock_token IS 'Token Base62 plano para acceso al Dashboard (Bearer Auth).';