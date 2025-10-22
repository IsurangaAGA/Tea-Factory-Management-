package com.teafactory.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.teafactory.app.entities.ItemMaster;
import com.teafactory.app.repositories.ItemMasterRepository;

@Service
public class ItemMasterService {
    @Autowired
    private ItemMasterRepository repo;

    public ItemMaster addItem(ItemMaster i){ return repo.save(i); }
    public List<ItemMaster> getAll(){ return repo.findAll(); }
    public List<ItemMaster> getBySupplier(Long id){ return repo.findBySupplier_Id(id); }
    public List<ItemMaster> getByCategory(String category){ return repo.findByCategory(category); }
    public void delete(Long id){ repo.deleteById(id); }
}
