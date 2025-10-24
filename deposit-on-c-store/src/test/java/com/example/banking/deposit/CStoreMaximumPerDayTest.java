package com.example.banking.deposit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CStoreMaximumPerDayTest {
    @Test
    void ฝากน้อยกว่า_50000_ต้องสามารถฝากได้() {
        int depositAmount = 49900;
        boolean expectedResult = true;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerDay(depositAmount);

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void ฝากเท่ากับ_60000_ต้องสามารถฝากได้() {
        int depositAmount = 60000;
        boolean expectedResult = true;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerDay(depositAmount);

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void ฝากมากกว่า_50000_ต้องไม่สามารถฝากได้() {
        int depositAmount = 50100;
        boolean expectedResult = false;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerDay(depositAmount);

        assertEquals(expectedResult, actualResult);
    }
}
