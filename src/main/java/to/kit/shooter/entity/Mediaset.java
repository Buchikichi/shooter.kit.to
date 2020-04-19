package to.kit.shooter.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

/**
 * Mediaset.
 * @author H.Sasai
 */
@Entity
@Data
public class Mediaset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String owner;
	private int access;
	private String name;
	private String description;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaset", cascade = CascadeType.ALL)
	@JsonBackReference
	private List<Product> productList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaset", cascade = CascadeType.ALL)
	@OrderBy("audioType, audioSeq")
	private List<AudioView> audioList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaset", cascade = CascadeType.ALL)
	@OrderBy("visualType, visualSeq")
	private List<VisualView> visualList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaset", cascade = CascadeType.ALL)
	private List<Actor> actorList = new ArrayList<>();
}
