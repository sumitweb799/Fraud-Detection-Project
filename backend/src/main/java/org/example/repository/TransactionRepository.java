package org.example.repository;

import org.example.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, String> {

    List<Transaction> findBySenderOrderByTimestampDesc(String sender);

    List<Transaction> findByStatus(String status);

    List<Transaction> findByAlertTrueAndResolvedFalse();

    //Unread alerts count
    long countByAlertTrueAndResolvedFalseAndReadFlagFalse();

    // Unread alerts list
    List<Transaction> findByAlertTrueAndResolvedFalseAndReadFlagFalse();
}
