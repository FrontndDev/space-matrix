function setCollapse(items) {
	$(items).off().on('click', function (event) {
		event.preventDefault();
		var par = $(this).parents('.collapse:eq(0)');
		//    $('.team__item_separated').removeClass('team__item_separated');
		if (par.hasClass('collapse_active')) {
			par.toggleClass('collapse_active');
			par.parents('.team__list:eq(0)').find(">.team__item_faded").removeClass('team__item_faded');
			$(".referal_" + par.data('referal')).removeClass('team__item_faded');
			//    $(par).next('.team__item').addClass('team__item_separated');
		} else {
			$('.collapse_active.referal_' + par.data('referal')).removeClass('collapse_active');
			par.toggleClass('collapse_active').removeClass('team__item_faded');
			$(this).trigger('collapse');
		}
	});
	$(items).on('collapse', function () {
		var id = $(this).data('id');
		if ($(this).parents('.collapse').hasClass('collapse_active') && !$(this).parents('.collapse').hasClass('self_row')) {
			$(this).parents('.team__list').find('.team__item:not(.collapse_active)').addClass('team__item_faded');
			console.log($(this));
			$.post("/ajax.php", {module: 'team', act: 'getFolowers', dataType: 'json', uid: $(this).data('id')}, function (data) {

				html = "";
				for (var i in data.list) {
					html += data.list[i];
				}
				$('#user_' + id + ' .team__list').html(html);
				$('#user_' + id + ' .team__list .tip[title]').colorTip({color: 'black'});
				//$('.referal_'+id+":last").addClass('team__item_separated');
				setCollapse('.referal_' + id + " .collapse__handler");
			}, 'json');

		} else {
			$(this).parents('.team__list').find(">.team__item_faded").removeClass('team__item_faded');
			$('.referal_' + id).remove();
		}
	});
	// detailse_On_activate();
}

function VerifyConfirm(id) {
	swal({
		title: $GL('team_verify_confirme:Вы действительно хотите верифицировать пользователя?')
		, showCancelButton: true,
		confirmButtonColor: "#dd6b55",
		confirmButtonText: $GL("yes:Да"),
		cancelButtonText: $GL("No:Нет"),
	}, function () {
		$('body').addClass("load");
		$.post("/ajax.php", {module: 'team', dataType: 'json', act: 'virifyConfirm', id: id}, function (data) {
			$('body').removeClass('load');
			if (data.result == 'success') {

				$('#verify_' + id).addClass('success')
				setTimeout(function () {
					$('#verify_' + id).remove();
					if ($('.verify__list__item').length == 0) {
						$('.verify_wrap').remove();
					}
				}, 1000);

			} else {

			}
		}, 'json');
	});
}

function VerifyReject(id) {
	swal({
		title: $GL('team_verify_rejecte:Вы действительно хотите отклонить заявку?')
		, showCancelButton: true,
		confirmButtonColor: "#dd6b55",
		confirmButtonText: $GL("yes:Да"),
		cancelButtonText: $GL("No:Нет"),
	}, function () {
		$('body').addClass("load");
		$.post("/ajax.php", {module: 'team', dataType: 'json', act: 'virifyReject', id: id, comment: $('#verify_comment_' + id).val()}, function (data) {
			$('body').removeClass('load');
			if (data.result == 'success') {

				$('#verify_' + id).addClass('success')
				setTimeout(function () {
					$('#verify_' + id).remove();
					if ($('.verify__list__item').length == 0) {
						$('.verify_wrap').remove();
					}
				}, 1000);

			} else {

			}
		}, 'json');
	});
}

function getUserInfo(id) {
	$('body').addClass('load');
	$.post("/ajax.php", {module: 'team', act: 'getUserInfo', id: id, dataType: 'json'}, function (data) {
		$('body').removeClass('load');
		MY_OVERLAY.active(data.response);

		//detailse_On_activate();
	}, 'json');
}

function sendMessage(id) {
	$('body').addClass('load');
	$.get("/index.php?module=account&act=messages&id=" + id + "&responseType=popup", {}, function (data) {
		$('body').removeClass('load');
		MY_OVERLAY.active(data);
	});
}

function ShowNoticeSendForm() {
	MY_OVERLAY.active($('#tmpl-notice-sendform').tmpl().html());
	MY_OVERLAY.tinymce = tinymce.init({
		selector: '#team_notice_descr',
		theme: 'modern',
		menubar: false,
		plugins: ['advlist autolink lists link preview anchor'],
		toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
		image_advtab: true,
		invalid_elements: "script",
		cleanup: true,
		height: 300,
		templates: [],
		content_css: []
	});
	$('#team_notice_title').css({"display": 'none!important'});
}

function ManualPayment(id) {

	$('body').addClass('load');
	$.post("/ajax.php", {
		module: 'payment',
		dataType: 'json',
		act: 'manually_pay',
		id: id
	}, function (data) {
		$('body').removeClass('load');
		if (data.result == 'success') {
			swal($GL('sucess:успешно'), '', 'success');
		}
	}, 'json');

}

var Team = {

	search: function () {
		var str = $('#team_search_area').val();
		var filter = $('#filter').serialize();
		var module = $('#filter').data('module');

		console.info(decodeURIComponent(filter));
		var $body = $('body');

		if (typeof Team.xhr != 'undefined') {
			NProgress.done(true);
			Team.xhr.abort();
			Team.xhr = undefined;
			setTimeout(function () {
				Team.search();
			}, 100);
			return;
		}
		$('#jump').hide();

		Team.xhr = $.post("/ajax.php", {module: module, act: 'team_search', query: str, filter: filter}, function (data) {
			html = "";
			if (data.download) {
				window.location.href = data.download;
				return;
			}
			for (var i in data.list) {
				html += data.list[i];
			}
			$('#main_team__list').html(html);
			if ($body.colorTip) {
				$('.tip[title]').colorTip({color: 'black'});
			}
			setCollapse('.collapse__handler');
			$('#pagination_wrap').html(data.pages);
			$('#find_count').text(data.total_count);
			$('#find_counter').show();
		}, 'json');

	},
	open_line: function () {
		$('body').addClass('load');
		$('#jump').show();
		$.post("/ajax.php", {module: 'team', act: 'open_line', dataType: 'json', line: $('#open_line_input').val()}, function (data) {
			$('body').removeClass('load');
			$('#find_counter').hide();
			html = "";
			for (var i in data.list) {
				html += data.list[i];
			}
			$('#find_count').text(data.total_count);
			$('#main_team__list').html(html);
			$('.tip[title]').colorTip({color: 'black'});
			setCollapse('.collapse__handler');
			$('#pagination_wrap').html(data.pages);
		}, 'json');
	},
	changeSponsor: function (id, email) {
		if (!email || email === '') {
			swal({title: $GL('team_change_sponsor'), type: 'error'});
		}
		swal({
			title: $GL('tema_realy_change_sponsor:Вы действительно хотите изменить спонсора?')
			, text: $GL("team_change_sponsor_desc:Изменения коснутся всех партнеров данного пользователя")
			, showCancelButton: true,
			confirmButtonColor: "#dd6b55",
			confirmButtonText: $GL("yes:Да"),
			cancelButtonText: $GL("No:Нет"),
			cancelFunction: function () {

			}
		}, function () {
			$('body').addClass("load");
			$.post("/ajax.php", {module: 'team', dataType: 'json', act: 'changeSponsor', toid: id, email: email}, function (data) {
				$('body').removeClass('load');
				if (data.result == 'success') {
					swal({title: $GL("team_success_change_sponsor:Вы успешно изменили спонсора!"), type: 'success'});
				} else {
					swal({title: data.error_mes, type: 'error'});
				}
			}, 'json');
		})

	},
	init: function () {
		Team.binaryInit();
		Team.btnAddInit();
	},
	changeWrap: function (html) {
		$('.kmfdm-income').html(html);
		Team.binaryInit();
		$('.phone-field,input[type="tel"]', $('.kmfdm-income')).each((i, el) => {
			$(el).inputmasks(window.PhoneMaskOpts);
		});
	},
	binaryInit: function () {
		var $tree = $('#js-binary-tree'),
		    click = 'click';

		if ($tree.length === 0) {
			return;
		}

		(function /* change place */() {
			$('#js-binary-user__change-place').on('change', function () {
				$.post('/api/binary/change-place', {place: $(this).val()}, function () {
					show_message('green', $GL('binary_user_setting_place:Настройки сохранены'), $GL('success:успешно'));
				});
			});
		})();
		(function /* man */() {
			var classShowPopup = 'kmfdm-man_expanded',
			    classUser      = '.js-binary-user',
			    classUserShow  = classUser + '-info__show',
			    classUserClose = classUser + '-info__close',
			    closeUserPopup = function () {
				    $tree.find('.' + classShowPopup).removeClass(classShowPopup);
			    };

			$tree.find(classUserShow).on(click, function () {
				closeUserPopup();
				$(this).parent(classUser).addClass(classShowPopup);
			});

			$tree.find(classUserClose).on(click, function () {
				closeUserPopup();
			});

			$(document)
				.on(click, function (event) {
					if (!$(event.target).closest(classUser).length) {
						closeUserPopup();
					}
				})
				.on('keyup', function (event) {
					if (event.keyCode === 27) {
						closeUserPopup();
					}
				});
		})();

		(function /* add-man */() {
			var classShowPopup      = 'kmfdm-add-man_expanded',
			    classNotUser        = '.js-binary-not-user',
			    classUserAdd        = '.js-binary-user-add',
			    classUserAddClose   = classUserAdd + '__close',
			    classUserAddSubmit  = classUserAdd + '__submit',
			    classUserAddRegType = classUserAdd + '__regType',
			    classUserAddFio     = classUserAdd + '__fio',
			    isClicked           = false,
			    closeUserPopup      = function () {
				    $tree.find('.' + classShowPopup).removeClass(classShowPopup);
			    };

			$tree.find(classUserAddSubmit).on(click, function () {
				var data = $(this).parents(classNotUser).find('form').serialize();

				if (isClicked) {
					return;
				}
				isClicked = true;
				$.post('/ajax.php?module=team&act=binary_add', data, function (response) {
					isClicked = false;
					response = typeof (response) === 'string' ? JSON.parse(response) : response;
					if (!("error" in response)) {
						$.get(window.location.href + '?', function (html) {
							Team.changeWrap(html);
						})
					}
				}, 'json').error(function () {
					isClicked = false;
				});
			});

			$tree.find(classUserAddRegType).on('change', function () {
				$(this).parents('form').find(classUserAddFio).slideToggle(300);
			});

			$tree.find(classUserAdd).on(click, function () {
				closeUserPopup();
				$(this).parent(classNotUser).addClass(classShowPopup);
			});

			$tree.find(classUserAddClose).on(click, function () {
				closeUserPopup();
			});

			$(document)
				.off(click + '.binary').on(click + '.binary', function (event) {
				if (!$(event.target).closest(classNotUser).length) {
					closeUserPopup();
				}
			})
				.off('keyup.binary').on('keyup.binary', function (event) {
				if (event.keyCode === 27) {
					closeUserPopup();
				}
			});
		})();
	},
	btnAddInit: function () {
		var classShowPopup     = 'kmfdm-add-man_expanded',
		    classNotUser       = '.js-binary-not-user',
		    classUserAdd       = '.js-binary-user-add',
		    classUserAddClose  = classUserAdd + '__close',
		    classUserAddSubmit = classUserAdd + '__submit',
		    isClicked          = false,
		    $wr                = $('#js-team-user-create-form'),
		    click              = 'click',
		    $binWr             = $wr.find('.js-binary-item-data'),
		    $checkboxPayBinary = $wr.find('.js-binary-pay-access'),
		    $formCreate        = $wr.find(classNotUser),
		    closeUserPopup     = function () {
			    $wr.removeClass(classShowPopup);
		    };


		$checkboxPayBinary.on('change', function () {
			$binWr.toggle(this.checked);
		});

		$wr.find(classUserAddSubmit).on(click, function () {
			var data = $wr.find('form').serialize();

			if (isClicked) {
				return;
			}
			isClicked = true;

			$.post('/ajax.php?module=team&act=create_user', data, function (response) {
				isClicked = false;
				response = typeof (response) === 'string' ? JSON.parse(response) : response;
				if (!("error" in response)) {
					if ($(classUserAddSubmit).data('refresh-block') == 1) {
						$.get(window.location.href, function (html) {
							Team.changeWrap(html);
							closeUserPopup();
							$wr.find('form')[0].reset();
							$binWr.toggle(this.checked);
						});
					} else {
						swal({type: 'success', 'title': $GL('success'), 'text': $GL('team_success_reg_user:Вы успешно зарегистрировали партнера')});
					}
				}
			}, 'json').error(function () {
				isClicked = false;
			});
		});

		$wr.find(classUserAddClose).on(click, function () {
			closeUserPopup();
		});

		$(document)
			.on(click, function (event) {
				if (!$(event.target).closest(classNotUser + ', #js-team-add-partner').length) {
					closeUserPopup();
				}
			})
			.on('keyup', function (event) {
				if (event.keyCode === 27) {
					closeUserPopup();
				}
			});
	},
	banUser: function (userId) {
		window.top.swal({
			title: $GL('attention:Внимание')
			, text: $GL('team_do_u_want_ban:Вы уверены, что хотите забанить пользователя?')
			, type: "input"
			, showCancelButton: true
			, closeOnConfirm: false
			, animation: "slide-from-top"
			, inputPlaceholder: $GL("team_ban_reason:Причина бана").replace('"', '\"')
		}, function (inputValue) {
			if (inputValue === false) {
				return false;
			}

			if (inputValue === "") {
				window.top.swal.showInputError($GL("set_delaycode_empty:Укажите проверочный код из письма").replace('"', '\"'));
				return false
			} else {

				$.post("/ajax.php", {module: 'team', act: 'banUser', id: userId, reason: inputValue}, function () {
					$('#team-ban-user').text($GL('team_unban_user:Разбанить пользователя')).data('baned', 1);
					window.top.swal({title: $GL("success:Успешно"), type: "success"});
				}, 'json');
			}
		});
	},
	unBanUser: function (userId) {
		window.top.swal({
			type: 'warning',
			title: $GL('attention:Внимание'),
			text: $GL('team_do_u_want_unban:Вы уверены, что хотите РАЗБАНИТЬ пользователя'),
			showCancelButton: true,
			confirmButtonColor: "#dd6b55",
			confirmButtonText: $GL("yes:Да"),
			cancelButtonText: $GL("No:Нет")
		}, function (isConfirmed) {
			if (isConfirmed) {
				$.post("/ajax.php", {module: 'team', act: 'unBanUser', id: userId}, function () {
					$('#team-ban-user').text($GL('team_ban_user:Забанить пользователя')).data('baned', 0);
					window.top.swal({title: $GL("success:Успешно"), type: "success"});
				}, 'json');
			}
		})
	}
};

$(document).ready(function () {
	Team.init();

	if (/\d+/.test(window.location.hash.replace('#', ''))) {
		getUserInfo(window.location.hash.replace('#', ''));
	}

	$.datepicker.setDefaults($.datepicker.regional[window.UserData.language]);
	try {
		$('input[type=date],.date__input,.input__date, .js-date-input').datetimepicker({
			dateFormat: 'yy-mm-dd'
			, language: 'ru'
		});
	} catch (e) {

	}
	$('.form__switcher').on('click', function () {
		var switcher = $(this);
		console.log(switcher);

		console.log('@');

		switcher.find('.ison').prop({'checked': false}).removeClass('checked');
		switcher.find('.isoff').prop({'checked': false}).removeClass('checked');
		console.log(switcher.find('input:checked'));
		if (!switcher.hasClass('active-checked') && !switcher.hasClass('disactive-checked')) {
			console.log(1);
			console.log(switcher.find('input:checked'));
			switcher.addClass('active-checked');

			switcher.find('.ison').prop({'checked': true}).addClass('checked');
		} else if (switcher.hasClass('active-checked')) {
			console.log(2);
			console.log(switcher.find('input:checked'));
			switcher.removeClass('active-checked');
			switcher.addClass('disactive-checked');

			switcher.find('.isoff').prop({'checked': true}).addClass('checked');

		} else if (switcher.hasClass('disactive-checked')) {
			console.log(3);
			console.log(switcher.find('input:checked'));
			switcher.removeClass('disactive-checked');
			switcher.removeClass('active-checked');
			switcher.find('.ison,.isoff').prop({'checked': false}).removeClass('checked');
		}
		console.log(switcher.find('input:checked'));
		var filter = $('#filter').serialize();
		console.warn(decodeURIComponent(filter));

		$('#filter_trigger').trigger("change");

	});

	$('#open_line_input').keyup(function (e) {
		var keyCode = e.which != 0 ? e.which : e.keyCode;
		if (keyCode == 13) {
			Team.open_line();
		}
	});

	setCollapse('.collapse__handler');
	var searchTimeout = null;
	$('#team_search_area').keyup(function (e) {
		clearTimeout(searchTimeout);
		var keyCode = e.which != 0 ? e.which : e.keyCode;
		if (keyCode == 13) {
			if (typeof Team.xhr != 'undefined') {
				Team.xhr.abort();
				Team.xhr = undefined;
			}
			$('#team_search_btn').trigger('click');
		} else {
			searchTimeout = setTimeout(function () {
				Team.search();
			}, 300);
		}
	});
	$('#team_search_btn').on('click', function (e) {
		e.preventDefault()
		Team.search();
	});

	$('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
	if ($('body').colorTip) {
		$('.tip[title]').colorTip({color: 'black'});
	}
	if (typeof ZeroClipboardCreate != 'undefined') {
		ZeroClipboardCreate('.clipboard-btn');
	}

	MY_OVERLAY.beforeClose = function () {
		$('body').css({position: 'static', width: '100%', height: '100%'});
		if (typeof tinyMCE !== 'undefined' && tinyMCE.activeEditor) {
			tinyMCE.activeEditor.destroy();
		}
		if (typeof account !== 'undefined' && typeof account.messages !== 'undefined') {
			account.messages.reset();
		}
	};

	var $body = $('body');

	$body.on('click', '.kmfdm-users__summary', function (e) {

		if (!$(e.target).is('.kmfdm-client-handler__icon') && !$(this).hasClass('js-self-row') && !$(e.target).is('a,img')) {

			var clickedItem = $(this).parent('.kmfdm-users__item');

			if (!clickedItem.hasClass('kmfdm-users__item_active_true')) {
				clickedItem.siblings('.kmfdm-users__item').addClass('kmfdm-users__item_active_false').removeClass('kmfdm-users__item_active_true');
				clickedItem.addClass('kmfdm-users__item_active_true').removeClass('kmfdm-users__item_active_false');

				$.post("/ajax.php", {module: 'team', act: 'getFolowers', dataType: 'json', uid: $(this).data('id')}, function (data) {

					var userListCont = $(clickedItem).find('.kmfdm-users__list')
					if (data.list.length == 0) {
						userListCont.prev().css('display', 'none!important')
						return;
					}
					html = "";
					for (var i in data.list) {
						html += data.list[i];
					}
					userListCont.html(html);
					$('.tip[title!=""]:not(.icons__clickboard)', userListCont).colorTip({color: 'black'});

				}, 'json');

			} else {
				clickedItem.siblings('.kmfdm-users__item').removeClass('kmfdm-users__item_active_false');
				clickedItem.removeClass('kmfdm-users__item_active_true');
			}
		}
	});

	$body.on('click', '#filter_opener', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
		var $filterText = $('#filter_opener_text');
		var newToggleText = $filterText.text();
		$filterText.text($filterText.data('toggle-text'))
		$filterText.data('toggle-text', newToggleText);
		$('#filter_wrap').slideToggle(300);
	});

	$('.js-close-filter').on('click', function () {
		$('#filter_opener').trigger('click');
	});
	$body.on('click', '#team_search_btn', function () {
		$('.js-close-filter:visible').trigger('click');
	})

	var amountInterval = null;

	function changeAmount($this, once) {
		once = once || false;
		var $input = $this.parents('.kmfdm-input').find('.kmfdm-input__widget');
		var val = parseInt($input.val());

		var $deepTo = $('#deep_to');
		var $deepFrom = $('#deep_from');
		var deep_from = parseInt($deepFrom.val());
		var deep_to = parseInt($deepTo.val());
		var side = $this.hasClass('kmfdm-input__amount_down') ? 'down' : 'up';
		var max = parseInt($input.data('max'));
		var min = parseInt($input.data('min'));

		amountInterval = setInterval(function () {
			if (once) {
				clearInterval(amountInterval);
			}
			if (side === 'down') {
				val -= 1;
			} else {
				val += 1;
			}
			if (max && max < val) {
				val = max;
			}
			if (min && min > val) {
				val = min;
			}
			$input.val(val);
			if ($input.attr('id') === 'deep_from') {
				if (val > deep_to) {
					$deepTo.val(val);
				}
			} else if ($input.attr('id') === 'deep_to') {
				if (val < deep_from) {
					$deepFrom.val(val);
				}
			}
		}, 100);
	}

	$body.on('click', '.kmfdm-input__amount_down,.kmfdm-input__amount_up', function () {
		changeAmount($(this), true);
	});

	$body.on('mousedown', '.kmfdm-input__amount_down,.kmfdm-input__amount_up', function () {

		changeAmount($(this));

	});

	$body.on('mouseup', '.kmfdm-input__amount_down,.kmfdm-input__amount_up', function () {
		clearInterval(amountInterval);
	});

	/*
     * Tabs
     */

	/*
	$body.on('click', '.kmfdm-tabs__tag', function (event) {
		event.preventDefault();

		if (!$(this).hasClass('kmfdm-tabs__tag_current')) {
			var tabs = $(this).parents('.kmfdm-tabs');

			tabs.find('.kmfdm-tabs__item_current').removeClass('kmfdm-tabs__item_current');
			tabs.find('.kmfdm-tabs__tag_current').removeClass('kmfdm-tabs__tag_current');

			$($(this).attr('href')).addClass('kmfdm-tabs__item_current');
			$(this).addClass('kmfdm-tabs__tag_current');
		}

	});
	*/

	//send popup message
	$body.on('click', '.kmfdm-js-send_popup_message', function () {
		var $this = $(this);

		$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_fill').removeClass('kmfdm-form__step_current');
		$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_sending').addClass('kmfdm-form__step_current');

		var p = {
			'text': $('#kmfdm-popup_message_text').val(),
			'msgwith': $('#msgwith').val(),
			//	attachment: attachment,
		};
		$.post("/api/profile/message/send",
			p,
			function (data) {
				console.log(data)

				if (data.message) {
					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_sending').removeClass('kmfdm-form__step_current');
					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_respond').addClass('kmfdm-form__step_current');
				} else {
					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_fill').addClass('kmfdm-form__step_current');
					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_sending').removeClass('kmfdm-form__step_current');
				}

			}, 'JSON');
	});

	/*
	* Form
	*/

	$body.on('click', '.form__submit', function (event) {

		var $this = $(this);

		event.preventDefault();
		$this.parents('.form').find('.form__step_id_fill').removeClass('form__step_current');
		$this.parents('.form').find('.form__step_id_sending').addClass('form__step_current');

		setTimeout(function () {

			$this.parents('.form').find('.form__step_id_sending').removeClass('form__step_current');
			$this.parents('.form').find('.form__step_id_respond').addClass('form__step_current');

		}, 2000);
	});

	// change access
	$body.on('click', '#team-access-level_change', function () {
		var user_id = $('#team-access-level').data('user-id'),
		    access  = $('#team-access-level option:selected').val();

		$.post("/ajax.php", {module: 'settings', dataType: 'json', act: 'setTeamMemberAccess', user_id: user_id, access: access}, function (data) {
			$('body').removeClass('load');

			if (data.result == 'success') {
				swal({title: $GL('success:Успешно'), text: $GL('settings_generel_team_access_saved:Вы успешно обновили уровень доступа.')});
			}
		}, 'json');
	});

	//account.messages.usersListInit('messages');

	/*
	* Editable
	*/

	$body.on('click', '.kmfdm-editable__content, .kmfdm-editable__handler', function () {
		var editable = $(this).parents('.kmfdm-editable');
		var oldValue = editable.find('.kmfdm-editable__content').html();

		editable.addClass('kmfdm-editable_active');
		editable.find('.kmfdm-editable__field').val(oldValue.trim());
		$('.kmfdm-editable__container').addClass('kmfdm-editable__container-visible');
		setTimeout(function () {

			/* if expanding area applied need to refresh */
			if (editable.find('.kmfdm-editable__field').expanding('active')) {
				editable.find('.kmfdm-editable__field').expanding('destroy');
				editable.find('.kmfdm-editable__field').expanding();
			}

			/* and add focus */
			editable.find('.kmfdm-editable__field').focus();
		}, 1000);
	});

	$body.on('click', '.kmfdm-editable__submit', function () {
		$(this).parents('.kmfdm-editable').removeClass('kmfdm-editable_active');
		var textField = $(this).parents('.kmfdm-editable').find('.kmfdm-editable__field');
		var newValue = textField.val();
		$(this).parents('.kmfdm-editable').find('.kmfdm-editable__content').html(newValue);
		$('body').addClass('load');
		$.post("/ajax.php", {module: 'team', dataType: 'json', act: 'addComment', id: $(textField).data('id'), comment: newValue}, function () {
			$('body').removeClass('load');
		});
	});

	$body.on('click', '.kmfdm-editable__cancel', function () {
		$(this).parents('.kmfdm-editable').removeClass('kmfdm-editable_active');
	});

	$body.on('click', '.kmfdm-editable', function (event) {
		$('.kmfdm-editable_active').removeClass('kmfdm-editable_active');
	});

	/*
	Input dropdown
	*/

	// $('.kmfdm-input_type_suggest .kmfdm-input__widget').on('focus', function () {
	// 	$(this).parents('.kmfdm-input').addClass('kmfdm-input_drop');
	// 	$(this).parents('.kmfdm-input').find('.kmfdm-input__widget').focus();
	// });

	$body.on('click', '.kmfdm-input__value', function () {
		$(this).parents('.kmfdm-input').addClass('kmfdm-input_drop');
		$(this).parents('.kmfdm-input').find('.kmfdm-input__widget').focus();
	});

	var autocompliteTimer = null;

	$body.on('keyup', '#team_search_sponsor', function () {
		clearTimeout(autocompliteTimer);
		var _self = this;
		autocompliteTimer = setTimeout(function () {
			GoAjax({module: 'team', dataType: 'json', act: 'searchUsers', email: $(_self).val()}, function (data) {

				$('.kmfdm-input__ribbon').html(
					_.template($('#dropdown_tpl').html())({
						"items": _.map(data.result,
							function (e) {
								e.emailMarked = e.email.replace($(_self).val(), '<b>' + $(_self).val() + '</b>');
								return e;
							}
						)
					})
				);

			}, undefined, undefined, true);
		}, 300);
	});

	$body.on('click', '.kmfdm-input', function (event) {
		if (!$(event.target).closest().length) {
			$('.input_drop').removeClass('kmfdm-input_drop');
		}
	});

	$body.on('click', '.kmfdm-input__suggest', function (event) {
		event.preventDefault();
	});

	/* hide popup by Esc press */

	$(document).on('keyup', function (event) {
		if (event.keyCode == 27) {
			$('.kmfdm-input_drop').removeClass('kmfdm-input_drop');
		}
	});

	var $table = $('.kmfdm-users__list');
	var tableWidth = $table.width();
	var startWidth = 0;
	var startTableWidth = 0;
	var lockClass = 'js-persona-lockWidth';
	var cnt = 0;
	var cntMaxWidth = 0;
	var sumMaxWidth = 0;
	var $items = $('html:not(.isMobile) .kmfdm-persona_kind_header .kmfdm-persona__item');
	$items.each(function () {
		startWidth = $(this).width()
			+ parseInt($(this).css('margin-left'))
			+ parseInt($(this).css('margin-right'))
			+ parseInt($(this).css('padding-left'));
		+parseInt($(this).css('padding-right'));
		startTableWidth += startWidth;
		$(this).data('start-width', startWidth);

		if (!$(this).hasClass(lockClass)) {
			cnt++;
		}
	});
	var widthDiff = tableWidth - startTableWidth;
	var widthPlus = widthDiff / cnt;

	$items.each(function () {
		var wMax = parseInt($(this).data('max-width'));
		if (wMax) {
			var startW = parseInt($(this).data('start-width'));
			var nWidth = startW + widthPlus - widthPlus * 0.05;
			if (nWidth > wMax) {
				sumMaxWidth += nWidth - wMax;
				cntMaxWidth++;
			}
		}
	});
	var widthPlusMaxWidth = (sumMaxWidth) / cntMaxWidth;
	if (widthPlus > 0) {
		var style = [];
		$('.kmfdm-persona_kind_header .kmfdm-persona__item:not(.' + lockClass + ')').addClass('js-custom-width').each(function () {
			var width = parseInt($(this).data('start-width')) + (widthPlus - widthPlus * 0.05);
			var maxWidth = parseInt($(this).data('max-width'));
			if (maxWidth && maxWidth < width) {
				width = maxWidth;
			} else {
				$(this).attr({'x-width': width});
				width += widthPlusMaxWidth;
				$(this).attr({'x-width-max': width});

			}
			if (width) {
				style.push("." + $(this).data('custom-width') + ":not(." + lockClass + "){min-width: " + width + "px!important; max-width:"
					+ " none!important}");
			}
		});

		style = style.join("\n");
		$('#style-custom-width').remove();
		$('head').append("<style id='style-custom-width'>" + style + "</style>");
	}

	$body.on('click', '#team_noticesend_btn', function () {
		var title = $('#team_notice_title').val();
		var descr = tinyMCE.activeEditor.getContent();
		var $this = $(this);

		if (title === '') {
			swal({title: $GL('notice_set_title:Введите заголовок'), type: 'error'});
		} else if (descr === '') {
			swal({title: $GL('notice_set_descr:Введите текст уведомления'), type: 'error'});
		} else {

			$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_fill').removeClass('kmfdm-form__step_current');
			$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_sending').addClass('kmfdm-form__step_current');

			$.post("/ajax.php", {
				module: 'notice',
				act: 'createTeamNotice',
				only_first_lavel: $('#to_all_team').val() === '1' ? 0 : 1,
				to_activated_team: $('#to_activated_team').val() === '1' ? 0 : 1,
				title: title,
				text: descr,
				dataType: 'json'
			}, function (data) {
				$('body').removeClass('load');
				if (data.result === 'success') {

					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_sending').removeClass('kmfdm-form__step_current');
					$this.parents('.kmfdm-form').find('.kmfdm-form__step_id_respond').addClass('kmfdm-form__step_current');

					tinyMCE.activeEditor.destroy();
					MY_OVERLAY.close();
					swal({title: $GL('nitice_message_sended:Сообщение успешно отправлено'), type: 'success'});
				}
			}, 'json');
		}
	});

	$body.on('click', '#team-ban-user', function () {
		if ($(this).data('baned')) {
			Team.unBanUser($(this).data('id'));
		} else {
			Team.banUser($(this).data('id'));
		}
	})

});
