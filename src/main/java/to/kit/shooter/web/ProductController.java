package to.kit.shooter.web;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.entity.Product;
import to.kit.shooter.service.MediasetService;
import to.kit.shooter.service.ProductService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * プロダクト.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/product")
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
	private ProductService productService;
	@Autowired
	private MediasetService mediasetService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Product> form) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		OAuth2User oauth2User = null;
		Map<String, Object> userInfo;
		boolean loggedIn;
		List<Product> list = this.productService.list(form);

		if (auth instanceof OAuth2AuthenticationToken) {
			oauth2User = OAuth2AuthenticationToken.class.cast(auth).getPrincipal();
		}
		if (oauth2User == null) {
			loggedIn = false;
			userInfo = new HashMap<>();
		} else {
			loggedIn = true;
			userInfo = oauth2User.getAttributes();
		}
		model.addAttribute("loggedIn", Boolean.valueOf(loggedIn));
		model.addAttribute("user", userInfo);
		model.addAttribute("productList", list);
		return "_productList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Product select(@PathVariable("id") String id) {
		return this.productService.select(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Product product = this.productService.select(id);

		if (product == null) {
			return "error";
		}
		List<Mediaset> mediasetList = this.mediasetService.list();
		model.addAttribute("product", product);
		model.addAttribute("accessRadio", ACCESS_RADIO);
		model.addAttribute("mediasetList", mediasetList);
		return "editProduct";
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Product> save(@RequestBody Product product, OAuth2AuthenticationToken token) {
		ResultForm<Product> result = new ResultForm<>();

		product.setOwner(token.getName());
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
		Product product = this.productService.select(id);

		if (product == null) {
			return "error";
		}
		model.addAttribute("product", product);
		return "play";
	}

	@RequestMapping("/increase/{id}")
	@ResponseBody
	public ResultForm<Object> increase(@PathVariable("id") String id) {
		ResultForm<Object> result = new ResultForm<>();

		result.setOk(true);
		this.productService.increase(id);
		return result;
	}
}
