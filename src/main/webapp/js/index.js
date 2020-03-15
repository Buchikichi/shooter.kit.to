document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	constructor() {
		this.selectedId = '';
		this.product = new ProductEntity();
		this.loadProducts();

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

	loadProducts() {
		let listView = document.getElementById('listView');

		$.mobile.loading('show', { theme: 'b', text: 'Loading...', textVisible: true });
		this.product.list().then(doc => {
			doc.querySelectorAll('li').forEach(li => listView.appendChild(li));
			$(listView).listview('refresh');
			$.mobile.loading('hide');
		});
	}

	checkCustomer() {
		this.customer.check().then(data => {
			if (data.ok) {
				let repositoryButton = document.getElementById('repositoryButton');
				let editButton = document.getElementById('editButton');

				repositoryButton.classList.remove('ui-state-disabled');
				// editButton.classList.remove('ui-state-disabled');
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
}
