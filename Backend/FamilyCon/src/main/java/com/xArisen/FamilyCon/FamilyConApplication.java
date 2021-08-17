package com.xArisen.FamilyCon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class FamilyConApplication {
//	@Autowired
//	private static EventRepository eventRepository;
//	@Autowired
//	private static UserRepository userRepository;
//	@Autowired
//	private static CalendarRepository calendarRepository;

	public static void main(String[] args) {
		SpringApplication.run(FamilyConApplication.class, args);
//		User user = new User();
//		userRepository.saveAndFlush(user);
//		Calendar calendar = new Calendar();
//		calendar.setName("calendar");
//		calendar.setUser(user);
//		Long calendarId = calendarRepository.saveAndFlush(calendar).getId();
//		List<Calendar> calendarList = new ArrayList<>();
//		calendarList.add(calendar);
//		user.setCalendars(calendarList);
//		userRepository.saveAndFlush(user);
//		Event event = new Event();
//		event.setTitle("event");
//		event.setCalendar(calendar);
//		eventRepository.saveAndFlush(event);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
