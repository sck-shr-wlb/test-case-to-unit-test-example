package com.example.banking.deposit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class CStoreFeeCalculationTest {
    @Test
    void อายุน้อยกว่า_15_ปี_ไม่สามารถฝากได้() {
        // Arrange
        String transactionDate = "2025-06-18";
        String birthDate = "2010-06-19";
        CStoreDepositLogic validator = new CStoreDepositLogic();
        
        // Act & Assert
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            validator.calculateFee(birthDate, transactionDate);
        });
    }

    @Test
    void อายุ_15_ปี_บริบูรณ์_ค่าธรรมเนียม_0_บาท() {
        // Arrange
        String transactionDate = "2025-06-18";
        String birthDate = "2010-06-18";
        BigDecimal expectedResult = BigDecimal.ZERO;
        CStoreDepositLogic validator = new CStoreDepositLogic();

        // Act
        DepositeFee actualResult = validator.calculateFee(birthDate, transactionDate);

        // Assert
        assertEquals(expectedResult, actualResult.totalFee());
    }

    @Test
    void อายุ_15_ปี_กับ_1_วัน_ค่าธรรมเนียม_0_บาท() {
        String transactionDate = "2025-06-18";
        String birthDate = "2010-06-17";
        BigDecimal expectedResult = BigDecimal.ZERO;
        CStoreDepositLogic validator = new CStoreDepositLogic();

        DepositeFee actualResult = validator.calculateFee(birthDate, transactionDate);

        assertEquals(expectedResult, actualResult.totalFee());
    }

    @Test
    void อายุ_19_ปี_11_เดือน_30_วัน_ค่าธรรมเนียม_0_บาท() {
        String transactionDate = "2025-06-18";
        String birthDate = "2005-06-19";
        BigDecimal expectedResult = BigDecimal.ZERO;
        CStoreDepositLogic validator = new CStoreDepositLogic();

        DepositeFee actualResult = validator.calculateFee(birthDate, transactionDate);

        assertEquals(expectedResult, actualResult.totalFee());
    }

    @Test
    void อายุ_20_ปี_บริบูรณ์_ค่าธรรมเนียม_0_บาท() {
        String transactionDate = "2025-06-18";
        String birthDate = "2005-06-18";
        BigDecimal expectedResult = BigDecimal.ZERO;
        CStoreDepositLogic validator = new CStoreDepositLogic();

        DepositeFee actualResult = validator.calculateFee(birthDate, transactionDate);

        assertEquals(expectedResult, actualResult.totalFee());
    }

    @Test
    void อายุ_20_ปี_กับ_1_วัน_ค่าธรรมเนียม_12_บาท() {
        String transactionDate = "2025-06-18";
        String birthDate = "2005-06-17";
        DepositeFee expectedResult = new DepositeFee(8, 4);
        CStoreDepositLogic validator = new CStoreDepositLogic();

        DepositeFee actualResult = validator.calculateFee(birthDate, transactionDate);

        assertEquals(expectedResult.totalFee(), actualResult.totalFee());
        assertEquals(expectedResult.getBankingFree(), actualResult.getBankingFree());
        assertEquals(expectedResult.getTransactionFee(), actualResult.getTransactionFee());
    }

}
