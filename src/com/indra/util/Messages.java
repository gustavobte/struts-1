package com.indra.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Messages {

	private static final String RESOURCE_PROPERTIES = "com/indra/resources/config.properties";

	private static Properties configProperties;
	private static InputStream inputStream;

	public static String get(String key) {
		loadProproperties();
		return configProperties.getProperty(key);
	}

	private static void loadProproperties() {
		inputStream = Messages.class.getClassLoader().getResourceAsStream(RESOURCE_PROPERTIES);
		configProperties = new Properties();
		try {
			configProperties.load(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
