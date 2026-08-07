-- V4: Create ASSESSMENT_RESULT table
CREATE TABLE assessment_result (
    id                     UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id          UUID           NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    configuration_id       UUID           NOT NULL REFERENCES calculation_configuration(id),
    stranded_percent       NUMERIC(6,2),
    stranded_mw            NUMERIC(10,2),
    annual_cost_min        NUMERIC(15,2),
    annual_cost_max        NUMERIC(15,2),
    capacity_score         VARCHAR(50),
    recommendation_summary TEXT,
    algorithm_version      VARCHAR(50),
    calculated_at          TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assessment_result_assessment_id   ON assessment_result(assessment_id);
CREATE INDEX idx_assessment_result_configuration_id ON assessment_result(configuration_id);
