package com.inventory.management.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "transactions")
public class InventoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Item item;

    private String type; // "RESTOCK" or "DESTOCK"

    private int quantity;

    private LocalDateTime timestamp;

    private String performedBy; // email or username

}
