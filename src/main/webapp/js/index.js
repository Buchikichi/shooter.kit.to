document.addEventListener('DOMContentLoaded', () => new ProductIndexMain());

class ProductIndexMain {
	constructor() {
		let listView = document.getElementById('listView');

		$.mobile.loading('show', { theme: 'b', text: 'Loading...', textVisible: true });
		new ProductEntity().list().then(doc => {
			doc.querySelectorAll('li').forEach(li => listView.appendChild(li));
			$(listView).listview('refresh');
			$.mobile.loading('hide');
		});
	}
}
