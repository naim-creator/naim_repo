package com.example.demo.convert;


import com.example.demo.Dto.WorkerDto;
import com.example.demo.models.Worker;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WorkerDtoConverter {

    private final ModelMapper modelMapper;

    public WorkerDto WorkerToDto(Worker worker) {
        return modelMapper.map(worker, WorkerDto.class);
    }

    public Worker DtoToWorker(WorkerDto workerDto) {
        return modelMapper.map(workerDto, Worker.class);
    }
}
