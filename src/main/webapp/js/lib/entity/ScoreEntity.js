/**
 * スコア.
 */
class ScoreEntity extends EntityBase {
	constructor() {
		super('score');
	}

	/**
	 * スコア登録.
	 */
	register(formData) {
		return AjaxUtils.post('/score/register', formData);
	}
}
