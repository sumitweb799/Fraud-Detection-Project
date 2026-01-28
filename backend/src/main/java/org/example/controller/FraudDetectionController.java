package org.example.controller;

import org.example.model.Transaction;
import org.example.service.FraudDetectionService;
import org.example.service.TransactionPdfService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/fraud")
public class FraudDetectionController {

    private final FraudDetectionService fraudService;
    private final TransactionPdfService pdfService;

    public FraudDetectionController(FraudDetectionService fraudService,
                                    TransactionPdfService pdfService) {
        this.fraudService = fraudService;
        this.pdfService = pdfService;
    }

    @GetMapping("/alerts")
    public List<Transaction> getAlerts() {
        return fraudService.getAlerts();
    }

    @GetMapping("/alerts/unread")
    public List<Transaction> getUnreadAlerts() {
        return fraudService.getUnreadAlerts();
    }


    @GetMapping("/alerts/unread-count")
    public long unreadCount() {
        return fraudService.getUnreadAlertCount();
    }

    @PutMapping("/alerts/mark-read")
    public void markRead() {
        fraudService.markAllAlertsRead();
    }

    @PutMapping("/resolve/{id}")
    public Transaction resolve(@PathVariable String id,
                               @RequestParam String note) {
        return fraudService.resolveFraudAlert(id, note);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> download(@PathVariable String id)
            throws Exception {

        Transaction t = fraudService.getTransactionScore(id);
        ByteArrayInputStream pdf = pdfService.generate(t);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=transaction_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.readAllBytes());
    }
}
