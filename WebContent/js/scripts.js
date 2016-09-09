$(function() {

	$().ajaxStart(function() {
		bloquearBrowser();
	});

	$().ajaxComplete(function() {
		desbloquearBrowser();
	});

	$().ajaxSuccess(function(evnt, request, settings) {
		desbloquearBrowser();
	});

	$().ajaxError(function(request, settings, exception) {
		desbloquearBrowser();
	});

	$("form").submit(
			function(eventObject) {
				$('#area-mensagens').hide();

				if ($('#isRelatorio') == undefined
						|| $('#isRelatorio').attr('value') == undefined
						|| $('#isRelatorio').attr('value') == ''
						|| $('#isRelatorio').attr('value') == 'false') {
					try {
						selecionaItensTodasListas();
					} catch (err) {
					}
					bloquearBrowser();
				} else {
					$('#isRelatorio').attr('value', 'false');
				}
			});

	$("input[type='submit']")
			.click(
					function(eventObject) {
						if (($(this).attr('value').toUpperCase() == 'CONSULTAR')
								|| ($(this).attr('value').toUpperCase() == 'CONSULTA')) {
							$("input[name='paginaAtual']").attr('value', '1');
						}
					});

	// Dialog exemplo
	$('#dialog-exemplo').dialog({
		autoOpen : false,
		modal : true,
		width : 600,
		height : 400,
		resizable : false
	});

	// Dialog exemplo link
	$('#dialog-exemplo-link').click(function() {
		$('#dialog-exemplo').dialog('open');
		return false;
	});

	// Dialog confirm
	$('#dialog-confirm').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			"Não" : function() {
				$(this).dialog("close");
			},
			"Sim" : function() {
				submeter();
				$(this).dialog("close");
			}
		}
	});

	// Dialog confirm link
	$('#dialog-confirm-link').click(function() {
		$('#dialog-confirm').dialog('open');
		return false;
	});

	// Dialog funções gerais
	$('#dialog-funcoes').dialog({
		autoOpen : false,
		modal : true,
		width : 600,
		height : 400,
		resizable : false
	});

	// Dialog fiunções gerais link
	$('#dialog-funcoes-link').click(function() {
		$('#dialog-funcoes').dialog('open');
		return false;
	});

	// Dialog fiunções gerais link
	$('#dialog-situacao-link').click(function() {
		$('#dialog-situacao').dialog('open');
		return false;
	});

});

function dwrErrorHandler(mensagem, exception) {
	if (exception.javaClassName == 'br.gov.mapa.arquitetura.exception.BusinessExceptionAlert') {
		desbloquearBrowser();
		adicionarMensagem(mensagem, 'A');
	} else if (exception.javaClassName == 'br.gov.mapa.arquitetura.exception.BusinessExceptionInfo') {
		desbloquearBrowser();
		adicionarMensagem(mensagem, 'S');
	} else {
		desbloquearBrowser();
		adicionarMensagem(mensagem, 'E');
	}
}

function adicionarMensagem(mensagem, tipo) {
	exibirMensagem("area-mensagens", mensagem, tipo);
}

function exibirMensagem(id, mensagem, tipo) {
	if (tipo == 'A') {
		$('#' + id).html(
				"<ul class='msg-alerta'><li><span>"
						+ mensagem.replace(/~/g, "<br/>")
						+ "<br></span></li></ul>");
	} else if (tipo == 'S') {
		$('#' + id).html(
				"<ul class='msg-sucesso'><li><span>"
						+ mensagem.replace(/~/g, "<br/>")
						+ "<br></span></li></ul>");
	} else {
		$('#' + id).html(
				"<ul class='msg-erro'><li><span>"
						+ mensagem.replace(/~/g, "<br/>")
						+ "<br></span></li></ul>");
	}
	$('#' + id).show();
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
}

function bloquearBrowser() {
	$("#bloquerBrowser").show();
}

function desbloquearBrowser() {
	$("#bloquerBrowser").hide();
}

function chkBoxChildByName(objectCheck, nameChkChildArquivo) {
	var isChecked = !$(objectCheck).attr("checked");
	$('input[name="' + nameChkChildArquivo + '"]').each(function() {
		if (this.disabled == false) {
			$(this).attr("checked", !isChecked);
		}
	});
	return true;
}

/*
 * Remover a div de mensagens da popup
 */
function removerBarraMensagensPopup(popup) {
	$("#" + popup + " > div").hide();
}

function removerBarraMensagens() {
	$('#area-mensagens').hide();
}

function removerAreaMensagem() {
	$('#area-mensagens').hide();
	$('#areaMensagemDownload').html('');
}

function abrirManualUsuario(ref) {
	window.open('paginas/manualusuario/MAPA-SISRESVEGETAL_Manual_do_Usuário.htm#' + ref, 'SISRESVEGETAL_AJUDA',
					'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=800,height=400');
}

function htmlFocus(elemento) {
	if (document.getElementById(elemento) != undefined && document.getElementById(elemento).disabled == false)
		document.getElementById(elemento).focus();
}

function validaData(digData) {
	var bissexto = 0;
	var data = digData.value;
	var tam = data.length;
	if (tam == 10) {
		var dia = data.substr(0, 2);
		var mes = data.substr(3, 2);
		var ano = data.substr(6, 4);
		if ((ano > 1900) || (ano < 2100)) {
			switch (mes) {
			case '01':
			case '03':
			case '05':
			case '07':
			case '08':
			case '10':
			case '12':
				if (dia <= 31) {
					return true;
				}
				break

			case '04':
			case '06':
			case '09':
			case '11':
				if (dia <= 30) {
					return true;
				}
				break
			case '02':
				/* Validando ano Bissexto / fevereiro / dia */
				if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0)) {
					bissexto = 1;
				}
				if ((bissexto == 1) && (dia <= 29)) {
					return true;
				}
				if ((bissexto != 1) && (dia <= 28)) {
					return true;
				}
				break
			}
		}

		digData.value = '';
	} else {
		digData.value = '';
	}

	return false;
}

function limitarTextArea(limitField, limitNum) {
	var length = 0;
	for (var i = 0; i < limitField.value.length; i++) {
		if (limitField.value[i] == '\r' || limitField.value[i] == '\n') {
			length += 2;
			if (i < limitNum) {
				limitNum = limitNum - 1;
			}
		} else {
			length++;
		}
	}
	if (length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	}
}

function validaTamanhoCampo(campo, tamanhoPermitido) {
	var tamanho = campo.value.length;
	if (tamanho != tamanhoPermitido) {
		campo.value = '';
	}
}

function somenteNumero(campo) {

	var digits = "0123456789";
	var campo_temp;

	for (var i = 0; i < campo.value.length; i++) {
		campo_temp = campo.value.substring(i, i + 1);
		if (digits.indexOf(campo_temp) == -1) {
			campo.value = campo.value.substring(0, i);
		}
	}
}

function configuraData(data) {
	$("#" + data).setMask({
		mask : "99/99/9999"
	});
	$("#" + data).datepicker({
		changeMonth : true,
		changeYear : true,
		yearRange : "1900:2050",
		showOn : 'focus',
		beforeShow : function(input) {
			$(input).dialog("widget").css({
				"position" : "relative",
				"z-index" : 1000
			});
		},
		onClose : function(input) {
			$(input).dialog("widget").css({
				"position" : "initial",
				"z-index" : 0
			});
			$(this).css({
				"position" : "initial",
				"z-index" : 0
			});
		}
	});
}

function limparParametroOrdenacao() {
	$("input[name='paginaAtual']").attr('value', '1');
	$("input[name='parametrosConsulta.parametroAscDesc']").val('');
	$("input[name='parametrosConsulta.parametroOrdenacao']").val('');
}

function selecionarItensLista(idLista) {
	var objectSelect = document.getElementById(idLista);

	if (objectSelect != null) {
		for (var i = 0; i < objectSelect.options.length; i++) {
			objectSelect.options[i].selected = true;
		}
	}
}

function tirarSelecaoItensLista(idLista) {
	var objectSelect = document.getElementById(idLista);

	if (objectSelect != null) {
		for (var i = 0; i < objectSelect.options.length; i++) {
			objectSelect.options[i].selected = false;
		}
	}
}

function controlarHabilitacaoCampos(name, strCampos) {
	var valor = $("input:radio[name='" + name + "']:checked").val();

	var arrCampos = strCampos.split(',');
	var habilita = false

	if (valor != undefined && valor != null && valor != '' && valor == 'S') {
		habilita = true;
	}

	var i = 0;
	for (var i = 0; i < arrCampos.length; i++) {
		if (habilita) {
			$('#' + arrCampos[i]).removeAttr('disabled');
		} else {
			$('#' + arrCampos[i]).attr('disabled', 'disabled');
		}
	}
}

function aplicaMascaraTelefone(campo) {
	var valor = $(campo).val();

	valor = valor.replace(/[^0-9]/g, '');

	if (valor.length == 8) {
		$(campo).setMask("9999-9999");
	} else if (valor.length == 9) {
		$(campo).setMask("99999-9999");
	} else {
		$(campo).val('');
		$(campo).setMask("999999999");
	}
}

function limparMascaraTelefone(campo) {
	valor = $(campo).val().replace(/[^0-9]/g, '');
	$(campo).setMask("999999999");
	$(campo).val(valor);
}

function aplicaMascaraTelefoneOnMouseMove(campo) {
	validarMascara(campo, '0123456789-)( ');
}

function validarMascara(campo, caracteresAceitaveis) {
	var campo_temp;

	if (campo.value != null && campo.value != undefined) {
		for (var i = 0; i < campo.value.length; i++) {
			campo_temp = campo.value.substring(i, i + 1);
			if (caracteresAceitaveis.indexOf(campo_temp) == -1) {
				campo.value = campo.value.substring(0, i);
			}
		}
	}
}

function isChkBoxByNameChecked(nameChk) {
	var n = $("input[name='" + nameChk + "']:checked").length;
	if (n != undefined && n > 0) {
		return true;
	}
	return false;
}

function validarMascara(campo, caracteresAceitaveis) {
	var campo_temp;

	if (campo.value != null && campo.value != undefined) {
		for (var i = 0; i < campo.value.length; i++) {
			campo_temp = campo.value.substring(i, i + 1);
			if (caracteresAceitaveis.indexOf(campo_temp) == -1) {
				campo.value = campo.value.substring(0, i);
			}
		}
	}
}

function controlCheckAll(objectCheck, nameCheckAll) {

	var name = $(objectCheck).attr('name');

	var totalMarcados = $("input:checkbox[name='" + name + "']:checked").length;
	var totalChecks = $("input:checkbox[name='" + name + "']").length;
	var totalDesabilitados = $("input:checkbox[name='" + name + "']:disabled").length

	if (totalMarcados == (totalChecks - totalDesabilitados)) {
		$('#' + nameCheckAll).attr('checked', 'checked');
	} else {
		$('#' + nameCheckAll).removeAttr('checked');
	}
}

/*
 * 
 * Essa função permite mascarar um campo numerico com casas decimais e que
 * 
 * aceite apagar os valores sem deixar 0,00
 * 
 * 
 * 
 */

function maskNumber(event, element, limit, centsLimit, allowNegative) {

	var tecla = event.keyCode || event.witch;

	var valor = $(element).val();

	if (valor != '') {

		valor = valor.replace('\.', '').replace(',', '\.');

	}

	if (isNaN(valor)
			|| ((tecla == 8 || tecla == 46) && (valor == '' || parseFloat(valor) == 0))) {

		$(element).val('');

		$(element).unbind();

	} else {

		maskMoney(element, limit, centsLimit, allowNegative);

	}

}

function maskMoney(element, limit, centsLimit, allowNegative) {

	if (allowNegative == undefined) {

		allowNegative = false;

	}

	if (centsLimit == undefined) {

		centsLimit = 2;

	}

	// Configuração para campos de Real.

	$(element).priceFormat({

		limit : limit,

		centsLimit : centsLimit,

		allowNegative : allowNegative

	});

}
function aplicaMascaraCnpjCpf(campo) {
	var valor = $(campo).val();

	if (typeof valor != "undefined") {
		valor = valor.replace(/[^0-9]/g, '');
		if (valor.length == 11) {
			$(campo).setMask("999.999.999-99");
		} else if (valor.length == 14) {
			$(campo).setMask("99.999.999/9999-99");
		} else {
			$(campo).val('');
			$(campo).setMask("99999999999999");
		}
	}
}


function aplicaMascaraCnpjCpfOnMouseMove(campo) {
	validarMascara(campo, '0123456789-./');
}

function aplicaMascaraTelefoneOnMouseMove(campo) {
	validarMascara(campo, '0123456789-)( ');
}

function validarMascara(campo, caracteresAceitaveis) {
	var campo_temp;

	if (campo.value != null && campo.value != undefined) {
		for (var i = 0; i < campo.value.length; i++) {
			campo_temp = campo.value.substring(i, i + 1);
			if (caracteresAceitaveis.indexOf(campo_temp) == -1) {
				campo.value = campo.value.substring(0, i);
			}
		}
	}
}

function limparMascaraCpfCnpj(campo) {
	valor = $(campo).val().replace(/[^0-9]/g, '');
	$(campo).setMask("99999999999999");
	$(campo).val(valor);
}