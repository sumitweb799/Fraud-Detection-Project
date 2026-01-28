package org.example.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.example.model.Transaction;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class TransactionPdfService {

    public ByteArrayInputStream generate(Transaction t) {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("Transaction Report", titleFont));
            document.add(new Paragraph(" "));

            addLine(document, "Transaction ID", t.getTransactionId(), textFont);
            addLine(document, "Timestamp", String.valueOf(t.getTimestamp()), textFont);
            addLine(document, "Sender", t.getSender(), textFont);
            addLine(document, "Receiver", t.getReceiver(), textFont);
            addLine(document, "Amount", String.valueOf(t.getAmount()), textFont);
            addLine(document, "Status", t.getStatus(), textFont);
            addLine(document, "Location", t.getLocation(), textFont);
            addLine(document, "IP Address", t.getIpAddress(), textFont);
            addLine(document, "Fraud Score", String.valueOf(t.getFraudScore()), textFont);
            addLine(document, "Fraud Alert", t.isAlert() ? "YES" : "NO", textFont);
            addLine(document, "Fraud Reason", t.getFraudReasons(), textFont);

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addLine(Document doc, String key, String value, Font font)
            throws DocumentException {

        Paragraph p = new Paragraph(key + ": " + value, font);
        p.setSpacingAfter(8f);
        doc.add(p);
    }
}
