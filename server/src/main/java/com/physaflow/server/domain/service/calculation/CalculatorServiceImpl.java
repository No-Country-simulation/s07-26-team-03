package com.physaflow.server.domain.service.calculation;

/*
 * =====================================================================
 * TEMPORARILY DISABLED — referencias a Calculation y CalculationRepository.
 *
 * La lógica de negocio (factores de eficiencia, capacidad varada,
 * desperdicio financiero) se preserva como referencia. Se restaurará
 * cuando se implemente el motor contra Assessment + AssessmentResult.
 * =====================================================================
 *
 * import com.physaflow.server.domain.command.AssessmentCommand;
 * import com.physaflow.server.domain.model.Calculation;
 * import com.physaflow.server.infrastructure.repository.CalculationRepository;
 * import lombok.RequiredArgsConstructor;
 * import lombok.extern.slf4j.Slf4j;
 * import org.springframework.stereotype.Service;
 * import org.springframework.transaction.annotation.Isolation;
 * import org.springframework.transaction.annotation.Propagation;
 * import org.springframework.transaction.annotation.Transactional;
 *
 * import java.math.BigDecimal;
 * import java.math.RoundingMode;
 * import java.security.SecureRandom;
 * import java.util.Base64;
 *
 * @Slf4j
 * @Service
 * @RequiredArgsConstructor
 * public class CalculatorServiceImpl implements CalculatorService {
 *
 *     private final CalculationRepository calculationRepository;
 *     private static final SecureRandom SECURE_RANDOM = new SecureRandom();
 *     private static final BigDecimal HOURS_PER_YEAR = new BigDecimal("8760");
 *     private static final BigDecimal HUNDRED = new BigDecimal("100");
 *     private static final BigDecimal TARIFF_USD_PER_MWH = new BigDecimal("70.00");
 *     private static final BigDecimal HIGH_WASTE_MULTIPLIER = new BigDecimal("1.15");
 *
 *     @Override
 *     @Transactional(...)
 *     public Calculation processInitialAssessment(AssessmentCommand command) {
 *         // ... lógica original preservada
 *     }
 * }
 */
class CalculatorServiceImplPlaceholder {}
