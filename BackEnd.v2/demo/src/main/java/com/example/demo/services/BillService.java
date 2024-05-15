package com.example.demo.services;

import com.example.demo.Dto.BillDto;
import com.example.demo.Dto.DevisDto;
import com.example.demo.convert.BillDtoConverter;
import com.example.demo.models.Bill;
import com.example.demo.models.Devis;
import com.example.demo.repositorys.BillRepository;
import com.example.demo.repositorys.DevisRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final BillDtoConverter billDtoConverter;
    private final DevisRepository devisRepository;

    public BillDto getBillByConstruction(UUID id) throws Exception {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isPresent()) {
            return this.billDtoConverter.BillToDto(bill.get());
        } else
            throw new Exception("Bill not found");
    }

    public ResponseEntity<String> saveBill(BillDto billDto) {
        Bill bill = this.billDtoConverter.DtoToBill(billDto);
        this.billRepository.save(bill);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateBill(BillDto billDto) {
        Bill bill = this.billDtoConverter.DtoToBill(billDto);
        this.billRepository.save(bill);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteBill(UUID id) {
        this.billRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

    public byte[] printBill(BillDto billDto) throws DocumentException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        Optional<Devis> devis = devisRepository.findById(billDto.getConstructionDto().getDevisDto().getIdDevis());
        PdfWriter.getInstance(document, baos);
        Paragraph title = new Paragraph("Facture", FontFactory.getFont(FontFactory.COURIER_OBLIQUE, 22));
        Paragraph space = new Paragraph("                    ", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
//        Paragraph client = new Paragraph("client : " + devis.get().getDevisRequest().getFirstName() + " " + billDto.getConstruction().getDevis().getDevisRequest().getLastName(), FontFactory.getFont(FontFactory.HELVETICA, 16));
        Paragraph reference = new Paragraph("ref facture : " + billDto.getRef(), FontFactory.getFont(FontFactory.HELVETICA, 16));
        title.setAlignment(Element.ALIGN_CENTER);
        space.setAlignment(Element.ALIGN_CENTER);
//        client.setAlignment(Element.ALIGN_LEFT);
        reference.setAlignment(Element.ALIGN_LEFT);
        document.open();
        PdfPTable table = new PdfPTable(5);
        addTableHeader(table);
        addRows(table, devis.get());
        float[] columnWidths = {2f, 1f, 1.5f, 1f, 2f};
        table.setWidths(columnWidths);
        document.add(title);
        document.add(space);
//        document.add(client);
        document.add(reference);
        document.add(space);
        document.add(table);
        document.close();
        return baos.toByteArray();
    }

    private void addTableHeader(PdfPTable table) {
        Stream.of("materielles facturé", "quantité facturé", "prix", "tva", "total")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(1);
                    header.setPadding(6);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    private void addRows(PdfPTable table, Devis devis) {
        //Add solar planel
        Stream.of(devis.getSolarPanel().getModelSolarPanel(),
                        String.valueOf(devis.getSolarPanel().getQuantitySolarPanel()),
                        String.valueOf(devis.getSolarPanel().getPriceSolarPanel()),
                        String.valueOf(devis.getSolarPanel().getTvaSolarPanel()),
                        String.valueOf(devis.getSolarPanel().getTotalSolarPanel())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add inverter
        Stream.of(devis.getInverter().getModelInverter(),
                        String.valueOf(devis.getInverter().getQuantityInverter()),
                        String.valueOf(devis.getInverter().getPriceInverter()),
                        String.valueOf(devis.getInverter().getTvaInverter()),
                        String.valueOf(devis.getInverter().getTotalInverter())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add systemFixing
        Stream.of(devis.getSystemFixing().getModelSystemFixing(),
                        String.valueOf(devis.getSystemFixing().getQuantitySystemFixing()),
                        String.valueOf(devis.getSystemFixing().getPriceSystemFixing()),
                        String.valueOf(devis.getSystemFixing().getTvaSystemFixing()),
                        String.valueOf(devis.getSystemFixing().getTotalSystemFixing())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add battery
        Stream.of(devis.getBattery().getModelBattery(),
                        String.valueOf(devis.getBattery().getQuantityBattery()),
                        String.valueOf(devis.getBattery().getPriceBattery()),
                        String.valueOf(devis.getBattery().getTvaBattery()),
                        String.valueOf(devis.getBattery().getTotalBattery())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add cable
        Stream.of(devis.getCable().getModelCable(),
                        String.valueOf(devis.getCable().getQuantityCable()),
                        String.valueOf(devis.getCable().getPriceCable()),
                        String.valueOf(devis.getCable().getTvaCable()),
                        String.valueOf(devis.getCable().getTotalCable())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add meter
        Stream.of(devis.getMeter().getModelMeter(),
                        String.valueOf(devis.getMeter().getQuantityMeter()),
                        String.valueOf(devis.getMeter().getPriceMeter()),
                        String.valueOf(devis.getMeter().getTvaMeter()),
                        String.valueOf(devis.getMeter().getTotalMeter())
                )
                .forEach(columnTitle -> {
                    PdfPCell cell = new PdfPCell();
                    cell.setBackgroundColor(BaseColor.WHITE);
                    cell.setBorderWidth(1);
                    cell.setPadding(6);
                    cell.setPhrase(new Phrase(columnTitle));
                    table.addCell(cell);
                });
        //Add total
        PdfPCell colspanCell = new PdfPCell(new Phrase("Total factué", FontFactory.getFont(FontFactory.HELVETICA, 12)));
        colspanCell.setColspan(4);
        colspanCell.setPadding(6);
        table.addCell(colspanCell);
        PdfPCell totalCell = new PdfPCell(new Phrase(String.valueOf(devis.getTotal())));
        totalCell.setPadding(6);
        table.addCell(totalCell);

    }

}
