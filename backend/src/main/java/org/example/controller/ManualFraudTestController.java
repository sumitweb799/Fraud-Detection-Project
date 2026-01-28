package org.example.controller;

import org.example.dto.ManualTransactionRequest;
import org.example.model.Transaction;
import org.example.service.FraudDetectionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fraud")
@CrossOrigin
public class ManualFraudTestController {

    private final FraudDetectionService fraudService;

    public ManualFraudTestController(FraudDetectionService fraudService) {
        this.fraudService = fraudService;
    }

    @PostMapping("/manual-test")
    public Transaction manualFraudTest(
            @RequestBody ManualTransactionRequest request) {

        return fraudService.evaluateManualTransaction(request);
    }
}
