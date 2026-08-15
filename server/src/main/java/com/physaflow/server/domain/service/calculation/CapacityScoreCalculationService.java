package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.enums.CapacityScore;
import com.physaflow.server.domain.model.enums.CapacityTier;
import com.physaflow.server.domain.model.types.CapacityScoreResult;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class CapacityScoreCalculationService {

    private static final BigDecimal TEN = new BigDecimal("10");
    private static final BigDecimal TWENTY = new BigDecimal("20");
    private static final BigDecimal THIRTY = new BigDecimal("30");
    private static final BigDecimal FORTY = new BigDecimal("40");
    private static final BigDecimal FIFTY = new BigDecimal("50");
    private static final BigDecimal SIXTY = new BigDecimal("60");
    private static final BigDecimal SEVENTY = new BigDecimal("70");
    private static final BigDecimal EIGHTY = new BigDecimal("80");
    private static final BigDecimal NINETY = new BigDecimal("90");
    private static final BigDecimal HUNDRED = new BigDecimal("100");

    public CapacityScoreResult calculateScore(
            BigDecimal strandedPercent
    ) {

        validate(strandedPercent);

        if (strandedPercent.compareTo(TEN) <= 0) {
            return result(
                    CapacityScore.A_PLUS,
                    CapacityTier.EXCELLENT
            );
        }

        if (strandedPercent.compareTo(TWENTY) <= 0) {
            return result(
                    CapacityScore.A,
                    CapacityTier.EXCELLENT
            );
        }

        if (strandedPercent.compareTo(THIRTY) <= 0) {
            return result(
                    CapacityScore.A_MINUS,
                    CapacityTier.EXCELLENT
            );
        }

        if (strandedPercent.compareTo(FORTY) <= 0) {
            return result(
                    CapacityScore.B_PLUS,
                    CapacityTier.GOOD
            );
        }

        if (strandedPercent.compareTo(FIFTY) <= 0) {
            return result(
                    CapacityScore.B,
                    CapacityTier.GOOD
            );
        }

        if (strandedPercent.compareTo(SIXTY) <= 0) {
            return result(
                    CapacityScore.B_MINUS,
                    CapacityTier.MODERATE
            );
        }

        if (strandedPercent.compareTo(SEVENTY) <= 0) {
            return result(
                    CapacityScore.C_PLUS,
                    CapacityTier.MODERATE
            );
        }

        if (strandedPercent.compareTo(EIGHTY) <= 0) {
            return result(
                    CapacityScore.C,
                    CapacityTier.DEFICIENT
            );
        }

        if (strandedPercent.compareTo(NINETY) <= 0) {
            return result(
                    CapacityScore.D,
                    CapacityTier.DEFICIENT
            );
        }

        return result(
                CapacityScore.F,
                CapacityTier.CRITICAL
        );
    }

    private CapacityScoreResult result(
            CapacityScore score,
            CapacityTier tier
    ) {
        return new CapacityScoreResult(score, tier);
    }

    private void validate(BigDecimal strandedPercent) {

        if (strandedPercent == null) {
            throw new IllegalArgumentException(
                    "Stranded percentage cannot be null."
            );
        }

        if (strandedPercent.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException(
                    "Stranded percentage cannot be negative."
            );
        }

        if (strandedPercent.compareTo(HUNDRED) > 0) {
            throw new IllegalArgumentException(
                    "Stranded percentage cannot exceed 100%."
            );
        }
    }
}
