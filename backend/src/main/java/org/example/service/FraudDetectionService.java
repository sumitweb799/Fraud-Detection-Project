package org.example.service;

import org.example.dto.ManualTransactionRequest;
import org.example.model.Transaction;
import org.example.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;
    private final HighRiskAccountService highRiskService;
    private final MLClientService mlClientService;
    private final EmailService emailService;


    public FraudDetectionService(TransactionRepository transactionRepository,
                                 HighRiskAccountService highRiskService,
                                 MLClientService mlClientService,
                                 EmailService emailService) {
        this.transactionRepository = transactionRepository;
        this.highRiskService = highRiskService;
        this.mlClientService = mlClientService;
        this.emailService = emailService;
    }

    // AUTO TRANSACTION
    public Transaction evaluateTransaction(Transaction t) {

        List<Transaction> history =
                transactionRepository.findBySenderOrderByTimestampDesc(t.getSender());

        double ruleScore = 0;
        List<String> reasons = new ArrayList<>();

        // Rule 1: High amount
        if (t.getAmount() > 4000) {
            ruleScore += 35;
            reasons.add("High transaction amount");
        }

        // Rule 2: Multiple failed transactions
        long failedCount = history.stream()
                .filter(tx -> "FAILED".equals(tx.getStatus()))
                .count();

        if (failedCount >= 3) {
            ruleScore += 30;
            reasons.add("Multiple failed transactions");
        }

        // Rule 3: Behaviour-based checks
        if (!history.isEmpty()) {
            Transaction last = history.get(0);
            long seconds = Duration.between(last.getTimestamp(), t.getTimestamp()).getSeconds();

            if (!last.getLocation().equals(t.getLocation()) && seconds <= 60) {
                ruleScore += 15;
                reasons.add("Impossible location change");
            }

            if (seconds <= 12) {
                ruleScore += 20;
                reasons.add("Rapid transactions");
            }

            if (!last.getIpAddress().equals(t.getIpAddress()) && seconds <= 60) {
                ruleScore += 15;
                reasons.add("IP address changed");
            }
        }

        // Rule 4: Night transaction
        int hour = t.getTimestamp().getHour();
        if (hour >= 0 && hour <= 5) {
            ruleScore += 10;
            reasons.add("Night transaction");
        }

        // Rule 5: High-risk account
        if (highRiskService.isHighRisk(t.getSender())) {
            ruleScore += 20;
            reasons.add("High-risk sender");
        }

        ruleScore = Math.min(ruleScore, 100);

        // ===================== ML SCORE =====================
        double mlScore;
        try {
            mlScore = mlClientService.getFraudProbability(t);
        } catch (Exception e) {
            mlScore = 0;
            reasons.add("ML unavailable");
        }

        double finalScore = (0.6 * ruleScore) + (0.4 * mlScore * 100);

        //  SET FLAGS
        t.setFraudScore(finalScore);
        t.setAlert(finalScore >= 65);
        t.setResolved(false);
        t.setReadFlag(false);

        t.setFraudReasons(
                reasons.isEmpty()
                        ? "No fraud indicators"
                        : String.join(", ", reasons)
        );


        Transaction saved = transactionRepository.save(t);


        if (saved.isAlert()) {
            try {
                emailService.sendFraudAlert(saved);
            } catch (Exception e) {
                // ❗ Email failure must NOT break API
                System.out.println("Email sending failed: " + e.getMessage());
            }
        }

        return saved;
    }

    // MANUAL TRANSACTION
    public Transaction evaluateManualTransaction(ManualTransactionRequest req) {

        Transaction t = new Transaction();
        t.setTransactionId("MANUAL-" + System.currentTimeMillis());
        t.setSender(req.getSender());
        t.setReceiver(req.getReceiver());
        t.setAmount(req.getAmount());
        t.setChannel(req.getChannel());
        t.setLocation(req.getLocation());
        t.setIpAddress(req.getIpAddress());
        t.setEmail("mdebanjan947@gmail.com"); // same email
        t.setTimestamp(req.getTimestamp() != null ? req.getTimestamp() : LocalDateTime.now());
        t.setStatus(req.getStatus() != null ? req.getStatus() : "MANUAL_TEST");

        return evaluateTransaction(t);
    }

    // ALERT APIs
    public List<Transaction> getAlerts() {
        return transactionRepository.findByAlertTrueAndResolvedFalse();
    }

    public List<Transaction> getUnreadAlerts() {
        return transactionRepository
                .findByAlertTrueAndResolvedFalseAndReadFlagFalse();
    }


    public long getUnreadAlertCount() {
        return transactionRepository
                .countByAlertTrueAndResolvedFalseAndReadFlagFalse();
    }

    public void markAllAlertsRead() {
        List<Transaction> alerts =
                transactionRepository.findByAlertTrueAndResolvedFalse();
        alerts.forEach(t -> t.setReadFlag(true));
        transactionRepository.saveAll(alerts);
    }

    public Transaction resolveFraudAlert(String id, String note) {

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        tx.setAlert(false);
        tx.setResolved(true);
        tx.setReadFlag(true);
        tx.setFraudScore(0);
        tx.setResolutionNote(note);

        return transactionRepository.save(tx);
    }

    public Transaction getTransactionScore(String id) {
        return transactionRepository.findById(id).orElse(null);
    }
}
