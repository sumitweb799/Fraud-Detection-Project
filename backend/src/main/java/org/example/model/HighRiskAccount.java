package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class HighRiskAccount {

    @Id
    private String accountNumber;
    private String reason;
}
