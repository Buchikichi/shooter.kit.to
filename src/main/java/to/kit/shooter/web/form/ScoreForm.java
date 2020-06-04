package to.kit.shooter.web.form;

import to.kit.shooter.entity.Scores;

/**
 * Score form.
 * @author H.Sasai
 */
public final class ScoreForm extends ResultForm<Scores> {
	/** serialVersionUID. */
	private static final long serialVersionUID = -1318714608677408311L;

	private int rank;

	public int getRank() {
		return this.rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}
}
