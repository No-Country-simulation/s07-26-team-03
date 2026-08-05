-- V2__update_cooling_type_domain.sql
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS ck_calc_cooling_type;

ALTER TABLE calculations
ADD CONSTRAINT ck_calc_cooling_type
CHECK (cooling_type IN ('standard', 'air', 'liquid', 'immersion', 'hybrid'));