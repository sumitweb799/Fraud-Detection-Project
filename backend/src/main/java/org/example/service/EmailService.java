package org.example.service;

import org.example.model.Transaction;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFraudAlert(Transaction t) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mdebanjan947@gmail.com");
        message.setTo(t.getEmail());
        message.setSubject("🚨 FRAUD ALERT DETECTED");
        message.setText(
                "Transaction ID: " + t.getTransactionId() + "\n" +
                        "Amount: ₹" + t.getAmount() + "\n" +
                        "Sender: " + t.getSender() + "\n" +
                        "Fraud Score: " + t.getFraudScore() + "\n\n" +
                        "Reasons:\n" + t.getFraudReasons()
        );

        mailSender.send(message);
    }
}
