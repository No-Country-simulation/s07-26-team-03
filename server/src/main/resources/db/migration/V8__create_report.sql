-- V8: Create REPORT table
CREATE TABLE report (
    id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID          NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    file_url      TEXT          NOT NULL,
    format        VARCHAR(20)   NOT NULL,
    generated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_report_assessment_id ON report(assessment_id);
