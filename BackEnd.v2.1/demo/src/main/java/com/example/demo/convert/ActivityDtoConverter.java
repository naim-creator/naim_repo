package com.example.demo.convert;


import com.example.demo.Dto.ActivityDto;
import com.example.demo.models.Activity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ActivityDtoConverter {

    private final ModelMapper modelMapper;

    public ActivityDto ActivityToDto(Activity activity) {
        return modelMapper.map(activity, ActivityDto.class);
    }

    public Activity DtoToActivity(ActivityDto activityDto) {
        return modelMapper.map(activityDto, Activity.class);
    }
}
