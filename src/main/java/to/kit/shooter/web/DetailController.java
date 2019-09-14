package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.service.ProductDetailService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ProductDetailForm;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

/**
 * プロダクト詳細.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/detail")
@SessionAttributes(types = LoginInfo.class)
public class DetailController implements BasicControllerInterface<ProductDetail> {
	@Autowired
	private ProductDetailService productDetailService;
	@Autowired
	private LoginInfo loginInfo;

	private String getCustomerId() {
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return null;
		}
		return customer.getId();
	}

	@RequestMapping("/list")
	@ResponseBody
	@Override
	public ResultListForm list(FilteringForm form) {
		ResultListForm result = new ResultListForm();
		List<ListItem> resultList = result.getResult();
		List<ProductDetail> list = this.productDetailService.list();

		for (ProductDetail detail : list) {
			ListItem item = new ListItem();

			item.setId(detail.getId());
			resultList.add(item);
		}
		return result;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public ProductDetail select(@RequestParam String id) {
		return this.productDetailService.detail(id);
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<ProductDetail> save(ProductDetailForm form) {
		ResultForm<ProductDetail> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		ProductDetail detail = new ProductDetail();
		BeanUtils.copyProperties(form, detail);
		ProductDetail saved = this.productDetailService.saveMap(detail);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		ProductDetail detail = this.productDetailService.detail(id);

		model.addAttribute("detail", detail);
		model.addAttribute("stage", detail.getMap());
		return "edit";
	}
}
