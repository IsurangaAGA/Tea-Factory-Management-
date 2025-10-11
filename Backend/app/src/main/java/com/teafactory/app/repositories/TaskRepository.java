package com.teafactory.app.repositories;

import com.teafactory.app.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}


