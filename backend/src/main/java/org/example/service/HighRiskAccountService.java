package org.example.service;

import org.example.model.HighRiskAccount;
import org.example.repository.HighRiskAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HighRiskAccountService {

    private final HighRiskAccountRepository repository;

    public HighRiskAccountService(HighRiskAccountRepository repository) {
        this.repository = repository;
    }

    public HighRiskAccount addAccount(HighRiskAccount account) {
        return repository.save(account);
    }

    public void removeAccount(String accountNumber) {
        repository.deleteById(accountNumber);
    }

    public boolean isHighRisk(String accountNumber) {
        return repository.existsById(accountNumber);
    }

    public List<HighRiskAccount> getAll() {
        return repository.findAll();
    }
}
