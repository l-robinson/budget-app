package io.github.l_robinson.web.model;

import java.util.Arrays;
import java.util.List;

public class AccountUploadColumn {

    enum Col {
        DATE_TIME("Date / Time"), AMOUNT("Amount"), MERCHANT("Merchant"), DESCRIPTION("Description"), CATEGORY("Category");
        private String displayName;
        Col(String displayName) {
            this.displayName = displayName;
        }
    }

    private Col col;
    private String displayName;
    AccountUploadColumn(Col col) {
        this.col = col;
        this.displayName = col.displayName;
    }

    public Col getCol() {
        return col;
    }
    public String getDisplayName() {
        return displayName;
    }
    
    public static final List<AccountUploadColumn> all() {
        return Arrays.stream(Col.values()).map(c -> new AccountUploadColumn(c)).toList();
    }

}
