package com.xArisen.FamilyCon.Controllers;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.Event;
import com.xArisen.FamilyCon.services.CalendarService;
import com.xArisen.FamilyCon.services.EventService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private CalendarService calendarService;

    @GetMapping("/day/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) throws Exception{
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping("/calendar/{calendarId}/event")
    public ResponseEntity<?> addEvent(@RequestBody Event event, @PathVariable Long calendarId) throws Exception{
        Calendar calendar = calendarService.getCalendarById(calendarId);
        event.setCalendar(calendar);
        Long eventId = eventService.addEvent(event);
        calendarService.assignEvent(calendar, eventService.getEventById(eventId));
        return ResponseEntity.ok(eventId);
    }

    @GetMapping("/calendar/{calendarId}/event")
    public ResponseEntity<?> getAllCalendarEvents(@PathVariable Long calendarId) throws Exception{
        Calendar calendar = calendarService.getCalendarById(calendarId);
        return ResponseEntity.ok(calendar.getEvents());
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event newEvent) throws Exception{
        return ResponseEntity.ok(eventService.updateEvent(id, newEvent));
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) throws Exception{
        return ResponseEntity.ok(eventService.deleteEvent(id));
    }
}
