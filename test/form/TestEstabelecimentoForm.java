package form;

import org.apache.struts.action.ActionForm;
import org.junit.Before;
import org.junit.Test;

import com.indra.form.EstabelecimentoForm;
import static org.junit.Assert.assertEquals;

public class TestEstabelecimentoForm extends ActionForm {

	private EstabelecimentoForm estabelecimentoForm;

	@Before
	public void init() {
		this.estabelecimentoForm = new EstabelecimentoForm();
	}

	@Test
	public void testReset() {
		this.estabelecimentoForm.setDescricao("Teste");
		this.estabelecimentoForm.reset();
		assertEquals(this.estabelecimentoForm.getDescricao(), null);
	}

}
