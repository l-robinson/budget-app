package io.github.l_robinson.cache;

import java.nio.file.Path;
import java.time.Duration;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import jakarta.inject.Singleton;

@Singleton
public class UploadCache {

    Cache<String, Path> uploadCache = Caffeine.newBuilder().expireAfterWrite(Duration.ofMinutes(15)).build();

    public void put(String uuid, Path filePath) {
        uploadCache.put(uuid, filePath);
    }

    public Path get(String uuid) {
        return uploadCache.getIfPresent(uuid);
    }

}
