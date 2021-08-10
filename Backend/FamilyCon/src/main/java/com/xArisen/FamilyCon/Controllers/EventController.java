package com.xArisen.FamilyCon.Controllers;

import com.xArisen.FamilyCon.models.Event;
import com.xArisen.FamilyCon.services.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@AllArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/day/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) throws Exception{
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }
}
