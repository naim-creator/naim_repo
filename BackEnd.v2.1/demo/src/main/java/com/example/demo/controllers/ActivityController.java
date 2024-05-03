package com.example.demo.controllers;


import com.example.demo.Dto.ActivityDto;
import com.example.demo.services.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("activity")
@RestController
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;


    @GetMapping("get/{id}")
    public List<ActivityDto> getActivitiesByCompany(@PathVariable UUID id) {
        return this.activityService.getActivitiesByCompany(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveActivity(@RequestBody ActivityDto activityDto) {
        return this.activityService.saveActivity(activityDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateActivity(@RequestBody ActivityDto activityDto) {
        return this.activityService.updateActivity(activityDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteActivity(@PathVariable UUID id) {
        return this.activityService.deleteActivity(id);
    }
}
