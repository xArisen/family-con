package com.xArisen.FamilyCon.services;

import com.xArisen.FamilyCon.dto.EventDto;
import com.xArisen.FamilyCon.models.Event;
import com.xArisen.FamilyCon.repo.EventRepository;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@AllArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;

    public Event getEventById(Long id) throws NotFoundException{
        return eventRepository.findById(id).orElseThrow(() -> new NotFoundException("Event not found"));
    }

    public Event getEventByDate(LocalDate localDate){
        return eventRepository.findByDate(localDate);
    }

    public Long addEvent(Event event){
        return eventRepository.saveAndFlush(event).getId();
    }

    public Long updateEvent(Long id, EventDto newEvent) throws NotFoundException{
        Event event = getEventById(id);
        event.setTitle(newEvent.getTitle());
        event.setDescription(newEvent.getDescription());
        event.setDate(newEvent.getDate());
        return eventRepository.saveAndFlush(event).getId();
    }

    public Long deleteEvent(Long id) throws NotFoundException{
        eventRepository.deleteEventById(id);
        return id;
    }
}
