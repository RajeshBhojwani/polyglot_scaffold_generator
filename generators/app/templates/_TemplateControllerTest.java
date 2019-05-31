package com.dellemc.<%= _.slugify(domainName) %>.controllers;

import com.dellemc.<%= _.slugify(domainName) %>.config.<%= className %>Configuration;
import com.dellemc.<%= _.slugify(domainName) %>.domains.<%= className %>;
import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.mock;

public class <%= className %>ControllerTest {

  @Test
  public void shouldGreet() throws Exception {
    Map<String, String> response = new <%= className %>Controller(mock(<%= className %>Config.class)).index();
    assertThat(response.get("message"), startsWith("yo <%= classOfService %>"));
    assertThat(response.get("date"),notNullValue());
  }

  @Test
  public void shouldReturnDomainObjectWithDomainId() throws Exception {
    ResponseEntity<<%= className %>> domainPojo = new <%= className %>Controller(mock(<%= className %>Config.class)).<%= _.slugify(domainName) %>("deomId");
    assertThat(domainPojo.getStatusCode(),is(HttpStatus.OK));
    assertThat(domainPojo.getBody().get<%= className %>Id(),is("<%= _.slugify(domainName) %>Id"));
  }
}
