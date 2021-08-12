package com.xArisen.FamilyCon.models;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private LocalDateTime date;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @ManyToOne
    @JoinColumn(columnDefinition = "calendar_id", referencedColumnName="id", nullable=false, unique=true)
    private Calendar calendar;
}
