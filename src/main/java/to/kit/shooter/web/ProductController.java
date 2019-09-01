package to.kit.shooter.web;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.ActorType;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.ProductActor;
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.entity.Scores;
import to.kit.shooter.service.MediasetService;
import to.kit.shooter.service.ProductDetailService;
import to.kit.shooter.service.ProductService;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ProductForm;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

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
	private ProductDetailService productDetailService;
	@Autowired
	private MediasetService mediasetService;

	@RequestMapping("/list")
	@ResponseBody
	@Override
	public ResultListForm list() {
		ResultListForm form = new ResultListForm();
		List<ListItem> resultList = form.getResult();
		List<Product> list = this.productService.list();
		NumberFormat formatter = NumberFormat.getNumberInstance(); 

		for (Product product : list) {
			ListItem item = new ListItem();
			String count = String.valueOf(product.getCount());
			List<Scores> scoreList = product.getScoreList();

			item.setId(product.getId());
			item.setName(product.getName());
			item.setDescription(product.getDescription());
			item.setCount(count);
			if (0 < scoreList.size()) {
				Scores score = scoreList.get(0);
				String text = formatter.format(Integer.valueOf(score.getScore()));

				item.setAside(text);
			}
			resultList.add(item);
		}
		return form;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Product select(@RequestParam String id) {
		Product product = this.productService.detail(id);

		return product;
	}

	@RequestMapping("/selectDetail")
	@ResponseBody
	public Product selectDetail(@RequestParam String id) {
		ProductDetail detail = this.productDetailService.detail(id);
		Product product = detail.getProduct();

		product.getActorList().sort((a, b) -> a.getSeq() - b.getSeq());
		return product;
	}

	private Map<ActorType, List<ProductActor>> makeTypeMap(List<ProductActor> actorList) {
		Map<ActorType, List<ProductActor>> map = new HashMap<>();

		for (ProductActor productActor : actorList) {
			ActorType type = ActorType.getType(productActor.getType());
			List<ProductActor> list = map.get(type);

			if (list == null) {
				list = new ArrayList<>();
				map.put(type, list);
			}
			list.add(productActor);
		}
		return map;
	}

	@RequestMapping("/detail/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Product product = this.productService.detail(id);

		if (product == null) {
			return "error";
		}
		Map<ActorType, List<ProductActor>> typeMap = makeTypeMap(product.getActorList());
		List<Mediaset> mediasetList = this.mediasetService.list("");
		model.addAttribute("product", product);
		model.addAttribute("typeMap", typeMap);
		model.addAttribute("accessRadio", ACCESS_RADIO);
		model.addAttribute("mediasetList", mediasetList);
		return "detail";
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Product> save(ProductForm form) {
		ResultForm<Product> result = new ResultForm<>();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId == null || loginId.isEmpty()) {
			return result;
		}
		Product product = new Product();

		BeanUtils.copyProperties(form, product);
		if (product.getDetailList() == null) {
			product.setDetailList(new ArrayList<>());
		}
		if (product.getActorList() == null) {
			product.setActorList(new ArrayList<>());
		}
		product.setOwner(loginId);
		Product saved = this.productService.save(product);

		if (saved == null) {
			return result;
		}
		this.productService.deleteUnusedStage(saved);
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
	public ResultForm<Object> play(@RequestParam String id) {
		ResultForm<Object> result = new ResultForm<>();

		result.setOk(true);
		this.productService.increase(id);
		return result;
	}
}
