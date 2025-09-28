package com.teafactory.app.repositories;

import com.teafactory.app.models.Delivery;
import com.teafactory.app.models.Delivery.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    // Find delivery by order ID
    Optional<Delivery> findByOrderId(Long orderId);

    // Find deliveries by status
    List<Delivery> findByStatus(DeliveryStatus status);

    // Find deliveries by assigned driver
    List<Delivery> findByAssignedDriver(String driverName);

    // Find deliveries by date range
    List<Delivery> findByDeliveryDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Find overdue deliveries
    @Query("SELECT d FROM Delivery d WHERE d.expectedDate < :currentDate AND d.status != 'DELIVERED' AND d.status != 'CANCELLED'")
    List<Delivery> findOverdueDeliveries(@Param("currentDate") LocalDateTime currentDate);

    // Count deliveries by status
    long countByStatus(DeliveryStatus status);
}
