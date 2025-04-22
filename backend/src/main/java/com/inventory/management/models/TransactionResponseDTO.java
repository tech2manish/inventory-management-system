package com.inventory.management.models;

import java.time.LocalDateTime;

public record TransactionResponseDTO(
        Long id,
        String itemName,
        Long itemId,
        String type,
        int quantity,
        String performedBy,
        LocalDateTime timestamp
) {}
