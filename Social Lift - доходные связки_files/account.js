function ShowRegForm() {
	$('#search_sponsor_form').slideUp(300, function () {
		$('#welcome_form').slideDown(300);
	});
}

function SearchSponsor(btn) {

	var email = $('#sponsor_email').val();
	var skype = $('#sponsor_skype').val();
	var login = $('#sponsor_login').val();
	var id = $('#sponsor_id').val();
	var phone = $('#sponsor_phone').val().replace(/[^\d]/gi, '');

	if (email != '' || skype != '' || login != '' || phone != '') {
		$('body').addClass("load");
		$.post("/ajax.php", {module: 'account', dataType: 'json', act: 'searchSponsor', login: login, email: email, phone: phone, skype: skype, id: id},
			function (data) {
				$('body').removeClass('load');
				if (data.result == 'success') {
					$('#sponsor_rid').val(data.rid);
					swal({title: $GL('account_sponsor_was_found:Спонсор найден! Можно регистрироваться'), type: 'success'}, function () {
						ShowRegForm();
					});
				} else {
					swal({title: $GL('account_sponsor_not_found:Спонсор не найден'), type: 'error'});

					swal({
						title: $GL('account_sponsor_not_found:Спонсор не найден'),
						text: $GL('account_sponsor_search_again:Есть идеи по каким данным еще поискать?'),
						showCancelButton: true,
						confirmButtonColor: "#dd6b55",
						confirmButtonText: $GL("yes:Да"),
						cancelButtonText: $GL("No:Нет"),
						cancelFunction: function () {
							setTimeout(function () {
								swal({
									title: 'OK',
									text: $GL('account_sponsor_ok_go_reg:Тогда регистрируйтесь без спонсора, попробуем найти его позже'),
									type: 'success'
								}, function () {
									ShowRegForm();
								});
							}, 500);

						}
					}, function () {

					});

				}
			}, 'json');
	} else {
		swal({title: $GL('account_need-sponsor_data:Заполните хотя бы одно поле в форме поиска'), type: 'error'});
	}
}

function getTelgramToken() {
	$.post("/ajax.php", {module: 'account', act: 'getTelegramToken'}, function (data) {
		if (data.response) {
			swal({
				title: $GL('account_tbot_connect:Подключение телеграма'),
				text: $GL('account_tbot_connect_desct_:Скопируйте этот код и отправьте боту<br><b class="js-copy"'
					+ ' data-clipboard-text="/start_[#code]">/start_[#code]</b>', {code: data.response})
			});
			setTimeout(function () {
				ZeroClipboardCreate('.sweet-alert .js-copy');
			}, 300);
		}
	}, 'json');
}


