document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	constructor() {
		this.selectedId = '';
		this.product = new Product();
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

	setResult(list) {
		// <li><a><img src="img/icon.listview.png"/><span>プロダクト</span><p>説明</p><span class="ui-li-count">22</span></a></li>
		let listView = document.getElementById('listView');

		list.forEach(rec => {
			let li = this.createRow(rec);

			//console.log('name:' + rec.name);
			listView.append(li);
		});
		$(listView).listview('refresh');
	}

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let count = document.createElement('span');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', 'img/icon.listview.png');
		name.textContent = rec.name;
		description.textContent = rec.description;
		count.classList.add('ui-li-count');
		count.textContent = rec.count;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		anchor.append(count);
//		anchor.setAttribute('href', 'product/detail?id=' + rec.id);
		anchor.setAttribute('href', '#detailPopup');
		anchor.setAttribute('data-rel', 'popup');
		li.append(anchor);
		//
		anchor.addEventListener('click', e => {
			e.preventDefault();
			this.clearDetailInfo();
			this.product.select(rec.id).then(data => {
				this.fillDetailInfo(data);
			});
			this.selectedId = rec.id;
		});
		return li;
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
		let playUri = rec.id ? '/product/play?id=' + rec.id : '';
		let playButton = document.getElementById('playButton');
		let editUri = rec.id ? '/product/detail?id=' + rec.id : '';
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
