document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	constructor() {
		this.selectedId = '';
		this.product = new ProductEntity();
		this.product.list().then(data => {
			this.setResult(data);
		});
		// Customer
		this.customer = new Customer();
		$('#loginForm').submit(()=> {
			let userid = $('#loginPanel [name=userid]').val();
			let passwd = $('#loginPanel [name=passwd]').val();

			this.setMessage();
			this.customer.signIn(userid, passwd).then(data => {
				if (data.ok) {
					$('#loginPanel').panel('close');
					this.checkCustomer();
				} else {
					this.setMessage('Incorrect username or password.');
				}
			});
			return false;
		});
		this.checkCustomer();
	}

	checkCustomer() {
		this.customer.check().then(data => {
			if (data.ok) {
				let repositoryButton = document.getElementById('repositoryButton');
				let editButton = document.getElementById('editButton');

				repositoryButton.classList.remove('ui-state-disabled');
				editButton.classList.remove('ui-state-disabled');
				$('#loginPanel [name=passwd]').hide();
				$('#loginPanel button').hide();
//				$('#loginForm').hide();
			}
		});
	}

	setMessage(msg = null) {
		let messageArea = document.querySelector('#loginPanel .message');

		messageArea.textContent = msg;
	}

	getHighScore(rec) {
		if (rec.scoreList.length == 0) {
			return null;
		}
		let score = rec.scoreList[0].score;

		return Number(score).toLocaleString();
	}

	setResult(list) {
		// <li><a><img src="img/icon.listview.png"/><span>プロダクト</span><p>説明</p><span class="ui-li-count">22</span></a></li>
		let listView = document.getElementById('listView');

		list.forEach(rec => {
			rec['href'] = '#detailPopup';
			let listviewRow = new ListviewRow(rec, 'img/icon.listview.png');
			let highScore = this.getHighScore(rec);

			if (highScore) {
				// <p class="ui-li-aside"><strong>6:24</strong>PM</p>
				let score = document.createElement('p');

				score.textContent = 'High score: ' + highScore;
				score.classList.add('ui-li-aside');
				listviewRow.anchor.appendChild(score);
			}
			listView.appendChild(listviewRow.li);
			listviewRow.anchor.addEventListener('click', e => {
				e.preventDefault();
				this.clearDetailInfo();
				this.product.select(rec.id).then(data => {
					this.fillDetailInfo(data);
				});
				this.selectedId = rec.id;
			});
		});
		$(listView).listview('refresh');
	}

	clearDetailInfo() {
		let rec = {
			name: null,
			description: null,
			updated: '',
		};
		this.fillDetailInfo(rec);
	}

	fillDetailInfo(rec) {
		let updated = rec.updated ? new Date(rec.updated).toISOString() : '';
		let playUri = rec.id ? '/product/play/' + rec.id : '';
		let playButton = document.getElementById('playButton');
		let editUri = rec.id ? '/product/detail/' + rec.id : '';
		let editButton = document.getElementById('editButton');

		document.getElementById('productName').value = rec.name;
		document.getElementById('productDescription').value = rec.description;
		document.getElementById('updated').textContent = updated;
		playButton.setAttribute('href', playUri);
		editButton.setAttribute('href', editUri);
		if (rec.id) {
			playButton.classList.remove('ui-state-disabled');
		} else {
			playButton.classList.add('ui-state-disabled');
		}
	}
}
