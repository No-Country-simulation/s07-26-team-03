-- V6: Create SCENARIO table
CREATE TABLE scenario (
    id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID          NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    name          VARCHAR(255)  NOT NULL,
    facility_mw   NUMERIC(10,2),
    utilization   VARCHAR(50),
    cooling_type  VARCHAR(50),
    created_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_scenario_assessment_id ON scenario(assessment_id);
