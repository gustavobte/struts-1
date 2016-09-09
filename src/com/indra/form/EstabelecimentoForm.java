package com.indra.form;

import org.apache.struts.action.ActionForm;

public class EstabelecimentoForm extends ActionForm {
	private static final long serialVersionUID = 1L;

	private String dispatch;
	private String descricao;
	private String situacao;

	public void reset() {
		this.descricao = null;
		this.situacao = null;
	}

	public String getDispatch() {
		return dispatch;
	}

	public void setDispatch(String dispatch) {
		this.dispatch = dispatch;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

}
