-- ============================================================
-- Scenario Comparison Configuration
-- ============================================================

ALTER TABLE calculation_configuration
    ADD COLUMN scenario_utilization_increment
        NUMERIC(5, 2) NOT NULL DEFAULT 10.00;

ALTER TABLE calculation_configuration
    ADD COLUMN scenario_max_utilization
        NUMERIC(5, 2) NOT NULL DEFAULT 90.00;


-- ============================================================
-- Scenario
-- ============================================================

ALTER TABLE scenario
    ADD COLUMN type VARCHAR(50);

ALTER TABLE scenario
    ADD COLUMN sort_order INTEGER;

ALTER TABLE scenario
    DROP COLUMN utilization;

ALTER TABLE scenario
     ADD COLUMN utilization
         NUMERIC(10, 2);

ALTER TABLE scenario
     ADD CONSTRAINT uk_scenario_assessment_type
     UNIQUE (assessment_id, type);


-- ============================================================
-- Scenario Result
-- ============================================================

ALTER TABLE scenario_result
    ADD COLUMN annual_cost_min
        NUMERIC(15, 2);

ALTER TABLE scenario_result
    ADD COLUMN annual_cost_max
        NUMERIC(15, 2);

ALTER TABLE scenario_result
    ADD COLUMN stranded_mw_recovered
        NUMERIC(10, 2);

ALTER TABLE scenario_result
    ADD COLUMN stranded_percent_reduction
        NUMERIC(6, 2);

ALTER TABLE scenario_result
    ADD COLUMN annual_cost_savings_min
        NUMERIC(15, 2);

ALTER TABLE scenario_result
    ADD COLUMN annual_cost_savings_max
        NUMERIC(15, 2);


-- ============================================================
-- Data migration for existing ScenarioResult records
-- ============================================================

UPDATE scenario_result
SET annual_cost_min = annual_cost,
    annual_cost_max = annual_cost
WHERE annual_cost_min IS NULL
  AND annual_cost_max IS NULL;


-- ============================================================
-- Enforce required fields
-- ============================================================

ALTER TABLE scenario_result
    ALTER COLUMN annual_cost_min SET NOT NULL;

ALTER TABLE scenario_result
    ALTER COLUMN annual_cost_max SET NOT NULL;

-- ============================================================
-- 6. Remove obsolete field
-- ============================================================

ALTER TABLE scenario_result
    DROP COLUMN annual_cost;



