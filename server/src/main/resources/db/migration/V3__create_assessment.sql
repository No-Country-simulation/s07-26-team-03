-- V3: Create ASSESSMENT table
-- Note: session_id stored without FK (session lives in cache, kept for traceability)
CREATE TABLE assessment (
    id               UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id          UUID           NOT NULL REFERENCES lead(id) ON DELETE CASCADE,
    session_id       UUID,
    facility_mw      NUMERIC(10,2),
    utilization      NUMERIC(5,2),
    cooling_type     VARCHAR(50),
    status           VARCHAR(50)    NOT NULL,
    expires_at       TIMESTAMP,
    last_accessed_at TIMESTAMP,
    created_at       TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assessment_lead_id ON assessment(lead_id);