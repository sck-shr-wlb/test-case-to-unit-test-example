package com.example.banking.deposit;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class CStoreDepositLogic {

    private static final int MAXIMUM_DEPOSIT_PER_DAY = 50000;
    private static final int MAXIMUM_DEPOSIT_PER_TIME = 30000;

    protected boolean overMaxmumPerTime(int depositAmount) {
        return depositAmount <= MAXIMUM_DEPOSIT_PER_TIME;
    }

    protected boolean overMaxmumPerDay(int depositAmount) {
        return depositAmount <= MAXIMUM_DEPOSIT_PER_DAY;
    }

    public DepositeFee calculateFee(String birthDateString, String transactionDateString) {
        LocalDate birthDate = LocalDate.parse(birthDateString, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate transactionDate = LocalDate.parse(transactionDateString, DateTimeFormatter.ISO_LOCAL_DATE);

        Period period = Period.between(birthDate, transactionDate);
        System.out.println(period.getYears() + " ปี " + period.getMonths() + " เดือน " + period.getDays() + " วัน");
        if (period.getYears() < 15) {
            throw new IllegalArgumentException("ผู้มีอายุน้อยกว่า 15 ปี ไม่สามารถทำรายการฝากเงินได้");
        } else if (period.getYears() >= 15 && period.getYears() <= 20) {
            return new DepositeFee(0, 0);
        } else {
            return new DepositeFee(8, 4);
        }
    }

}
