package com.dellemc.<%=_.slugify (domainName) %>.test.helpers;

import com.github.dreamhead.moco.HttpServer;
import com.github.dreamhead.moco.Moco;
import com.github.dreamhead.moco.RequestMatcher;
import com.jayway.restassured.RestAssured;
import com.jayway.restassured.specification.RequestSpecification;
import org.junit.Before;
import org.junit.BeforeClass;

import static com.github.dreamhead.moco.Moco.*;


public class BaseServiceTest {

    protected HttpServer mocoServer;

    @BeforeClass
    public static void setup() {
    }

    @Before
    public void setUp() throws Exception {
    }


}
