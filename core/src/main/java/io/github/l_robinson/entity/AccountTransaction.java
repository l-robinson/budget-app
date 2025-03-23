package io.github.l_robinson.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AccountTransaction {
    @Id
    private Long id;
    private LocalDateTime dateTime;
    private BigDecimal amount;
    private String description;
    private String merchant;
    private String category;
}
