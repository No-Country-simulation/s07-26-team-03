-- V4__make_assessment_lead_session_nullable.sql
-- Permite valores nulos temporalmente en el primer cálculo anónimo

ALTER TABLE assessment ALTER COLUMN lead_id DROP NOT NULL;