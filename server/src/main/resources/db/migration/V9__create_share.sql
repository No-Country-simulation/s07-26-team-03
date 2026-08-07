-- V9: Create SHARE table
CREATE TABLE share (
    id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID          NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    public_token  VARCHAR(255)  NOT NULL UNIQUE,
    views         INTEGER       NOT NULL DEFAULT 0,
    expires_at    TIMESTAMP,
    created_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_share_assessment_id ON share(assessment_id);
