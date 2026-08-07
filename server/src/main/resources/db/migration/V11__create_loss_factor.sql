-- V11: Create LOSS_FACTOR table
CREATE TABLE loss_factor (
    id                 UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    layer_analysis_id  UUID          NOT NULL REFERENCES layer_analysis(id) ON DELETE CASCADE,
    factor             VARCHAR(100),
    impact_percent     NUMERIC(6,2),
    impact_mw          NUMERIC(10,2)
);

CREATE INDEX idx_loss_factor_layer_analysis_id ON loss_factor(layer_analysis_id);
