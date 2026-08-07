-- V12: Seed initial CALCULATION_CONFIGURATION
-- Replace placeholder values with real ones from the calculation document
INSERT INTO calculation_configuration (
    version,
    energy_price_per_kwh,
    hours_per_year,
    default_pue,
    air_cooling_factor,
    chilled_water_factor,
    liquid_cooling_factor,
    inmersion_cooling_factor,
    facility_efficiency,
    it_efficiency,
    workload_efficiency,
    active,
    created_at
) VALUES (
    '1.0.0',                 -- version
    0.15,                    -- energy_price_per_kwh   (reemplazar)
    8760,                    -- hours_per_year          (reemplazar)
    1.58,                    -- default_pue             (reemplazar)
    0.75,                    -- air_cooling_factor      (reemplazar)
    0.80,                    -- chilled_water_factor    (reemplazar)
    0.90,                    -- liquid_cooling_factor   (reemplazar)
    0.95,                    -- inmersion_cooling_factor (reemplazar)
    0.85,                    -- facility_efficiency     (reemplazar)
    0.80,                    -- it_efficiency           (reemplazar)
    0.90,                    -- workload_efficiency     (reemplazar)
    TRUE,
    NOW()
);
