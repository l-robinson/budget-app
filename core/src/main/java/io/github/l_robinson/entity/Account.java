package io.github.l_robinson.entity;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Account extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    public String name;
    public List<AccountTransaction> transactions;
}
