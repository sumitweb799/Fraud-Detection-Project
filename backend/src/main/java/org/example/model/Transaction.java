package org.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Transaction {

    @Id
    private String transactionId;

    private LocalDateTime timestamp;

    private String type;
    private String channel;

    private String sender;
    private String receiver;

    private double amount;

    private String status;

    private String ipAddress;
    private String location;

    // Fraud detection
    private double fraudScore;
    private boolean alert;
    private String fraudReasons;


    @Column(name = "is_read")
    private boolean readFlag;
    @Column(nullable = false)
    private String email;


    // Fraud resolution
    private boolean resolved;
    private String resolutionNote;
}
