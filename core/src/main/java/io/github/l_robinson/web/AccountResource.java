package io.github.l_robinson.web;

import java.util.List;

import io.github.l_robinson.entity.Account;
import io.github.l_robinson.repo.AccountRepository;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;

@RequestScoped
public class AccountResource {

    @Inject
    AccountRepository accountRepo;

    @GET
    public List<Account> accounts() {
        return accountRepo.listAll();
    }

    @GET
    @Path("{id}")
    public Account getAccount(@PathParam("id") Long id) {
        return accountRepo.findById(id);
    }
    
    @POST
    public Account createAccount(@QueryParam("name") String name) {
        Account account = new Account();
        account.name = name;
        accountRepo.persist(account);
        return account;
    }

}
