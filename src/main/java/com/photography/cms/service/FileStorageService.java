package com.photography.cms.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(Paths.get(uploadDir));
    }

    public String store(MultipartFile file, String subfolder) {
        try {
            Path subDir = Paths.get(uploadDir, subfolder);
            Files.createDirectories(subDir);
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename()
                    .replaceAll("[^a-zA-Z0-9._-]", "_");
            Path target = subDir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return subfolder + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
        }
    }

    public String toAbsoluteUrl(String relativePath) {
        if (relativePath == null) return null;
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(relativePath)
                .toUriString();
    }
}
