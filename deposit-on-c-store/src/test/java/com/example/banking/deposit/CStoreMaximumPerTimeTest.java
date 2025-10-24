package com.example.banking.deposit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CStoreMaximumPerTimeTest {
    @Test
    void ฝากน้อยกว่า_30000_ต้องสามารถฝากได้() {
        int depositAmount = 29900;
        boolean expectedResult = true;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerTime(depositAmount);

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void ฝากเท่ากับ_30000_ต้องสามารถฝากได้() {
        int depositAmount = 30000;
        boolean expectedResult = true;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerTime(depositAmount);

        assertEquals(expectedResult, actualResult);
    }

    @Test
    void ฝากมากกว่า_30000_ต้องไม่สามารถฝากได้() {
        int depositAmount = 30100;
        boolean expectedResult = false;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerTime(depositAmount);

        assertEquals(expectedResult, actualResult);
    }
}
