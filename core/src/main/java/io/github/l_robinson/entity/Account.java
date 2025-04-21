package io.github.l_robinson.entity;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Account extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    @Column(nullable = false)
    public String name;
    @OneToMany
    public List<AccountTransaction> transactions;
}
