package org.example.controller;

import org.example.model.Transaction;
import org.example.repository.TransactionRepository;
import org.example.service.FraudDetectionService;
import org.example.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final FraudDetectionService fraudService;
    private final TransactionRepository repository;

    public TransactionController(TransactionService transactionService,
                                 FraudDetectionService fraudService,
                                 TransactionRepository repository) {
        this.transactionService = transactionService;
        this.fraudService = fraudService;
        this.repository = repository;
    }

    //  GENERATE TRANSACTIONS

    @PostMapping("/generate")
    public Transaction generate() {
        Transaction t = transactionService.generateTransaction();
        return fraudService.evaluateTransaction(t);
    }

    @PostMapping("/generate/{count}")
    public List<Transaction> generateMany(@PathVariable int count) {
        List<Transaction> list = transactionService.generateMultiple(count);
        list.forEach(fraudService::evaluateTransaction);
        return list;
    }

    //  FETCH TRANSACTIONS 

    @GetMapping("/all")
    public List<Transaction> getAll() {
        return repository.findAll();
    }

    // STATUS-WISE APIs

    // SUCCESS transactions
    @GetMapping("/status/success")
    public List<Transaction> getSuccessTransactions() {
        return repository.findByStatus("SUCCESS");
    }

    // PROCESSING transactions
    @GetMapping("/status/processing")
    public List<Transaction> getProcessingTransactions() {
        return repository.findByStatus("PROCESSING");
    }

    // FAILED transactions
    @GetMapping("/status/failed")
    public List<Transaction> getFailedTransactions() {
        return repository.findByStatus("FAILED");
    }
}
