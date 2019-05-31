package com.dellemc.<%= _.slugify(domainName) %>.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Component;

@Component
@RefreshScope
public class <%= className %>Config {

    @Value("<%= serviceNameKey %>")
    private String serviceName;

    public String getServiceName() {
        return serviceName;
    }
}
