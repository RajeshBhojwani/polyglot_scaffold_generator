package com.dellemc.<%= _.slugify(domainName) %>.domains;

public final class <%= className%> {

	private final String <%= _.slugify(domainName)%>Id;

	public <%= className%>(String id) {
		<%= _.slugify(domainName) %>Id = id;
	}

	public String get<%= className%>Id() {
		return <%= _.slugify(domainName) %>Id;
	}

}
