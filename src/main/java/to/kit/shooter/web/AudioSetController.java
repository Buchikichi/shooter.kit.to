package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.AudioSet;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.AudioSetService;
import to.kit.shooter.web.form.AudioSetForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

/**
 * オーディオセット.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/audioSet")
@SessionAttributes(types = LoginInfo.class)
public class AudioSetController implements BasicControllerInterface<AudioSet> {
	@Autowired
	private AudioSetService audioSetService;
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
	public ResultListForm list() {
		ResultListForm form = new ResultListForm();
		List<ListItem> resultList = form.getResult();

		for (AudioSet stage : this.audioSetService.list("")) {
			ListItem item = new ListItem();

			item.setId(stage.getId());
			item.setName(stage.getName());
			resultList.add(item);
		}
		return form;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public AudioSet select(@RequestParam String id) {
		return this.audioSetService.detail(id);
	}

	/**
	 * パネルでの保存.
	 * @param form フォーム
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<AudioSet> save(AudioSetForm form) {
		ResultForm<AudioSet> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		AudioSet audioSet = new AudioSet();
		BeanUtils.copyProperties(form, audioSet);
		audioSet.setOwner(customerId);
		AudioSet saved = this.audioSetService.save(audioSet);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}
