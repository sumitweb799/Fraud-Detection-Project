package org.example.service;

import org.example.model.Transaction;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TransactionService {

    static Random random = new Random();

    static String[] types = {"UPI", "CARD", "ATM"};
    static String[] channels = {"MOBILE", "WEB", "ATM"};
    static String[] locations = {"Kolkata", "Delhi", "Mumbai", "Bangalore"};

    static List<String> accounts = new ArrayList<>();
    static Map<String, Double> balances = new HashMap<>();
    static Map<String, Double> holdBalances = new HashMap<>();

    static {
        for (int i = 1; i <= 10; i++) {
            String acc = "ACC" + (1000 + i);
            accounts.add(acc);
            balances.put(acc, 4000.0 + random.nextInt(6000));
            holdBalances.put(acc, 0.0);
        }
    }

    public Transaction generateTransaction() {

        Transaction t = new Transaction();

        t.setTransactionId(UUID.randomUUID().toString());
        t.setTimestamp(LocalDateTime.now());
        t.setType(types[random.nextInt(types.length)]);
        t.setChannel(channels[random.nextInt(channels.length)]);

        Collections.shuffle(accounts);
        t.setSender(accounts.get(0));
        t.setReceiver(accounts.get(1));

        double r = random.nextDouble();
        if (r < 0.5) t.setAmount(100 + random.nextDouble() * 2400);
        else if (r < 0.8) t.setAmount(2500 + random.nextDouble() * 3500);
        else t.setAmount(6000 + random.nextDouble() * 3000);

        t.setIpAddress("192.168.1." + random.nextInt(255));
        t.setLocation(locations[random.nextInt(locations.length)]);
        t.setEmail("mondaldebanjan471@gmail.com");

        applyStatusRulesWithReconciliation(t);
        return t;
    }

    public List<Transaction> generateMultiple(int count) {
        List<Transaction> list = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            list.add(generateTransaction());
        }
        return list;
    }

    private void applyStatusRulesWithReconciliation(Transaction t) {

        double senderBefore = balances.get(t.getSender());
        double receiverBefore = balances.get(t.getReceiver());
        int hour = t.getTimestamp().getHour();

        if (t.getSender().equals(t.getReceiver())) {
            t.setStatus("FAILED");
            return;
        }

        if (senderBefore < t.getAmount()) {
            t.setStatus("FAILED");
            return;
        }

        if (t.getAmount() > 8500) {
            t.setStatus("FAILED");
            return;
        }

        if ((t.getAmount() >= 2500 && t.getAmount() <= 6000) ||
                ("ATM".equals(t.getChannel()) && t.getAmount() >= 2000) ||
                (hour >= 0 && hour <= 5 && t.getAmount() >= 2000)) {

            debitAndHold(t);
            t.setStatus("PROCESSING");

        } else {
            balances.put(t.getSender(), senderBefore - t.getAmount());
            balances.put(t.getReceiver(), receiverBefore + t.getAmount());
            t.setStatus("SUCCESS");
        }

        double senderAfter = balances.get(t.getSender());
        double receiverAfter = balances.get(t.getReceiver());
        double holdAmount = holdBalances.get(t.getSender());

        if (senderAfter < senderBefore && receiverAfter == receiverBefore) {
            t.setStatus("PROCESSING");
        }

        if (holdAmount > 0 && "SUCCESS".equals(t.getStatus())) {
            t.setStatus("PROCESSING");
        }
    }

    private void debitAndHold(Transaction t) {
        balances.put(t.getSender(), balances.get(t.getSender()) - t.getAmount());
        holdBalances.put(t.getSender(), holdBalances.get(t.getSender()) + t.getAmount());
    }
}
