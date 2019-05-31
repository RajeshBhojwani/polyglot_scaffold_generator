package com.dellemc.<%=_.slugify (domainName) %>.test.helpers;

import com.github.dreamhead.moco.resource.ContentResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.github.dreamhead.moco.Moco.file;
import static java.nio.file.Files.readAllBytes;
import static java.nio.file.Paths.get;

public class Utils {

  public static final String TEST_COMMON_DIR = "testCommon";
  public static final String CONTRACT_TEST_DIR = "contractTest";
  public static final String FUNCTIONAL_TEST_DIR = "functionalTest";

  public static File fromFile(String testDir, String fileName) {
    return new File("src/" + testDir + "/resources/" + fileName);
  }

  public static ContentResource contentFromFile(String testDir, String fileName) {
    return file("src/" + testDir + "/resources/" + fileName);
  }

  public static String returnStringFromFile(String testDir, String fileName) throws IOException {
    return new String(Files.readAllBytes(Paths.get("src/" + testDir + "/resources/" + fileName)));
  }

  public static byte[] readFileContent(String testDir, final String filePath) throws IOException {
    return readAllBytes(get("src/" + testDir + "/resources/" + filePath));
  }

}
