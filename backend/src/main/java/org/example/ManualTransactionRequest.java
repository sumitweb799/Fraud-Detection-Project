package org.example.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ManualTransactionRequest {

    private String sender;
    private String receiver;
    private double amount;
    private String channel;
    private String location;
    private String ipAddress;
    private String status;
    private LocalDateTime timestamp;
}
