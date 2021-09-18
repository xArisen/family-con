package com.xArisen.FamilyCon.dto;

import com.xArisen.FamilyCon.models.Calendar;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDataDto {
    private Long id;
    private String name;
    private List<EventDto> events;

    public CalendarDataDto(Calendar calendar){
        this.id = calendar.getId();
        this.name = calendar.getName();
        this.events = calendar.getEvents().stream().map(event -> new EventDto(event)).collect(Collectors.toList());
    }
}
