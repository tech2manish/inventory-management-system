package com.inventory.management.controllers;

import com.inventory.management.models.InventoryTransaction;
import com.inventory.management.models.Item;
import com.inventory.management.models.TransactionResponseDTO;
import com.inventory.management.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Fetch all inventory items
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = inventoryService.getAllItems();
        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(items);
        }
        return ResponseEntity.ok(items);
    }

    // Add a new item to inventory
    @PostMapping("/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = inventoryService.addItem(item);
        if (newItem == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    // Restock an item
    @PostMapping("/restock/{itemId}")
    public ResponseEntity<Item> restockItem(@PathVariable Long itemId, @RequestParam int quantity, @RequestParam String user) {
        Item item = inventoryService.restockItem(itemId, quantity, user);
        if (item == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(item);
    }

    // Destock an item
    @PostMapping("/destock/{itemId}")
    public ResponseEntity<Item> destockItem(@PathVariable Long itemId, @RequestParam int quantity, @RequestParam String user) {
        Item item = inventoryService.destockItem(itemId, quantity, user);
        if (item == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable Long itemId) {
        System.out.println("delete item id: "+ itemId);
        inventoryService.deleteItem(itemId);
        return ResponseEntity.ok("Item deleted successfully");
    }


    // Get transaction history
    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        List<InventoryTransaction> transactionsList = inventoryService.getTransactions();
        List<TransactionResponseDTO> transactions = new ArrayList<>();
        for (InventoryTransaction inventoryTransaction : transactionsList) {
            transactions.add(new TransactionResponseDTO(inventoryTransaction.getId(), inventoryTransaction.getItem().getName(), inventoryTransaction.getItem().getId(), inventoryTransaction.getType(), inventoryTransaction.getQuantity(), inventoryTransaction.getPerformedBy(), inventoryTransaction.getTimestamp()));
        }
        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(transactions);
        }
        return ResponseEntity.ok(transactions);
    }

    // Fetch dashboard stats (total items, total quantity, total value)
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        List<Item> items = inventoryService.getAllItems();
        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        int totalQuantity = items.stream().mapToInt(Item::getQuantity).sum();
        double totalValue = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalItems", items.size());
        stats.put("totalQuantity", totalQuantity);
        stats.put("totalValue", totalValue);

        return ResponseEntity.ok(stats);
    }
}
