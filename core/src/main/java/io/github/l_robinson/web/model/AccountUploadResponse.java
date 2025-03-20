package io.github.l_robinson.web.model;

import java.util.ArrayList;
import java.util.List;

public class AccountUploadResponse {
    private String uuid;
    private String filename;
    private List<List<String>> lines = new ArrayList<>();
    private List<AccountUploadColumn> columns = AccountUploadColumn.all();
    public String getUuid() {
        return uuid;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }
    public List<List<String>> getLines() {
        return lines;
    }
    public void setLines(List<List<String>> lines) {
        this.lines = lines;
    }
    public void addLine(List<String> line) {
        this.lines.add(line);
    }
    public List<AccountUploadColumn> getColumns() {
        return columns;
    }
}
