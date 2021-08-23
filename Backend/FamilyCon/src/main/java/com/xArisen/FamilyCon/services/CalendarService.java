package com.xArisen.FamilyCon.services;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.Event;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.repo.CalendarRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    public Calendar getCalendarById(Long id) throws NotFoundException {
        return calendarRepository.findById(id).orElseThrow(() -> new NotFoundException("Calendar not found"));
    }


    public Long createCalendarForUserName(Calendar calendar, String name) throws Exception {
        User user = userService.getUserByName(name);
        calendar.setUser(user);
        return calendarRepository.saveAndFlush(calendar).getId();
    }

    public void assignEvent(Calendar calendar, Event event) {
        calendar.getEvents().add(event);
        calendarRepository.saveAndFlush(calendar);
    }

    public void deleteCalendar(Long id) throws NotFoundException {
        Calendar calendar = calendarRepository.findById(id).orElseThrow(() -> new NotFoundException("Calendar not found"));
        calendar.getEvents().forEach(event -> {
            try {
                eventService.deleteEvent(event.getId());
            } catch (Exception e) {
                System.out.println("Exception not found");
            }
        });
        calendarRepository.deleteById(id);
    }
}
