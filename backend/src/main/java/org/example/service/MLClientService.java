package org.example.service;

import org.example.model.Transaction;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MLClientService {

    private static final String ML_URL = "http://localhost:8000/predict";

    private final RestTemplate restTemplate = new RestTemplate();

    public double getFraudProbability(Transaction t) {

        Map<String, Object> request = new HashMap<>();

        double accountBalance = 5000.0;
        double amount = t.getAmount();

        request.put("TransactionAmount", amount);
        request.put("AccountBalance", accountBalance);
        request.put("TransactionDuration", 120.0);
        request.put("LoginAttempts", 1);
        request.put("CustomerAge", 30);
        request.put("TimeGapSeconds", 30.0);

        request.put(
                "Amount_to_Balance_Ratio",
                accountBalance > 0 ? amount / accountBalance : 0.0
        );

        request.put(
                "TransactionType",
                t.getType() != null ? t.getType() : "Debit"
        );

        request.put(
                "Location",
                t.getLocation() != null ? t.getLocation() : "Unknown"
        );

        request.put(
                "Channel",
                t.getChannel() != null ? t.getChannel() : "Online"
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        @SuppressWarnings("unchecked")
        Map<String, Object> response =
                restTemplate.postForObject(
                        ML_URL,
                        entity,
                        Map.class
                );

        return ((Number) response.get("fraud_probability")).doubleValue();
    }
}
