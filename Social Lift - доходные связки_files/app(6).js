(function () {
	$('.header_title').on('dblclick', function (e) {
		var $target = $(e.target);
		//	debugger;
		if ($target.is('.header_title span')) {
			var val = $(this).text().replace(/[\r\n\s]+$/gi, '');
			var header_icon = $('.header_title .header__icon');
			if (header_icon.length > 0) {
				val += " [/page" + header_icon.data('page') + "]";
			}
			$target.html("<input type='text' id='header_title_input' size='40'>");

			$('#header_title_input').val(val).focus();
			$('#header_title_input').on('blur', function () {
				var val = $(this).val();
				if (val != '') {
					$target.html(val.replace(/\s?\[\/page[\d]+\]/gi, ''));
					GoAjax({module: 'settings', act: 'editHeaderTitle', code: $target.parents('.header_title').data('code'), title: val}, function (data) {
						if (typeof data.info !== 'undefined') {
							header_icon.data('page', data.info);
							header_icon.attr('onclick', "GetHelp(" + data.info + "); return false;");
						}
					}, 'json');
				}
			});
		}
	});
})()

const MenuSettings = {
	AddCurrentPage: function () {
		var $parent = $('#page-menu-settings .nestable')
		$parent.append($('#menu-edit-item').tmpl({uuid: uuidv1(), sort: $parent.find('.nested-item').length}));
	},
	Edit: function () {
		var url = window.location.pathname + window.location.search;

		GoAjax({module: 'settings', act: 'showPageMenu', page: url}, function (data) {
			MY_OVERLAY.active(data.html);

			$("#page-menu-settings .nestable").sortable({
				items: ".nested-item",
				handle: '.nested-item-handle'
				, stop: function (e, ui) {
					var i = 0;
					$('#page-menu-settings .nested-item').each(function (i, el) {
						$(el).find('.sort_input').val(i++);
					});
				}
			});
		})
	},
	EditDescription: function () {
		SweetAlert.fire({
			title: 'Укажите Lastpage id для описания этой страницы',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Сохранить',
			showLoaderOnConfirm: true,
			preConfirm: (id) => {
				return (new Promise((resolve, reject) => {

					AjaxRequest('POST', '/api/settings/edit-page-descr', {id: id, url: window.location.href}, function (data) {
						if (data.result == 'success') {
							resolve(data);
						} else {
							reject(data)
						}
					}, function (data) {
						reject(false)
					})

				})).then(response => {
					return response;
				}).catch(error => {
					if (error === false){
						return;
					}
					let errorMessage = typeof error.responseText !== 'undefined' ? error.responseText : response.error_message;
					debugger;
					SweetAlert.showValidationMessage(
						`Request failed: ${error.responseText}`
					)
				});
			},
			allowOutsideClick: () => !SweetAlert.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				SweetAlert.fire({
					title: `Сохранено`,
					imageUrl: result.value.avatar_url
				}).then(() => {
					AjaxReload();
				});
			}
		})
	},
	delete: function (uuid) {
		var $elem = $('#menu_item_' + uuid);
		$elem.remove();
		var i = 0;
		$('#page-menu-settings .nested-item').each(function (i, el) {
			$(el).find('.sort_input').val(i++);
		});
	}
}