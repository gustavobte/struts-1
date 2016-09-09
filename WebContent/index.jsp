<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript">
	function gerarRelatorio(method) {
		var form = document.getElementById('formEstabelecimento');
		form.elements["dispatch"].value = method;
		form.submit();
	}
	function loga() {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var loginForm = document.getElementById('loginForm');
		var menu = document.getElementById('menu');

		if (username == "admin" && password == "admin") {
			loginForm.style.display = 'none';
			menu.style.display = 'initial';
			var contextPath = window.location.pathname.substring(0,
					window.location.pathname.indexOf("/", 2));
			var url = contextPath
					+ "/estabelecimento.do?dispatch\=irPaginaCadastrar";
			location.href = url;
		}
	}
</script>
</head>
<body
	style="padding-top: 0px; padding: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; background-image: url('img/topo.png'); background-repeat: no-repeat;">
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<div style="height: 25px">
		<small>Voce esta aqui: > Login</b></small>
	</div>
	<div id="loginForm">
		<h2>
			<b>Login</b>
		</h2>
		<hr color="#3866B5">


		<form
			style="width: 400px; position: relative; border: 5px; border-color: #3866B5">
			<table>
				<tr>
					<td>Usuario :</td>
					<td><input id="username" name="username" size=15 type="text" />
					</td>
				</tr>
				<tr>
					<td>Senha :</td>
					<td><input id="password" name="password" size=15 type="password" />
					</td>
				</tr>
			</table>
			<input type="button" value="login" onclick="loga()" />
		</form>
	</div>
	<ul id="menu" style="display: none">


		<li><html:link
				href="${pageContext.request.contextPath}/estabelecimento.do?dispatch=irPaginaCadastrar">
				Adicionar Estabelecimento
			</html:link></li>
		<li><html:link
				href="${pageContext.request.contextPath}/estabelecimento.do?dispatch=irPaginaPesquisar">
				Listar Estabelecimento
			</html:link></li>

		<html:form action="/estabelecimento" styleId="formEstabelecimento">
			<html:hidden property="dispatch" />
			<html:button value="Gerar relatório" property=""
				onclick="gerarRelatorio('gerarPDF')" />
		</html:form>

	</ul>
</body>
</html>