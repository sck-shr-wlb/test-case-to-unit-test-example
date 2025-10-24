package com.example.banking.deposit;

import java.math.BigDecimal;

public class DepositeFee {

    private BigDecimal bankingFree = BigDecimal.ZERO;
    private BigDecimal transactionFee = BigDecimal.ZERO;

    public DepositeFee(int bankingFree, int transactionFee) {
        this.bankingFree = BigDecimal.valueOf(bankingFree);
        this.transactionFee = BigDecimal.valueOf(transactionFee);
    }

    public BigDecimal getBankingFree() {
        return bankingFree;
    }

    public BigDecimal getTransactionFee() {
        return transactionFee;
    }

    public BigDecimal totalFee() {
        return bankingFree.add(transactionFee);
    }

}
