-- V5: Create LAYER_ANALYSIS table
CREATE TABLE layer_analysis (
    id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID          NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    layer         VARCHAR(100)  NOT NULL,
    input_mw      NUMERIC(10,2),
    output_mw     NUMERIC(10,2),
    loss_mw       NUMERIC(10,2),
    loss_percent  NUMERIC(6,2),
    display_order INTEGER       NOT NULL DEFAULT 0
);

CREATE INDEX idx_layer_analysis_assessment_id ON layer_analysis(assessment_id);
