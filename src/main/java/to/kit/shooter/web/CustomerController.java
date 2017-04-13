package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.CustomerService;
import to.kit.shooter.web.form.CustomerForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * 利用者.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	@Autowired
	private LoginInfo loginInfo;

	@RequestMapping("/check")
	@ResponseBody
	public ResultForm check() {
		ResultForm resultForm = new ResultForm();
		Customer customer = this.loginInfo.getCustomer();

		if (customer != null) {
			String id = customer.getId();

			if (id != null && !id.isEmpty()) {
				resultForm.setOk(true);
				resultForm.setInfo(customer);
			}
		}
		return resultForm;
	}

	@RequestMapping("/signIn")
	@ResponseBody
	public ResultForm signIn(CustomerForm form) {
		ResultForm resultForm = new ResultForm();
		Customer customer = this.customerService.signIn(form.getUserid(), form.getPasswd());

		if (customer != null) {
			customer.setEmail(null);
			customer.setPassword(null);
			this.loginInfo.setCustomer(customer);
			resultForm.setOk(true);
		}
		return resultForm;
	}
}
