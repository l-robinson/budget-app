package io.github.l_robinson.web;

import java.io.IOException;
import java.util.UUID;

import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import de.siegmar.fastcsv.reader.CsvReader;
import de.siegmar.fastcsv.reader.CsvRecord;
import io.github.l_robinson.cache.UploadCache;
import io.github.l_robinson.web.model.AccountUploadProcessRequest;
import io.github.l_robinson.web.model.AccountUploadResponse;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@RequestScoped
public class UploadResource {

    @Inject
    UploadCache uploadCache;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("account")
    public AccountUploadResponse uploadAccount(@RestForm("file") FileUpload csv) throws IOException {
        AccountUploadResponse response = new AccountUploadResponse();
        response.setUuid(UUID.randomUUID().toString());
        response.setFilename(csv.fileName());

        try (CsvReader<CsvRecord> csvReader = CsvReader.builder().ofCsvRecord(csv.filePath())) {
            int c = 0;
            for (CsvRecord record : csvReader) {
                if (!record.isComment()) {
                    response.addLine(record.getFields());
                    if (++c >= 5) {
                        break;
                    }
                }
            }
        };

        uploadCache.put(response.getUuid(), csv.filePath());
        return response;
    }

    @POST
    @Path("account-process")
    public void uploadAccount(AccountUploadProcessRequest request) throws IOException {
        java.nio.file.Path path = uploadCache.get(request.getUuid());

        try (CsvReader<CsvRecord> csvReader = CsvReader.builder().ofCsvRecord(path)) {
            int c = 0;
            for (CsvRecord record : csvReader) {
                if ((!request.isSkipHeader() || c++ > 0) && !record.isComment()) {
                    // TODO convert to entity and store
                    System.out.println(record.toString());
                }
            }
        };
    }

}
