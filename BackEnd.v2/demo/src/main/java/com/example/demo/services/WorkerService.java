package com.example.demo.services;


import com.example.demo.Dto.WorkerDto;
import com.example.demo.ResponsePageable.WorkerResponse;
import com.example.demo.convert.WorkerDtoConverter;
import com.example.demo.models.Worker;
import com.example.demo.repositorys.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkerService {

    private final WorkerRepository workerRepository;
    private final WorkerDtoConverter workerDtoConverter;

    public WorkerResponse getAllWorkerByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Worker> workers = this.workerRepository.findWorkersByCompanyId(id, pageable);
        List<WorkerDto> workerDtos = workers.stream()
                .map(workerDtoConverter::WorkerToDto)
                .collect(Collectors.toList());

        WorkerResponse workerResponse = new WorkerResponse();
        workerResponse.setContent(workerDtos);
        workerResponse.setPageNo(workers.getNumber());
        workerResponse.setPageSize(workers.getSize());
        workerResponse.setTotalElements(workers.getTotalElements());
        workerResponse.setTotalPages(workers.getTotalPages());
        workerResponse.setLast(workers.isLast());
        return workerResponse;
    }

    public WorkerResponse getAllWorkerByFilter(UUID id, String filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Worker> workers = this.workerRepository.findByCustom(filter, id, pageable);
        List<WorkerDto> workerDtos = workers.stream()
                .map(workerDtoConverter::WorkerToDto)
                .collect(Collectors.toList());

        WorkerResponse workerResponse = new WorkerResponse();
        workerResponse.setContent(workerDtos);
        workerResponse.setPageNo(workers.getNumber());
        workerResponse.setPageSize(workers.getSize());
        workerResponse.setTotalElements(workers.getTotalElements());
        workerResponse.setTotalPages(workers.getTotalPages());
        workerResponse.setLast(workers.isLast());
        return workerResponse;
    }

    public WorkerResponse getWorkersByProfession(int page, int size, String profession, UUID id) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Worker> workers = workerRepository.findWorkerByProfession(profession, id, pageable);
        List<WorkerDto> workerDtos = workers.stream().map(workerDtoConverter::WorkerToDto).collect(Collectors.toList());

        WorkerResponse workerResponse = new WorkerResponse();
        workerResponse.setContent(workerDtos);
        workerResponse.setPageNo(workers.getNumber());
        workerResponse.setPageSize(workers.getSize());
        workerResponse.setTotalElements(workers.getTotalElements());
        workerResponse.setTotalPages(workers.getTotalPages());
        workerResponse.setLast(workers.isLast());
        return workerResponse;
    }

    public BigDecimal getWorkerTotal(UUID id) {
        return workerRepository.countWorkersByCompanyId(id);
    }

    public WorkerDto getWorkerByEmail(String email) {
        Optional<Worker> worker = workerRepository.findByEmail(email);
        if (worker.isPresent()) {
            return workerDtoConverter.WorkerToDto(worker.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found");
        }
    }

    public ResponseEntity<String> saveWorker(WorkerDto workerDto) {
        Worker worker = workerDtoConverter.DtoToWorker(workerDto);
        this.workerRepository.save(worker);
        return ResponseEntity.ok("Data Saved");
    }

    public ResponseEntity<String> updateWorker(WorkerDto workerDto) {
        Worker worker = workerDtoConverter.DtoToWorker(workerDto);
        this.workerRepository.save(worker);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteWorker(UUID id) {
        this.workerRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }


}
