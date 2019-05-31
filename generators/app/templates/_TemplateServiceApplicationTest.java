package com.dellemc.<%= _.slugify(domainName) %>.config;

import com.dellemc.<%= _.slugify(classOfService) %>.boot.<%= classOfService %>Application;
import org.hamcrest.Matchers;
import org.junit.Test;
import static org.junit.Assert.assertThat;

public class <%= className %>ServiceApplicationTest {

  @Test
  public void shouldExtendXspApplication() throws Exception {
    <%= className %>ServiceApplication app = new <%= className %>ServiceApplication();
    assertThat(app, Matchers.instanceOf(<%= classOfService %>Application.class));
  }
}
