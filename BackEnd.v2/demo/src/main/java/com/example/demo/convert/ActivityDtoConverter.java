package com.example.demo.convert;


import com.example.demo.Dto.ActivityDto;
import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.ConstructionDto;
import com.example.demo.Dto.WorkerDto;
import com.example.demo.models.Activity;
import com.example.demo.models.Company;
import com.example.demo.models.Construction;
import com.example.demo.models.Worker;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ActivityDtoConverter {

    private final ModelMapper modelMapper;
    private final ConstructionDtoConverter constructionDtoConverter;
    private final CompanyDtoConverter companyDtoConverter;
    private final WorkerDtoConverter workerDtoConverter;

    public ActivityDto ActivityToDto(Activity activity) {
        ActivityDto activityDto = modelMapper.map(activity, ActivityDto.class);
        if (activity.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(activity.getCompany());
            activityDto.setCompanyDto(companyDto);
        }
        if (activity.getWorkers() != null) {
            List<WorkerDto> workerDtoList = activity.getWorkers().stream().map(workerDtoConverter::WorkerToDto).collect(Collectors.toList());
            activityDto.setWorkerDtoList(workerDtoList);
        }
        if (activity.getConstruction() != null) {
            ConstructionDto constructionDto = constructionDtoConverter.ConstructionToDto(activity.getConstruction());
            activityDto.setConstructionDto(constructionDto);
        }
        return activityDto;
    }

    public Activity DtoToActivity(ActivityDto activityDto) {
        Activity activity = modelMapper.map(activityDto, Activity.class);
        if (activityDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(activityDto.getCompanyDto());
            activity.setCompany(company);
        }
        if (activityDto.getWorkerDtoList() != null) {
            List<Worker> workerList = activityDto.getWorkerDtoList().stream().map(workerDtoConverter::DtoToWorker).collect(Collectors.toList());
            activity.setWorkers(workerList);
        }
        if (activityDto.getConstructionDto() != null) {
            Construction construction = constructionDtoConverter.DtoToConstruction(activityDto.getConstructionDto());
            activity.setConstruction(construction);
        }
        return activity;
    }
}
