package io.github.l_robinson;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("")
public class Endpoint {

    @GET()
    @Path("hello")
    public String hello() {
        return "world";
    }

}
