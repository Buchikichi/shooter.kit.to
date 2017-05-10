class AjaxUtils {
	static fetch(input, data) {
//console.log('fetch:' + typeof(fetch));
		if (typeof fetch === 'function') {
			// GlobalFetch.fetch()が存在する場合
//console.log('AjaxUtils.fetch:' + input);
			return fetch(input, {
				method: 'post',
				body: data,
				credentials: 'include',
			}).then(res => {
				return res.json();
			});
		}
//console.log('AjaxUtils.promise:' + input);
		return new Promise((resolve, reject)=> {
			let client = new XMLHttpRequest();

			client.open('post', input);
			//client.responseType = 'json'; // サポートしていないブラウザーって悲しいね
			client.withCredentials = true;
			client.addEventListener('loadend', ()=> {
				if (200 <= client.status && client.status < 300) {
					resolve(JSON.parse(client.response));
					return;
				}
				reject(client.statusText);
			});
			client.send(data);
		});
	}

	static post(input, data) {
		return AjaxUtils.fetch(input, data);
	}
}
