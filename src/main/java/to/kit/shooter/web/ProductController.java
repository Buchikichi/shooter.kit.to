package to.kit.shooter.web;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.type.VisualType;
import to.kit.shooter.service.MediasetService;
import to.kit.shooter.service.ProductService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.LoginInfo;
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
	@Autowired
	private MediasetService mediasetService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Product> form) {
		List<Product> list = this.productService.list(form);

		model.addAttribute("productList", list);
		return "_productList";
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Product select(@RequestParam String id) {
		Product product = this.productService.detail(id);

		return product;
	}
	@RequestMapping("/json/{id}")
	@ResponseBody
	public Product json(@PathVariable("id") String id) {
		Product product = this.productService.detail(id);

		return product;
	}

	private Map<VisualType, List<Actor>> makeTypeMap(List<Actor> actorList) {
		Map<VisualType, List<Actor>> map = new HashMap<>();

		for (VisualType type : VisualType.List) {
			map.put(type, new ArrayList<>());
		}
		for (Actor actor : actorList) {
			VisualType type = actor.getType();
			List<Actor> list = map.get(type);

			list.add(actor);
		}
		return map;
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Product product = this.productService.detail(id);

		if (product == null) {
			return "error";
		}
		Map<VisualType, List<Actor>> typeMap = makeTypeMap(product.getActorList());
		List<Mediaset> mediasetList = this.mediasetService.list("");
		model.addAttribute("product", product);
		model.addAttribute("typeMap", typeMap);
		model.addAttribute("accessRadio", ACCESS_RADIO);
		model.addAttribute("mediasetList", mediasetList);
		return "detail";
	}

	@RequestMapping("/save")
	@ResponseBody
	@Override
	public ResultForm<Product> save(@RequestBody Product product) {
		ResultForm<Product> result = new ResultForm<>();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId == null || loginId.isEmpty()) {
			return result;
		}
		product.setOwner(loginId);
		Product saved = this.productService.save(product);

		if (saved == null) {
			return result;
		}
		this.productService.deleteUnusedStage(product);
		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/play/{id}")
	public String play(Model model, @PathVariable("id") String id) {
		Product product = this.productService.detail(id);

		if (product == null) {
			return "error";
		}
		model.addAttribute("product", product);
		return "play";
	}

	@RequestMapping("/increase")
	@ResponseBody
	public ResultForm<Object> increase(@RequestParam String id) {
		ResultForm<Object> result = new ResultForm<>();

		result.setOk(true);
		this.productService.increase(id);
		return result;
	}
}
