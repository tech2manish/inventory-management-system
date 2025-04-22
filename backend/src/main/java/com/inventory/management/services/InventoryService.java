package com.inventory.management.services;

import com.inventory.management.models.InventoryTransaction;
import com.inventory.management.models.Item;
import com.inventory.management.repositories.ItemRepository;
import com.inventory.management.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private ItemRepository itemRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }

    public Item addItem(Item item) {
        return itemRepo.save(item);
    }

    public Item restockItem(Long itemId, int quantity, String user) {
        Item item = itemRepo.findById(itemId).orElseThrow();
        item.setQuantity(item.getQuantity() + quantity);
        itemRepo.save(item);

        InventoryTransaction txn = new InventoryTransaction();
        txn.setItem(item);
        txn.setType("RESTOCK");
        txn.setQuantity(quantity);
        txn.setTimestamp(LocalDateTime.now());
        txn.setPerformedBy(user);
        transactionRepo.save(txn);

        return item;
    }

    public Item destockItem(Long itemId, int quantity, String user) {
        Item item = itemRepo.findById(itemId).orElseThrow();
        item.setQuantity(item.getQuantity() - quantity);
        itemRepo.save(item);

        InventoryTransaction txn = new InventoryTransaction();
        txn.setItem(item);
        txn.setType("DESTOCK");
        txn.setQuantity(quantity);
        txn.setTimestamp(LocalDateTime.now());
        txn.setPerformedBy(user);
        transactionRepo.save(txn);

        return item;
    }

    public List<InventoryTransaction> getTransactions() {
        return transactionRepo.findAll();
    }

    public void deleteItem(Long itemId) {
        itemRepo.deleteById(itemId);
    }
}
