package com.physaflow.server.domain.service.report;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
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
import org.springframework.stereotype.Component;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Renders the assessment report PDF in memory using OpenPDF.
 * Works exclusively with DTOs, decoupled from JPA entities.
 */
@Component
public class PdfReportGenerator {

    private static final Color BRAND_COLOR = new Color(25, 55, 95);
    private static final Color HEADER_BG = new Color(230, 236, 245);
    private static final Color TEXT_GRAY = new Color(90, 90, 90);

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm 'UTC'");

    private final DecimalFormat numberFormat;

    public PdfReportGenerator() {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
        this.numberFormat = new DecimalFormat("#,##0.00", symbols);
    }

    public byte[] generate(
            AssessmentResultResponse result,
            LayerAnalysisResponse layerAnalysis,
            ScenarioResponse scenarios
    ) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            Document document = new Document(PageSize.A4, 50, 50, 60, 60);
            PdfWriter.getInstance(document, baos);
            document.open();

            addHeader(document, result);
            addInputSection(document, result);
            addResultSection(document, result);
            addRecommendationSection(document, result);

            if (layerAnalysis != null && !layerAnalysis.layers().isEmpty()) {
                addLayerAnalysisSection(document, layerAnalysis);
            }

            if (scenarios != null && !scenarios.scenarios().isEmpty()) {
                addScenariosSection(document, scenarios);
            }

            document.close();
            return baos.toByteArray();

        } catch (Exception ex) {
            throw new IllegalStateException("Error generating assessment PDF report.", ex);
        }
    }

    /*
     * ============================================================
     * SECTIONS
     * ============================================================
     */

    private void addHeader(Document document, AssessmentResultResponse result) throws DocumentException {
        Paragraph title = new Paragraph("PhysaFlow", titleFont());
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        Paragraph subtitle = new Paragraph("Reporte de Capacidad Varada", subtitleFont());
        subtitle.setAlignment(Element.ALIGN_CENTER);
        subtitle.setSpacingAfter(6f);
        document.add(subtitle);

        Paragraph meta = new Paragraph(
                "Assessment ID: " + result.assessmentId()
                        + "  |  Generado: " + DATE_FORMAT.format(LocalDateTime.now(ZoneOffset.UTC)),
                metaFont()
        );
        meta.setAlignment(Element.ALIGN_CENTER);
        meta.setSpacingAfter(18f);
        document.add(meta);
    }

    private void addInputSection(Document document, AssessmentResultResponse result) throws DocumentException {
        document.add(sectionTitle("Datos de Entrada"));

        PdfPTable table = createTable(2);
        addRow(table, "Capacidad del facility", format(result.facilityMw()) + " MW");
        addRow(table, "Utilización", format(result.utilization()) + " %");
        addRow(table, "Tipo de enfriamiento", coolingLabel(result.coolingType()));

        document.add(table);
        addSpacing(document);
    }

    private void addResultSection(Document document, AssessmentResultResponse result) throws DocumentException {
        document.add(sectionTitle("Resultados del Análisis"));

        PdfPTable table = createTable(2);
        addRow(table, "Capacidad varada", format(result.strandedMw()) + " MW");
        addRow(table, "Porcentaje varado", format(result.strandedPercent()) + " %");
        addRow(table, "Costo anual estimado (mín)", "$ " + format(result.annualCostMin()));
        addRow(table, "Costo anual estimado (máx)", "$ " + format(result.annualCostMax()));
        addRow(table, "Capacity Score", scoreLabel(result.capacityScore()));
        addRow(table, "Versión del algoritmo", safe(result.algorithmVersion()));
        if (result.calculatedAt() != null) {
            addRow(table, "Fecha de cálculo", DATE_FORMAT.format(result.calculatedAt()));
        }

        document.add(table);
        addSpacing(document);
    }

    private void addRecommendationSection(Document document, AssessmentResultResponse result) throws DocumentException {
        if (result.recommendationSummary() == null || result.recommendationSummary().isBlank()) {
            return;
        }

        document.add(sectionTitle("Recomendación"));

        Paragraph body = new Paragraph(result.recommendationSummary(), bodyFont());
        body.setAlignment(Element.ALIGN_JUSTIFIED);
        document.add(body);
        addSpacing(document);
    }

    private void addLayerAnalysisSection(Document document, LayerAnalysisResponse layerAnalysis) throws DocumentException {
        document.add(sectionTitle("Análisis por Capas"));

        PdfPTable table = createTable(5);
        addHeaderCell(table, "Capa");
        addHeaderCell(table, "Entrada (MW)");
        addHeaderCell(table, "Salida (MW)");
        addHeaderCell(table, "Pérdida (MW)");
        addHeaderCell(table, "Pérdida (%)");

        for (LayerResponse layer : layerAnalysis.layers()) {
            addCell(table, layerLabel(layer.layer()));
            addCell(table, format(layer.inputMw()));
            addCell(table, format(layer.outputMw()));
            addCell(table, format(layer.lossMw()));
            addCell(table, format(layer.lossPercent()));
        }

        document.add(table);

        for (LayerResponse layer : layerAnalysis.layers()) {
            if (layer.lossFactors() == null || layer.lossFactors().isEmpty()) {
                continue;
            }

            Paragraph factorsTitle = new Paragraph(
                    "Factores de pérdida — " + layerLabel(layer.layer()), boldFont());
            factorsTitle.setSpacingBefore(8f);
            document.add(factorsTitle);

            for (LossFactorResponse factor : layer.lossFactors()) {
                Paragraph item = new Paragraph(
                        "  • " + safe(factor.factor())
                                + ": " + format(factor.impactMw()) + " MW"
                                + " (" + format(factor.impactPercent()) + " %)",
                        bodyFont());
                document.add(item);
            }
        }

        addSpacing(document);
    }

    private void addScenariosSection(Document document, ScenarioResponse scenarios) throws DocumentException {
        document.add(sectionTitle("Escenarios"));

        PdfPTable table = createTable(6);
        addHeaderCell(table, "Escenario");
        addHeaderCell(table, "Utilización (%)");
        addHeaderCell(table, "Enfriamiento");
        addHeaderCell(table, "Varada (MW)");
        addHeaderCell(table, "Costo anual (rango)");
        addHeaderCell(table, "Score");

        for (ScenarioItemResponse scenario : scenarios.scenarios()) {
            addCell(table, scenarioLabel(scenario));
            addCell(table, format(scenario.utilization()));
            addCell(table, coolingLabel(scenario.coolingType()));
            addCell(table, format(scenario.strandedMw()));
            addCell(table, "$ " + format(scenario.annualCostMin())
                    + " — $ " + format(scenario.annualCostMax()));
            addCell(table, scoreLabel(scenario.capacityScore()));
        }

        document.add(table);
        addSpacing(document);
    }

    /*
     * ============================================================
     * HELPERS
     * ============================================================
     */

    private PdfPTable createTable(int columns) {
        PdfPTable table = new PdfPTable(columns);
        table.setWidthPercentage(100f);
        table.setSpacingBefore(6f);
        return table;
    }

    private void addRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, boldFont()));
        labelCell.setBackgroundColor(HEADER_BG);
        labelCell.setPadding(6f);
        table.addCell(labelCell);

        PdfPCell valueCell = new PdfPCell(new Phrase(value, bodyFont()));
        valueCell.setPadding(6f);
        table.addCell(valueCell);
    }

    private void addHeaderCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, headerFont()));
        cell.setBackgroundColor(BRAND_COLOR);
        cell.setPadding(6f);
        table.addCell(cell);
    }

    private void addCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, bodyFont()));
        cell.setPadding(5f);
        table.addCell(cell);
    }

    private Paragraph sectionTitle(String text) {
        Paragraph paragraph = new Paragraph(text, sectionFont());
        paragraph.setSpacingBefore(4f);
        return paragraph;
    }

    private void addSpacing(Document document) throws DocumentException {
        document.add(new Paragraph(" ", bodyFont()));
    }

    private String format(BigDecimal value) {
        return value != null ? numberFormat.format(value) : "-";
    }

    private String safe(String value) {
        return value != null ? value : "-";
    }

    private String scoreLabel(String scoreName) {
        if (scoreName == null) {
            return "-";
        }
        return scoreLabel(CapacityScore.valueOf(scoreName));
    }

    private String scoreLabel(CapacityScore score) {
        if (score == null) {
            return "-";
        }
        return score.name()
                .replace("_PLUS", "+")
                .replace("_MINUS", "-");
    }

    private String coolingLabel(CoolingType coolingType) {
        if (coolingType == null) {
            return "-";
        }
        return switch (coolingType) {
            case AIR -> "Aire";
            case HYBRID -> "Híbrido";
            case LIQUID -> "Líquido";
            case IMMERSION -> "Inmersión";
        };
    }

    private String layerLabel(LayerType layerType) {
        if (layerType == null) {
            return "-";
        }
        return switch (layerType) {
            case FACILITY -> "Facility";
            case IT -> "IT";
            case WORKLOAD -> "Workload";
        };
    }

    private String scenarioLabel(ScenarioItemResponse scenario) {
        if (scenario.type() == ScenarioType.CURRENT_STATE) {
            return "Estado actual";
        }
        return safe(scenario.name());
    }

    /*
     * ============================================================
     * FONTS
     * ============================================================
     */

    private Font titleFont() {
        return FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BRAND_COLOR);
    }

    private Font subtitleFont() {
        return FontFactory.getFont(FontFactory.HELVETICA, 14, TEXT_GRAY);
    }

    private Font metaFont() {
        return FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 9, TEXT_GRAY);
    }

    private Font sectionFont() {
        return FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BRAND_COLOR);
    }

    private Font headerFont() {
        return FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE);
    }

    private Font boldFont() {
        return FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
    }

    private Font bodyFont() {
        return FontFactory.getFont(FontFactory.HELVETICA, 10);
    }
}
