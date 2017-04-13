package to.kit.shooter.web;

import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Product;
import to.kit.shooter.service.ProductService;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ProductForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * プロダクト.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/product")
@SessionAttributes(types = LoginInfo.class)
public class ProductController implements BasicControllerInterface<Product> {
	private static final Map<String, Integer> ACCESS_RADIO = Collections
			.unmodifiableMap(new LinkedHashMap<String, Integer>() {
				/** serialVersionUID. */
				private static final long serialVersionUID = 8352058153426626083L;
				{
					put("Private", Integer.valueOf(0));
					put("Protected", Integer.valueOf(1));
					put("Public", Integer.valueOf(2));
				}
			});

	@Autowired
	private LoginInfo loginInfo;
	@Autowired
	private ProductService productService;

	@RequestMapping("/list")
	@ResponseBody
	@Override
	public List<Product> list() {
		return this.productService.list();
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Product select(@RequestParam String id) {
		Product product = this.productService.detail(id);

		return product;
	}

	@RequestMapping("/detail")
	public String detail(Model model, ProductForm form) {
		Product product = this.productService.detail(form.getId());

		model.addAttribute("product", product);
		model.addAttribute("accessRadio", ACCESS_RADIO);
		return "detail";
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm save(ProductForm form) {
		ResultForm result = new ResultForm();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId == null || loginId.isEmpty()) {
			return result;
		}
		Product entity = new Product();
		BeanUtils.copyProperties(form, entity);
		entity.setOwner(loginId);
		entity.setUpdated(new Date());
		Product saved = this.productService.save(entity);

		result.setInfo(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/play")
	public String play(Model model, ProductForm form) {
		Product product = this.productService.detail(form.getId());

		model.addAttribute("product", product);
		return "play";
	}
}
