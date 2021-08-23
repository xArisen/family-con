package com.xArisen.FamilyCon.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.repo.UserRepository;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static com.xArisen.FamilyCon.security.SecurityConstants.*;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CalendarService calendarService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User getUserByName(String name) throws NotFoundException{
        //TODO check if found
        User user = userRepository.findByName(name);
       return user;
    }

    public Long registerUser(User user){
        user.setId(null);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setCalendars(null);
        return userRepository.saveAndFlush(user).getId();
    }

    public void assignCalendarToUser(Long calendarId, String userName) throws Exception{
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

    public String getUserNameFromRequest(HttpServletRequest request){
        String token = request.getHeader(HEADER_STRING);

        if (token != null) {
            String userName = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .getSubject();
            return userName;
        }
        throw new BadCredentialsException("No token found");
    }
}
