package io.github.l_robinson.web;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("")
public class BaseResource {

    @Inject
    UploadResource uploadResource;

    @GET()
    @Path("version")
    public String version() {
        return "version 1";
    }

    @Path("upload")
    public UploadResource upload() {
        return uploadResource;
    }

}
