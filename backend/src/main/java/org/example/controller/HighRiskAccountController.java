package org.example.controller;

import org.example.model.HighRiskAccount;
import org.example.service.HighRiskAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/high-risk")
public class HighRiskAccountController {

    private final HighRiskAccountService service;

    public HighRiskAccountController(HighRiskAccountService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public HighRiskAccount add(@RequestBody HighRiskAccount account) {
        return service.addAccount(account);
    }

    @DeleteMapping("/remove/{accountNumber}")
    public void remove(@PathVariable String accountNumber) {
        service.removeAccount(accountNumber);
    }

    @GetMapping("/all")
    public List<HighRiskAccount> getAll() {
        return service.getAll();
    }
}
