package com.xArisen.FamilyCon.repo;

import com.xArisen.FamilyCon.models.Calendar;
import com.xArisen.FamilyCon.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    List<Calendar> findAllByUser(User user);
    Calendar findByName(String name);
}
