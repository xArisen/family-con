package com.xArisen.FamilyCon.services;

import com.xArisen.FamilyCon.dto.CalendarDataDto;
import com.xArisen.FamilyCon.dto.CalendarDropdownDto;
import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.Event;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.repo.CalendarRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    public CalendarDataDto getCalendarDataDtoById(Long id) throws NotFoundException {
        Calendar calendar = calendarRepository.findById(id).orElseThrow(() -> new NotFoundException("Calendar not found"));
        return new CalendarDataDto(calendar);
    }

    public Calendar getCalendarById(Long id) throws NotFoundException {
        return calendarRepository.findById(id).orElseThrow(() -> new NotFoundException("Calendar not found"));
    }

    public List<CalendarDropdownDto> getAllCalendarsByUser(User user) {
        List<CalendarDropdownDto> mappedCalendars = new ArrayList<>();
        calendarRepository.findAllByUser(user).forEach(calendar -> {
            mappedCalendars.add(new CalendarDropdownDto(calendar));
        });

        return mappedCalendars;
    }

    public Long createCalendarForUserName(Calendar calendar, String userName) throws Exception {
        if(calendar.getName().isBlank()){
            throw new IllegalArgumentException("Kalendarz musi posiadać nazwę");
        }
        User user = userService.getUserByName(userName);
        Calendar calendarAlreadyExists = calendarRepository.findByName(calendar.getName());
        if(calendarAlreadyExists != null && calendarAlreadyExists.getUser().getName().equals(userName)){
            throw new IllegalArgumentException("Kalendarz o takiej nazwie już istnieje");
        }
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
