Moder = {

	removeUserTelegram: function (id) {
		swal({
			title: $GL('team_remove_user_telegram_confirm:Вы действительно хотите отключить телеграм?'),
			showCancelButton: true,
			confirmButtonText: $GL("yes:Да"),
			cancelButtonText: $GL("No:Нет"),
			type: 'error'
		}, function () {
			GoAjax({
				module: 'team',
				act: "removeUserTelegram",
				id: id
			}, function (data) {
				if (data.result === 'success') {
					swal($GL("success:Успешно"), '', "success");
					$('.js-moder-remove-user-telegram').remove();
				}
			});
		});
	},
	disable2Fa: function (id) {
		swal({
			title: $GL('team_disable2Fa_confirm:Вы действительно хотите отключить 2FA?'),
			showCancelButton: true,
			confirmButtonText: $GL("yes:Да"),
			cancelButtonText: $GL("No:Нет"),
			type: 'error'
		}, function (res) {
			if (res) {
				GoAjax({
					module: 'team',
					act: "disable2Fa",
					id: id
				}, function (data) {
					if (data.result === 'success') {
						swal($GL("success:Успешно"), '', "success");
						$('.js-moder-remove-user-telegram').remove();
					}
				});
			}
		});
	},
	removeUser: function (id, unremove) {
		swal({
			title: $GL('team_remove_user:Вы действительно хотите {[#action]:sex|ВОССТАНОВИТЬ;УДАЛИТЬ} удаленного пользователя?', {'action': unremove ? 1 : 2}),
			showCancelButton: true,
			confirmButtonText: $GL("yes:Да"),
			cancelButtonText: $GL("No:Нет"),
			type: 'error'
		}, function (res) {
			if (res) {
				GoAjax({
					module: 'team',
					act: "removeUser",
					id: id
				}, function (data) {
					if (data.result === 'success') {
						$('#user_' + id).remove();
						$('.kmfdm-users__item_active_false').removeClass('kmfdm-users__item_active_false')
						//.addClass('kmfdm-users__item_active_false');
						$('#overlay-close').click();
					}
				});
			}
		});
	},
	restoreUserPassword: function (email) {
		swal({
				title: $GL("team_moder_restore_user:Отправить письмо на почту [#email] для восстановления пароля?", {email: email}),
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: $GL("yes:Да"),
				cancelButtonText: $GL("No:Нет"),
			}, function (res) {
				if (res) {
					GoAjax({
						module: 'account',
						act: 'lostpass',
						email: email
					}, function () {
						swal($GL("success:Успешно"), '', "success");
					});
				}
			}
		);
	},
	ban: function (userId, $button) {
		swal({
				title: $GL("team_moder_ban_user:Выдать пользователю предупреждение?"),
				text: $GL("team_moder_ban_user_reason:Укажите причину"),
				type: "input",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: $GL("yes:Да"),
				cancelButtonText: $GL("No:Нет"),
			}, function (message) {
				GoAjax({
					module: 'account',
					act: 'soft-ban',
					ban: 1,
					user_id: userId,
					reason_message: message
				}, function () {
					swal($GL("success:Успешно"), '', "success");
					$button.attr('style', 'display:none !important');
					$('.js-moder-unban').show();
				});
			}
		);
	},
	unban: function (userId, $button) {
		swal({
				title: $GL("team_moder_unban_user:Отозвать предупреждение?"),
				text: $GL("team_moder_ban_user_reason:Укажите причину"),
				type: "input",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: $GL("yes:Да"),
				cancelButtonText: $GL("No:Нет"),
			}, function (message) {
				GoAjax({
					module: 'account',
					act: 'soft-ban',
					ban: 0,
					user_id: userId,
					reason_message: message
				}, function () {
					swal($GL("success:Успешно"), '', "success");
					$button.attr('style', 'display:none !important');
					$('.js-moder-ban').show();
				});
			}
		);
	}
};