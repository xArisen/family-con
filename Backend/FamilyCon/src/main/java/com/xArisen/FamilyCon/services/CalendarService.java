package com.xArisen.FamilyCon.services;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.repo.CalendarRepository;
import com.xArisen.FamilyCon.repo.UserRepository;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;

    public Calendar getCalendarById(Long id) throws NotFoundException {
        return calendarRepository.findById(id).orElseThrow(() -> new NotFoundException("Calendar not found"));
    }

    public Long createCalendarForUserEmail(Calendar calendar, String email){
        User user = userRepository.findByEmail(email);
        calendar.setUser(user);
        return calendarRepository.saveAndFlush(calendar).getId();
    }
}
