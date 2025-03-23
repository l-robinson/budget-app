package io.github.l_robinson.repo;

import java.util.List;

import io.github.l_robinson.entity.Account;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaQuery;

@ApplicationScoped
public class AccountRepository implements PanacheRepository<Account> {

    // public List<Account> listAll() {
    //     CriteriaQuery<Account> cq = em.getCriteriaBuilder().createQuery(Account.class);
    //     return em.createQuery(cq).getResultList();
    // }

    // public void create(Account account) {
    //     em.persist(account);
    // }

}
