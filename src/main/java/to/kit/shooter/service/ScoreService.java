package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.Scores;
import to.kit.shooter.repository.ScoreRepository;

@Service
public class ScoreService {
	private static final int MAX_RANK = 10;
	@Autowired
	private ScoreRepository scoreRepository;

	/**
	 * スコア登録.
	 * @param productId プロダクトID
	 * @param score スコア
	 * @return ランク
	 */
	public int register(String productId, int score) {
		List<Scores> list = this.scoreRepository.findAllByProductIdOrderByScoreDesc(productId);
		int rank = 1;

		for (Scores rec : list) {
			if (rec.getScore() < score) {
				break;
			}
			rank++;
		}
		if (MAX_RANK <= rank) {
			// 圏外
			return 0;
		}
		Product product = new Product();
		Scores newScore = new Scores();

		product.setId(productId);
		newScore.setProduct(product);
		newScore.setScore(score);
		this.scoreRepository.save(newScore);
		for (int ix = MAX_RANK; ix <= list.size(); ix++) {
			Scores rec = list.get(ix - 1);

			this.scoreRepository.delete(rec);
		}
		return rank;
	}
}
