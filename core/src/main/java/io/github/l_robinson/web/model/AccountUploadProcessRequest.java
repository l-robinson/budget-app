package io.github.l_robinson.web.model;

import java.util.List;

public class AccountUploadProcessRequest {
    private String uuid;
    private boolean skipHeader;
    private List<String> columns;
    public String getUuid() {
        return uuid;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    public boolean isSkipHeader() {
        return skipHeader;
    }
    public void setSkipHeader(boolean skipHeader) {
        this.skipHeader = skipHeader;
    }
    public List<String> getColumns() {
        return columns;
    }
    public void setColumns(List<String> columns) {
        this.columns = columns;
    }
}
