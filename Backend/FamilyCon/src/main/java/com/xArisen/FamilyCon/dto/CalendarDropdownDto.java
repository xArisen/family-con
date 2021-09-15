package com.xArisen.FamilyCon.dto;

import com.xArisen.FamilyCon.models.Calendar;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDropdownDto {
    private Long id;
    private String name;

    public CalendarDropdownDto(Calendar calendar){
        this.id = calendar.getId();
        this.name = calendar.getName();
    }
}
