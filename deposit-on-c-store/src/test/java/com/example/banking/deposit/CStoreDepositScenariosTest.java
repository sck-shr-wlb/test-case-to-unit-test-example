package com.example.banking.deposit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CStoreDepositScenariosTest {
    @Test
    void ไม่เกินยอดต่อครั้ง_ไม่เกินยอดต่อวัน_ไม่เสียค่าธรรมเนียม_บัญชีหลักออมทรัพย์ () {
        int depositAmount = 500;
        boolean expectedResult = true;
        CStoreDepositLogic deposit = new CStoreDepositLogic();

        boolean actualResult = deposit.overMaxmumPerDay(depositAmount);

        assertEquals(expectedResult, actualResult);
    }
}