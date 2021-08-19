package com.xArisen.FamilyCon.services;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final CalendarService calendarService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public User getUserByName(String name){
        return userRepository.findByName(name);
    }

    public Long registerUser(User user){
        user.setId(null);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setCalendars(null);
        return userRepository.saveAndFlush(user).getId();
    }

    public void assignCalendarToUser(String userName, Long calendarId) throws Exception{
        User user = getUserByName(userName);
        Calendar calendar = calendarService.getCalendarById(calendarId);
        if(user.getCalendars() == null){
            List<Calendar> calendarList = new ArrayList<>();
    		calendarList.add(calendar);
    		user.setCalendars(calendarList);
        }else {
            user.getCalendars().add(calendar);
        }
        userRepository.saveAndFlush(user);
    }
}
