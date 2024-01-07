window.WalletHistory = {
	canceling: false,
	cancelTransfer: function (id) {
		var self = this;
		if (self.canceling) {
			return;
		}
		swal({
			title: $GL('wallet_sure_cancel_transaction:Вы уверены, что хотите отменить транзакцию?')
			, type: 'warning'
			, showCancelButton: true
			, confirmButtonColor: "#dd6b55"
			, confirmButtonText: $GL("yes:Да")
			, cancelButtonText: $GL("No:Нет")
		}, function (a) {
			if (a.isConfirmed) {
				self.canceling = true;
				AjaxRequest('POST', '/api/wallet/transfer/cancel', {id: id}, (data) => {
					self.canceling = false;
					$('#transaction_' + id).css({'opacity': 0.1});
				}, () => {
					self.canceling = false;
				})
			}
		});
	}
}

$(document).ready(function () {
	if ($.datepicker) {
		$.datepicker.setDefaults($.datepicker.regional[window.UserData.language]);
		$('.kmfdm-input__widget-date').datepicker({
			dateFormat: 'yy-mm-dd'
			, language: UserData.language
		});
	}
})