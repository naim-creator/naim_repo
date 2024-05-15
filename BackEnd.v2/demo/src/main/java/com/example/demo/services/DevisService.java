package com.example.demo.services;

import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.CustomerDto;
import com.example.demo.Dto.DevisDto;
import com.example.demo.ResponsePageable.DevisResponse;
import com.example.demo.convert.CompanyDtoConverter;
import com.example.demo.convert.DevisDtoConverter;
import com.example.demo.models.Company;
import com.example.demo.models.Devis;
import com.example.demo.repositorys.CompanyRepository;
import com.example.demo.repositorys.DevisRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DevisService {

    private final DevisRepository devisRepository;
    private final DevisDtoConverter devisDtoConverter;
    private final CustomerService customerService;
    private final CompanyDtoConverter companyDtoConverter;
    private final CompanyRepository companyRepository;

    public DevisResponse getDevisByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Devis> devisList = devisRepository.findByCompanyId(id, pageable);
        List<DevisDto> devisDtos = devisList.getContent().stream()
                .map(devisDtoConverter::DevisToDto)
                .collect(Collectors.toList());
        DevisResponse devisResponse = new DevisResponse();
        devisResponse.setContent(devisDtos);
        devisResponse.setPageNo(devisList.getNumber());
        devisResponse.setPageSize(devisList.getSize());
        devisResponse.setTotalElements(devisList.getTotalElements());
        devisResponse.setTotalPages(devisList.getTotalPages());
        devisResponse.setLast(devisList.isLast());
        return devisResponse;
    }

    public DevisResponse getDevisByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Devis> devisList = devisRepository.findByCompanyIdFiltered(id, filter, pageable);
        List<DevisDto> devisDtos = devisList.getContent().stream()
                .map(devisDtoConverter::DevisToDto)
                .collect(Collectors.toList());
        DevisResponse devisResponse = new DevisResponse();
        devisResponse.setContent(devisDtos);
        devisResponse.setPageNo(devisList.getNumber());
        devisResponse.setPageSize(devisList.getSize());
        devisResponse.setTotalElements(devisList.getTotalElements());
        devisResponse.setTotalPages(devisList.getTotalPages());
        devisResponse.setLast(devisList.isLast());
        return devisResponse;
    }

    public byte[] printDevis(DevisDto devisDto) throws DocumentException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, baos);

        Paragraph title = new Paragraph("Devis Photovoltaique", FontFactory.getFont(FontFactory.COURIER_OBLIQUE, 22));
        Paragraph space = new Paragraph("                    ", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
        Paragraph secound_space = new Paragraph("                    ", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
        title.setAlignment(Element.ALIGN_CENTER);
        space.setAlignment(Element.ALIGN_CENTER);
        secound_space.setAlignment(Element.ALIGN_CENTER);
        document.open();
        PdfPTable table = new PdfPTable(5);
        addTableHeader(table);
        addRows(table, devisDto);
        float[] columnWidths = {2f, 1f, 1.5f, 1f, 2f};
        table.setWidths(columnWidths);
        document.add(title);
        document.add(space);
        document.add(secound_space);
        document.add(table);
        document.close();
        return baos.toByteArray();
    }

    private void addTableHeader(PdfPTable table) {
        Stream.of("model", "quantité", "prix", "tva", "total")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(1);
                    header.setPadding(6);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    private void addRows(PdfPTable table, DevisDto devisDto) {
        //Add solar planel
        Stream.of(devisDto.getSolarPanel().getModelSolarPanel(),
                        String.valueOf(devisDto.getSolarPanel().getQuantitySolarPanel()),
                        String.valueOf(devisDto.getSolarPanel().getPriceSolarPanel()),
                        String.valueOf(devisDto.getSolarPanel().getTvaSolarPanel()),
                        String.valueOf(devisDto.getSolarPanel().getTotalSolarPanel())
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
        Stream.of(devisDto.getInverter().getModelInverter(),
                        String.valueOf(devisDto.getInverter().getQuantityInverter()),
                        String.valueOf(devisDto.getInverter().getPriceInverter()),
                        String.valueOf(devisDto.getInverter().getTvaInverter()),
                        String.valueOf(devisDto.getInverter().getTotalInverter())
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
        Stream.of(devisDto.getSystemFixing().getModelSystemFixing(),
                        String.valueOf(devisDto.getSystemFixing().getQuantitySystemFixing()),
                        String.valueOf(devisDto.getSystemFixing().getPriceSystemFixing()),
                        String.valueOf(devisDto.getSystemFixing().getTvaSystemFixing()),
                        String.valueOf(devisDto.getSystemFixing().getTotalSystemFixing())
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
        Stream.of(devisDto.getBattery().getModelBattery(),
                        String.valueOf(devisDto.getBattery().getQuantityBattery()),
                        String.valueOf(devisDto.getBattery().getPriceBattery()),
                        String.valueOf(devisDto.getBattery().getTvaBattery()),
                        String.valueOf(devisDto.getBattery().getTotalBattery())
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
        Stream.of(devisDto.getCable().getModelCable(),
                        String.valueOf(devisDto.getCable().getQuantityCable()),
                        String.valueOf(devisDto.getCable().getPriceCable()),
                        String.valueOf(devisDto.getCable().getTvaCable()),
                        String.valueOf(devisDto.getCable().getTotalCable())
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
        Stream.of(devisDto.getMeter().getModelMeter(),
                        String.valueOf(devisDto.getMeter().getQuantityMeter()),
                        String.valueOf(devisDto.getMeter().getPriceMeter()),
                        String.valueOf(devisDto.getMeter().getTvaMeter()),
                        String.valueOf(devisDto.getMeter().getTotalMeter())
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
        PdfPCell colspanCell = new PdfPCell(new Phrase("Total", FontFactory.getFont(FontFactory.HELVETICA, 12)));
        colspanCell.setColspan(4);
        colspanCell.setPadding(6);
        table.addCell(colspanCell);
        PdfPCell totalCell = new PdfPCell(new Phrase(String.valueOf(devisDto.getTotal())));
        totalCell.setPadding(6);
        table.addCell(totalCell);

    }

    public ResponseEntity<String> acceptDevis(UUID id, UUID idCompany) {
        Optional<Devis> devis = devisRepository.findById(id);
        if (devis.isPresent()) {
            devis.get().setAbout("accepter");
            devisRepository.save(devis.get());
            CustomerDto customerDto = new CustomerDto();
            customerDto.setFirstName(devis.get().getDevisRequest().getFirstName());
            customerDto.setLastName(devis.get().getDevisRequest().getLastName());
            customerDto.setEmail(devis.get().getDevisRequest().getEmail());
            customerDto.setPhone(devis.get().getDevisRequest().getPhone());
            Optional<Company> company = companyRepository.findById(idCompany);
            if (company.isPresent()) {
                CompanyDto companyDto = companyDtoConverter.CompanyToDto(company.get());
                customerDto.setCompanyDto(companyDto);
            }
            customerService.saveCustomer(customerDto);
            return ResponseEntity.ok("Merci d'avoir choisi nous pour un chantier photovoltaique ! Nous sommes ravis de nous lancer et nous apprécions votre confiance. N'hésitez pas à me contacter si vous avez des questions au fur et à mesure que nous avançons");
        } else {
            return ResponseEntity.ofNullable("Error");
        }
    }

    public ResponseEntity<String> saveDevis(DevisDto devisDto) {
        Devis devis = devisDtoConverter.DtoToDevis(devisDto);
        devisRepository.save(devis);
        return ResponseEntity.ok("Devis est enregistré");
    }

    public ResponseEntity<String> updateDevis(DevisDto devisDto) {
        Devis devis = devisDtoConverter.DtoToDevis(devisDto);
        devisRepository.save(devis);
        return ResponseEntity.ok("Devis est modifié");
    }

    public ResponseEntity<String> deleteDevis(UUID id) {
        this.devisRepository.deleteById(id);
        return ResponseEntity.ok("Devis est supprimé");
    }
}
