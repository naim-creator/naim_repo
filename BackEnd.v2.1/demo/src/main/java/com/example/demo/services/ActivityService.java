package com.example.demo.services;


import com.example.demo.Dto.ActivityDto;
import com.example.demo.convert.ActivityDtoConverter;
import com.example.demo.models.Activity;
import com.example.demo.repositorys.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityDtoConverter activityDtoConverter;

    public List<ActivityDto> getActivitiesByCompany(UUID companyId) {
        List<Activity> activities = this.activityRepository.findActivitiesByCompanyId(companyId);
        return activities.stream()
                .map(activityDtoConverter::ActivityToDto)
                .collect(Collectors.toList());

    }

    public ResponseEntity<String> saveActivity(ActivityDto activityDto) {
        Activity activity = this.activityDtoConverter.DtoToActivity(activityDto);
        this.activityRepository.save(activity);
        return ResponseEntity.ok("Data Saved");
    }

    public ResponseEntity<String> updateActivity(ActivityDto activityDto) {
        Activity activity = this.activityDtoConverter.DtoToActivity(activityDto);
        this.activityRepository.save(activity);
        return ResponseEntity.ok("Data Updated");
    }

    public ResponseEntity<String> deleteActivity(UUID id) {
        this.activityRepository.deleteById(id);
        return ResponseEntity.ok("Activity Deleted");
    }
}
