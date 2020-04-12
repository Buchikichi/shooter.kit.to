package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioView;
import to.kit.shooter.entity.type.AudioType;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.repository.AudioRepository;
import to.kit.shooter.repository.AudioViewRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class AudioService implements BasicServiceInterface<AudioView> {
	@Autowired
	private AudioRepository audioRepository;
	@Autowired
	private AudioViewRepository audioViewRepository;

	@Override
	public List<AudioView> list(FilteringForm<AudioView> form) {
		AudioView criteria = form.getCriteria();
		String mediasetId = criteria.getMediaset().getId();
		AudioType type = criteria.getAudioType();

		return this.audioViewRepository.findByMediasetIdAndAudioTypeOrderByName(mediasetId, type);
	}

	@Override
	public AudioView select(String id) {
		return this.audioViewRepository.findById(id).get();
	}

	public Audio findOne(String id) {
		return this.audioRepository.findById(id).get();
	}

	public Audio findByName(String name) {
		return this.audioRepository.findByName(name);
	}

	public Audio save(Audio entity) {
		String id = entity.getId();
		Audio prev = null;

		if (entity.getAudioSeq().longValue() == 0) {
			entity.setAudioSeq(new SeqType());
		}
		if (id != null && !id.isEmpty()) {
			prev = this.audioRepository.findById(id).get();
		}
		if (prev != null) {
			String webm = entity.getWebm();
			String audio = entity.getAudio();

			if (webm == null || webm.isEmpty()) {
				entity.setWebm(prev.getWebm());
			}
			if (audio == null || audio.isEmpty()) {
				entity.setAudio(prev.getAudio());
			}
			entity.setId(prev.getId());
			entity.setCreated(prev.getCreated());
			entity.setUpdated(new Date());
		}
		return this.audioRepository.saveAndFlush(entity);
	}
}
