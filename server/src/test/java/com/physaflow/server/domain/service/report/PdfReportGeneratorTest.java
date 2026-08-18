package com.physaflow.server.domain.service.report;

import com.physaflow.server.application.dto.assessment.AssessmentResultResponse;
import com.physaflow.server.application.dto.layeranalysis.LayerAnalysisResponse;
import com.physaflow.server.application.dto.layeranalysis.LayerResponse;
import com.physaflow.server.application.dto.layeranalysis.LossFactorResponse;
import com.physaflow.server.application.dto.scenario.ScenarioItemResponse;
import com.physaflow.server.application.dto.scenario.ScenarioResponse;
import com.physaflow.server.domain.model.enums.CapacityScore;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.LayerType;
import com.physaflow.server.domain.model.enums.ScenarioType;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PdfReportGeneratorTest {

    private final PdfReportGenerator generator = new PdfReportGenerator();

    @Test
    void shouldGeneratePdfWithAllSections() {
        byte[] pdf = generator.generate(
                sampleResult(),
                sampleLayerAnalysis(),
                sampleScenarios()
        );

        assertValidPdf(pdf);
    }

    @Test
    void shouldGeneratePdfWithoutOptionalSections() {
        byte[] pdf = generator.generate(
                sampleResult(),
                null,
                null
        );

        assertValidPdf(pdf);
    }

    @Test
    void writeDemoPdfFile() throws IOException {
        byte[] pdf = generator.generate(
                sampleResult(),
                sampleLayerAnalysis(),
                sampleScenarios()
        );

        Path out = Path.of("/tmp/pdf-report-demo/physaflow-report-demo.pdf");
        Files.createDirectories(out.getParent());
        Files.write(out, pdf);

        assertValidPdf(pdf);
    }

    private void assertValidPdf(byte[] pdf) {
        assertNotNull(pdf);
        assertTrue(pdf.length > 0, "PDF must not be empty");

        String header = new String(pdf, 0, 5);
        assertTrue(header.startsWith("%PDF-"), "PDF must start with the %PDF- header");
    }

    private AssessmentResultResponse sampleResult() {
        return new AssessmentResultResponse(
                UUID.randomUUID(),
                UUID.randomUUID(),
                UUID.randomUUID(),
                new BigDecimal("10.00"),
                new BigDecimal("65.00"),
                CoolingType.AIR,
                new BigDecimal("51.25"),
                new BigDecimal("5.13"),
                new BigDecimal("392481.00"),
                new BigDecimal("479699.00"),
                CapacityScore.C.name(),
                "Hay espacio para una mejora significativa.",
                "v1.2.0-core",
                LocalDateTime.now()
        );
    }

    private LayerAnalysisResponse sampleLayerAnalysis() {
        LayerResponse facility = new LayerResponse(
                LayerType.FACILITY,
                new BigDecimal("10.00"),
                new BigDecimal("8.30"),
                new BigDecimal("1.70"),
                new BigDecimal("17.00"),
                1,
                List.of(new LossFactorResponse("PUE", new BigDecimal("17.00"), new BigDecimal("1.70")))
        );

        LayerResponse it = new LayerResponse(
                LayerType.IT,
                new BigDecimal("8.30"),
                new BigDecimal("6.50"),
                new BigDecimal("1.80"),
                new BigDecimal("21.69"),
                2,
                List.of()
        );

        LayerResponse workload = new LayerResponse(
                LayerType.WORKLOAD,
                new BigDecimal("6.50"),
                new BigDecimal("4.88"),
                new BigDecimal("1.63"),
                new BigDecimal("25.00"),
                3,
                List.of()
        );

        return new LayerAnalysisResponse(
                UUID.randomUUID(),
                List.of(facility, it, workload),
                new BigDecimal("5.13"),
                new BigDecimal("51.25")
        );
    }

    private ScenarioResponse sampleScenarios() {
        ScenarioItemResponse current = new ScenarioItemResponse(
                null,
                "Current State",
                ScenarioType.CURRENT_STATE,
                0,
                new BigDecimal("10.00"),
                new BigDecimal("65.00"),
                CoolingType.AIR,
                new BigDecimal("5.13"),
                new BigDecimal("51.25"),
                new BigDecimal("392481.00"),
                new BigDecimal("479699.00"),
                CapacityScore.C
        );

        ScenarioItemResponse optimized = new ScenarioItemResponse(
                UUID.randomUUID(),
                "Utilization Optimization",
                ScenarioType.UTILIZATION_OPTIMIZATION,
                1,
                new BigDecimal("10.00"),
                new BigDecimal("80.00"),
                CoolingType.AIR,
                new BigDecimal("3.40"),
                new BigDecimal("34.00"),
                new BigDecimal("260568.00"),
                new BigDecimal("318472.00"),
                CapacityScore.B
        );

        return new ScenarioResponse(UUID.randomUUID(), List.of(current, optimized));
    }
}
