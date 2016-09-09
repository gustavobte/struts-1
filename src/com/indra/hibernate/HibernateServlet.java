package com.indra.hibernate;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.indra.util.Messages;


public class HibernateServlet implements ServletContextListener {


	public void contextDestroyed(ServletContextEvent arg0) {
		
	}

	public void contextInitialized(ServletContextEvent arg0) {
		try {
			HibernateUtil.initialize();
		} catch (Throwable ex) {
			System.err.println(Messages.get("hibernate.ini.erro") + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}
}