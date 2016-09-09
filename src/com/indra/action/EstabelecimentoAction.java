package com.indra.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.indra.dao.EstabelecimentoDAO;
import com.indra.form.EstabelecimentoForm;
import com.indra.model.Estabelecimento;
import com.indra.util.Messages;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class EstabelecimentoAction extends DispatchAction {

	/**
	 * Ir para página pesquisar
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward irPaginaPesquisar(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("pesquisar");
	}

	/**
	 * Pesquisa estabelecimentos que contenham a descrição informada pelo
	 * usuário
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward pesquisarEstabelecimentos(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		EstabelecimentoForm estabelecimentoForm = (EstabelecimentoForm) form;
		List<Estabelecimento> estabelecimentos = new EstabelecimentoDAO().getEstabelecimentos((estabelecimentoForm.getDescricao()));
		request.setAttribute("estabelecimentos", estabelecimentos);
		return mapping.findForward("pesquisar");
	}

	/**
	 * Ir para página cadastrar
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward irPaginaCadastrar(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("cadastrar");
	}

	/**
	 * Cria um novo estabelecimento
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward cadastrarEstabelecimento(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		EstabelecimentoForm estabelecimentoForm = (EstabelecimentoForm) form;
		String result = new EstabelecimentoDAO().createUser(estabelecimentoForm.getDescricao(), estabelecimentoForm.getSituacao());
		if (result.equals(Messages.get("sucesso"))) {
			request.setAttribute(Messages.get("sucesso"), true);
			estabelecimentoForm.reset();
		} else {
			request.setAttribute(Messages.get("erro"), true);
		}
		return mapping.findForward("cadastrar");
	}

	/**
	 * Remove um estabelecimento
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward removerEstabelecimentos(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		EstabelecimentoForm estabelecimentoForm = (EstabelecimentoForm) form;
		String result = new EstabelecimentoDAO().createUser(estabelecimentoForm.getDescricao(), estabelecimentoForm.getSituacao());
		if (result.equals(Messages.get("sucesso"))) {
			request.setAttribute(Messages.get("sucesso"), true);
			estabelecimentoForm.reset();
		} else {
			request.setAttribute(Messages.get("erro"), true);
		}
		return mapping.findForward("cadastrar");
	}

	/**
	 * Gera PDF
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward gerarPDF(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Document document = new Document();
		List<Estabelecimento> estabelecimentos = new EstabelecimentoDAO().getEstabelecimentos("");
		try {
			Font font1 = new Font(Font.FontFamily.HELVETICA, 28, Font.BOLD);
			response.setHeader("Content-Disposition", "inline; filename=\"rel-estabelecimento" + new Date() + ".pdf\"");
			response.setContentType("application/pdf; name=\"rel-estabelecimento" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()) + ".pdf\"");
			PdfWriter.getInstance(document, response.getOutputStream());
			document.open();

			Paragraph para = new Paragraph();
			para.add("Relatório de estabelecimentos cadastrados");
			para.setAlignment(Element.ALIGN_CENTER);
			para.setFont(font1);
			document.add(para);
			for (Estabelecimento estabelecimento : estabelecimentos) {
				document.add(new Paragraph(estabelecimento.getDescricao() + " - " + estabelecimento.getSituacao()));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		document.close();
		return null;
	}

}
