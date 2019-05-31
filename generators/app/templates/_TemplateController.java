package com.dellemc.<%= _.slugify(domainName) %>.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.dellemc.<%= _.slugify(domainName) %>.domains.<%= className%>;
import com.dellemc.<%= _.slugify(domainName) %>.config.<%= className%>Config;

@RestController
public class <%= className %>Controller {

  private final <%= className %>Config config;

  @Autowired
  public <%= className %>Controller(<%= className %>Config config) {
    this.config = config;
  }

  @RequestMapping(method={RequestMethod.GET}, value="/<%= _.slugify(domainName) %>/{<%= _.slugify(domainName) %>Id}", produces=MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<<%= className%>> retrieve<%= _.slugify(domainName) %>(@PathVariable String <%= _.slugify(domainName) %>Id) {
    return new ResponseEntity<<%= className%>>(new <%= className%>(<%= _.slugify(domainName) %>Id), HttpStatus.OK);
  }

 

}
