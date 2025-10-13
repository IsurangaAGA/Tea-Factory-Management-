package com.teafactory.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.teafactory.app.entities.Supplier;
import com.teafactory.app.repositories.SupplierRepository;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository repo;

    public Supplier addSupplier(Supplier s){ return repo.save(s); }
    public List<Supplier> getAll(){ return repo.findAll(); }
    public Supplier update(Long id, Supplier s){
        Supplier existing = repo.findById(id).orElseThrow();
        existing.setName(s.getName());
        existing.setEmail(s.getEmail());
        existing.setPhone(s.getPhone());
        existing.setAddress(s.getAddress());
        existing.setStatus(s.getStatus());
        return repo.save(existing);
    }
    public void delete(Long id){ repo.deleteById(id); }
}
