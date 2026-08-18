package com.physaflow.server.application.controller;

import com.physaflow.server.domain.service.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Report", description = "Endpoints for assessment PDF reports")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/assessments/{assessmentId}/report/pdf")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Download assessment PDF report",
            description = "Generates and downloads the PDF report of an assessment result on the fly. Requires authentication and ownership of the assessment.")
    public ResponseEntity<byte[]> downloadAssessmentReportPdf(
            @PathVariable UUID assessmentId) {

        log.info("Received GET request for PDF report of assessment ID: {}", assessmentId);

        byte[] pdf = reportService.generateAssessmentReportPdf(assessmentId);

        return pdfResponse(pdf, "physaflow-report-" + assessmentId + ".pdf");
    }

    @GetMapping("/public/shares/{token}/report/pdf")
    @Operation(summary = "Download public share PDF report",
            description = "Generates and downloads the PDF report of a shared assessment via its public token without authentication.")
    public ResponseEntity<byte[]> downloadPublicShareReportPdf(
            @PathVariable String token) {

        log.info("Received GET request for public share PDF report.");

        byte[] pdf = reportService.generatePublicShareReportPdf(token);

        return pdfResponse(pdf, "physaflow-shared-report.pdf");
    }

    private ResponseEntity<byte[]> pdfResponse(byte[] pdf, String filename) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdf.length)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline().filename(filename).build().toString())
                .body(pdf);
    }
}
