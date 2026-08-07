-- V2: Create CALCULATION_CONFIGURATION table
CREATE TABLE calculation_configuration (
    id                        UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    version                   VARCHAR(50)    NOT NULL,
    energy_price_per_kwh      NUMERIC(10,4)  NOT NULL,
    hours_per_year            NUMERIC(10,2)  NOT NULL,
    default_pue               NUMERIC(6,4)   NOT NULL,
    air_cooling_factor        NUMERIC(6,4)   NOT NULL,
    chilled_water_factor      NUMERIC(6,4)   NOT NULL,
    liquid_cooling_factor     NUMERIC(6,4)   NOT NULL,
    inmersion_cooling_factor  NUMERIC(6,4)   NOT NULL,
    facility_efficiency       NUMERIC(6,4)   NOT NULL,
    it_efficiency             NUMERIC(6,4)   NOT NULL,
    workload_efficiency       NUMERIC(6,4)   NOT NULL,
    active                    BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at                TIMESTAMP      NOT NULL DEFAULT NOW()
);
