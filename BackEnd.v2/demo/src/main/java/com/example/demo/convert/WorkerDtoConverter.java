package com.example.demo.convert;


import com.example.demo.Dto.ActivityDto;
import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.LicenceDto;
import com.example.demo.Dto.WorkerDto;
import com.example.demo.models.Activity;
import com.example.demo.models.Company;
import com.example.demo.models.Licence;
import com.example.demo.models.Worker;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class WorkerDtoConverter {

    private final ModelMapper modelMapper;

    public WorkerDto WorkerToDto(Worker worker) {
        WorkerDto workerDto = modelMapper.map(worker, WorkerDto.class);
        if (worker.getCompany() != null) {
            workerDto.setCompanyDto(modelMapper.map(worker.getCompany(), CompanyDto.class));
            if (worker.getLicence() != null) {
                workerDto.setLicenceDto(modelMapper.map(worker.getLicence(), LicenceDto.class));
            }
            if (worker.getActivities() != null) {
                List<ActivityDto> activities = modelMapper.map(worker.getActivities(), List.class);
                workerDto.setActivityDtos(activities);
            }
        }
        return workerDto;
    }

    public Worker DtoToWorker(WorkerDto workerDto) {
        Worker worker = modelMapper.map(workerDto, Worker.class);
        if (workerDto.getCompanyDto() != null) {
            worker.setCompany(modelMapper.map(workerDto.getCompanyDto(), Company.class));
            if (workerDto.getLicenceDto() != null) {
                worker.setLicence(modelMapper.map(workerDto.getLicenceDto(), Licence.class));
            }
            if (workerDto.getActivityDtos() != null) {
                List<Activity> activities = modelMapper.map(workerDto.getActivityDtos(), List.class);
                worker.setActivities(activities);
            }
        }
        return worker;
    }
}
