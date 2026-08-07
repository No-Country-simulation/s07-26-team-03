-- V10: Create RECOMMENDATION table
CREATE TABLE recommendation (
    id                   UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_result_id UUID           NOT NULL REFERENCES assessment_result(id) ON DELETE CASCADE,
    category             VARCHAR(100),
    priority             VARCHAR(50),
    title                VARCHAR(255),
    description          TEXT,
    estimated_savings    NUMERIC(15,2)
);

CREATE INDEX idx_recommendation_assessment_result_id ON recommendation(assessment_result_id);
