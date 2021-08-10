package com.xArisen.FamilyCon.repo;

import com.xArisen.FamilyCon.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findByDate(LocalDate date);
}
