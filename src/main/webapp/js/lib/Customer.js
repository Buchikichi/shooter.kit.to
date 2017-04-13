class Customer {
	constructor() {
	}

	check() {
		return $.ajax({
			type: 'post',
			url: '/customer/check',
			dataType: 'json',
			data: {},
		});
	}

	signIn(userid, passwd) {
		let data = {userid:userid, passwd:passwd};

		return $.ajax({
			type: 'post',
			url: '/customer/signIn',
			dataType: 'json',
			data: data,
		});
	}
}
