-- V1: Create LEAD table
CREATE TABLE lead (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) NOT NULL UNIQUE,
    name        VARCHAR(255),
    company     VARCHAR(255),
    role        VARCHAR(255),
    email_verified BOOLEAN  NOT NULL DEFAULT FALSE,
    status      VARCHAR(50)  NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
