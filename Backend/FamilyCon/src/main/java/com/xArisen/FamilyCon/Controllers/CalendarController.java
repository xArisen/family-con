package com.xArisen.FamilyCon.Controllers;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.services.CalendarService;
import com.xArisen.FamilyCon.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Controller
@AllArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final UserService userService;

    @GetMapping("/calendar")
    public ResponseEntity<?> getAllCalendars(HttpServletRequest request) throws Exception{
        String userName = userService.getUserNameFromRequest(request);
        User user = userService.getUserByName(userName);
        return ResponseEntity.ok(calendarService.getAllCalendarsByUser(user));
    }

    @GetMapping("/calendar/{id}")
    public ResponseEntity<?> getCalendar(@PathVariable Long id) throws Exception{
        return ResponseEntity.ok(calendarService.getCalendarById(id));
    }

    @PostMapping("/calendar")
    public ResponseEntity<?> addCalendar(@RequestBody Calendar calendar, HttpServletRequest request) throws Exception{
        String userName = userService.getUserNameFromRequest(request);
        Long calendarId = calendarService.createCalendarForUserName(calendar, userName);
        userService.assignCalendarToUser(calendarId, userName);
        return ResponseEntity.ok(calendarId);
    }

    @DeleteMapping("/calendar/{id}")
    public ResponseEntity<?> deleteCalendar(@PathVariable Long id) throws Exception{
        calendarService.deleteCalendar(id);
        return ResponseEntity.ok("Deleted");
    }
}
