CREATE TABLE otp_code (
    id UUID PRIMARY KEY,
    lead_id UUID NOT NULL,
    code_hash VARCHAR(255) NOT NULL,
    purpose VARCHAR(30) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_otp_code_lead
        FOREIGN KEY (lead_id)
        REFERENCES lead(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_otp_code_attempts
        CHECK (attempts >= 0),

    CONSTRAINT chk_otp_code_purpose
        CHECK (purpose IN ('ACTIVATION', 'LOGIN'))
);

CREATE INDEX idx_otp_code_lead_purpose
    ON otp_code (lead_id, purpose);

CREATE INDEX idx_otp_code_active
    ON otp_code (lead_id, purpose, created_at DESC)
    WHERE used_at IS NULL;