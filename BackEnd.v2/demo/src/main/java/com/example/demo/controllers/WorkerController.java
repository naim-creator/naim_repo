package com.example.demo.controllers;


import com.example.demo.Dto.WorkerDto;
import com.example.demo.ResponsePageable.WorkerResponse;
import com.example.demo.services.WorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("worker")
@RequiredArgsConstructor
public class WorkerController {

    private final WorkerService workerService;


    @GetMapping("get/{id}")
    public WorkerResponse getWorkersByCompany(@PathVariable UUID id,
                                              @RequestParam(value = "pageNo", defaultValue = "", required = false) int page,
                                              @RequestParam(value = "pageSize", defaultValue = "", required = false) int size) {
        return this.workerService.getAllWorkerByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public WorkerResponse getWorkersByCompanyFiltered(@PathVariable UUID id,
                                                      @RequestParam(value = "filter", defaultValue = "", required = false) String filter,
                                                      @RequestParam(value = "pageNo", defaultValue = "", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "", required = false) int size) {
        return this.workerService.getAllWorkerByFilter(id, filter, page, size);
    }

    @GetMapping("get/profession/{id}")
    public WorkerResponse getWorkersByProfession(@PathVariable UUID id,
                                                 @RequestParam(value = "profession", defaultValue = "", required = false) String profession,
                                                 @RequestParam(value = "pageNo", defaultValue = "", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "", required = false) int size) {
        return workerService.getWorkersByProfession(page, size, profession, id);
    }

    @GetMapping("get/one/{email}")
    public WorkerDto getWorkerByEmail(@PathVariable String email) {
        return this.workerService.getWorkerByEmail(email);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getWorkerTotal(@PathVariable UUID id) {
        return workerService.getWorkerTotal(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveWorker(@RequestBody WorkerDto workerDto) {
        return this.workerService.saveWorker(workerDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateWorker(@RequestBody WorkerDto workerDto) {
        return this.workerService.updateWorker(workerDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteWorker(@PathVariable UUID id) {
        return this.workerService.deleteWorker(id);
    }
}
