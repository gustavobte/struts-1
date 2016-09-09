package com.indra.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.indra.hibernate.HibernateUtil;
import com.indra.model.Estabelecimento;
import com.indra.util.Messages;

public class EstabelecimentoDAO {

	List<Estabelecimento> estabelecimentos;
	private Criteria criteria;

	public EstabelecimentoDAO() {
		this.estabelecimentos = new ArrayList<Estabelecimento>();
	}

	public String createUser(String descricao, String situacao) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			Estabelecimento estabelecimento = new Estabelecimento();
			estabelecimento.setDescricao(descricao);
			estabelecimento.setSituacao(situacao);
			session.save(estabelecimento);
			session.getTransaction().commit();
		} catch (Exception e) {
			System.err.println(Messages.get("estabelecimento.erro.cadastrar") + e.getMessage());
			session.getTransaction().rollback();
			return Messages.get("erro");
		}
		return Messages.get("sucesso");
	}

	public List<Estabelecimento> getEstabelecimentos(String descricao) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			criteria = session.createCriteria(Estabelecimento.class);
			criteria.add(Restrictions.ilike("descricao", "%" + descricao + "%"));
			for (final Object o : criteria.list()) {
				estabelecimentos.add((Estabelecimento) o);
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			System.err.println(Messages.get("estabelecimento.erro.listar") + e);
			session.getTransaction().rollback();
		}
		return estabelecimentos;
	}
}
