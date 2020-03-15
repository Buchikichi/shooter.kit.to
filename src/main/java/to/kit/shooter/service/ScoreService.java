package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Scores;
import to.kit.shooter.repository.ScoreRepository;

@Service
public class ScoreService {
	private static final int MAX_RANK = 10;
	@Autowired
	private ScoreRepository scoreRepository;

	/**
	 * スコア登録.
	 * @param entity スコア
	 * @return ランク
	 */
	public int save(Scores entity) {
		String productId = entity.getProduct().getId();
		List<Scores> list = this.scoreRepository.findAllByProductIdOrderByScoreDesc(productId);
		int rank = 1;

		for (Scores rec : list) {
			if (rec.getScore() < entity.getScore()) {
				break;
			}
			rank++;
		}
		if (MAX_RANK <= rank) {
			// 圏外
			return 0;
		}
		this.scoreRepository.save(entity);
		for (int ix = MAX_RANK; ix <= list.size(); ix++) {
			Scores rec = list.get(ix - 1);

			this.scoreRepository.delete(rec);
		}
		return rank;
	}
}
