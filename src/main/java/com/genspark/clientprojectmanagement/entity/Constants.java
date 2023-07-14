package com.genspark.clientprojectmanagement.entity;

public class Constants {
    public static final String S3_BASE_URI;

    static {
        String bucketName = "shopme-my-files";
        String region = "us-east-1";
        String pattern = "https://%s.s3.amazonaws.com";

        S3_BASE_URI = bucketName == null ? "" : String.format(pattern, bucketName);
    }

}
