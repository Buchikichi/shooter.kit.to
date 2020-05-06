package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.service.UtilsService;
import to.kit.shooter.web.form.ResultForm;

/**
 * @author H.Sasai
 */
@Controller
@RequestMapping("/utils")
public class UtilsController {
	@Autowired
	private UtilsService service;

	@RequestMapping("/uuid")
	@ResponseBody
	public ResultForm<String> uuid() {
		ResultForm<String> result = new ResultForm<>();

		result.setResult(this.service.createUUID());
		result.setOk(true);
		return result;
	}
}
