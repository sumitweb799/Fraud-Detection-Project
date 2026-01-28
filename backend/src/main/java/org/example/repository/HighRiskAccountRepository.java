package org.example.repository;

import org.example.model.HighRiskAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HighRiskAccountRepository
        extends JpaRepository<HighRiskAccount, String> {
}
