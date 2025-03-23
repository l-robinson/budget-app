package io.github.l_robinson.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
import jakarta.resource.spi.IllegalStateException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@RequestScoped
public class UploadResource {

    private static final int MAX_LINES = 5;
    @Inject
    UploadCache uploadCache;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("account")
    public AccountUploadResponse uploadAccount(@RestForm("file") FileUpload csv) throws IOException {
        AccountUploadResponse response = new AccountUploadResponse();
        response.setUuid(UUID.randomUUID().toString());
        response.setFilename(csv.fileName());

        List<CsvRecord> records = new ArrayList<>();
        try (CsvReader<CsvRecord> csvReader = CsvReader.builder().ofCsvRecord(csv.filePath())) {
            int lineCount = 0;
            for (CsvRecord record : csvReader) {
                if (!record.isComment()) {
                    records.add(record);
                    if (++lineCount <= MAX_LINES) {
                        response.addLine(record.getFields());
                    }
                }
            }
        };

        uploadCache.put(response.getUuid(), records);
        return response;
    }

    @POST
    @Path("account-process")
    public void uploadAccount(AccountUploadProcessRequest request) throws Exception {
        List<CsvRecord> records = uploadCache.get(request.getUuid());
        if (records == null) {
            throw new IllegalStateException("CSV data no longer available, please re-upload");
        }
        int lineCount = 0;
        for (CsvRecord record : records) {
            if ((!request.isSkipHeader() || ++lineCount > 0)) {
                // TODO convert to entity and store
                System.out.println(record.toString());
            }
        }
    }

}
