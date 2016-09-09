package com.indra.hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.indra.util.Messages;

public class HibernateUtil {

	private static final String HIBERNATE_CFG_XML = Messages.get("hibernate.config");
	private static SessionFactory sessionFactory;

	private static Configuration config;

	public static void initialize() {
		try {
			config = new Configuration();
			config.configure(HibernateUtil.class.getResource(HIBERNATE_CFG_XML));
			sessionFactory = config.buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println(Messages.get("hibernate.session.factory.erro") + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static void shutdown() {
		sessionFactory.close();
	}

}
