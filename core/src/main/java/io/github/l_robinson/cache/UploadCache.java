package io.github.l_robinson.cache;

import java.time.Duration;
import java.util.List;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import de.siegmar.fastcsv.reader.CsvRecord;
import jakarta.inject.Singleton;

@Singleton
public class UploadCache {

    Cache<String, List<CsvRecord>> uploadCache = Caffeine.newBuilder().expireAfterWrite(Duration.ofMinutes(15)).build();

    public void put(String uuid, List<CsvRecord> records) {
        uploadCache.put(uuid, records);
    }

    public List<CsvRecord> get(String uuid) {
        return uploadCache.getIfPresent(uuid);
    }

}
