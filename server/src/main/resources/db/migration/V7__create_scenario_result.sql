-- V7: Create SCENARIO_RESULT table
CREATE TABLE scenario_result (
    id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id      UUID          NOT NULL REFERENCES scenario(id) ON DELETE CASCADE,
    stranded_percent NUMERIC(6,2),
    stranded_mw      NUMERIC(10,2),
    annual_cost      NUMERIC(15,2),
    capacity_score   VARCHAR(50)
);

CREATE INDEX idx_scenario_result_scenario_id ON scenario_result(scenario_id);
