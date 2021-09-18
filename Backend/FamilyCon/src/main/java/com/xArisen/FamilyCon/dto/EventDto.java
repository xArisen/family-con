package com.xArisen.FamilyCon.dto;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.Event;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    private Long id;
    private LocalDateTime date;
    private String title;
    private String description;

    public EventDto(Event event){
        this.id = event.getId();
        this.date = event.getDate();
        this.title = event.getTitle();
        this.description = event.getDescription();
    }
}
