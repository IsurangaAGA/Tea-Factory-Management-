package com.teafactory.app.repositories;

import com.teafactory.app.models.Order;
import com.teafactory.app.models.Order.DeliveryStatus;
import com.teafactory.app.models.Order.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Custom query methods
    List<Order> findByPaymentStatus(PaymentStatus paymentStatus);

    List<Order> findByDeliveryStatus(DeliveryStatus deliveryStatus);

    List<Order> findByCustomerNameContainingIgnoreCase(String customerName);

    @Query("SELECT o.customerName, COUNT(o) as orderCount FROM Order o GROUP BY o.customerName ORDER BY orderCount DESC")
    List<Object[]> findTopCustomersByOrderCount();

    @Query("SELECT o FROM Order o WHERE o.paymentStatus = 'PENDING' AND o.deliveryStatus = 'PENDING'")
    List<Order> findPendingOrders();
}
