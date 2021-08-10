package com.xArisen.FamilyCon.repo;

import com.xArisen.FamilyCon.models.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
