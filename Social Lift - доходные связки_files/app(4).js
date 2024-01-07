const Wallet = {
	topUp: function (currency, walletId) {
		if (['BTC', 'ETH'].indexOf(currency) !== -1) {
			AjaxRequest('POST', '/api/main/widget', {widget: 'wallet/wallet', params: {block: 'deposit' + currency}}, (data) => {
				$('#crypto-deposit').html(data.data.html);
			})
			return;
		}

		var min = $(this).data('min');
		window.top.swal({
			title: $GL('wallet_income_proc:Пополнение кошелька')
			, text: ''
			, type: "input"
			, showCancelButton: true
			, closeOnConfirm: false
			, animation: "slide-from-top"
			, inputPlaceholder: $GL("wallet_set_amount:Укажите сумму пополнения в [#currency]", {currency: currency}).replace('"', '\"')
		}, function (inputValue) {
			if (inputValue === false) {
				return false;
			}

			if (inputValue === "") {
				window.top.swal.showInputError($GL("wallet_set_amount_z:Укажите сумму").replace('"', '\"'));
				return false
			}
			if (parseFloat(inputValue) < parseFloat(min)) {
				window.top.swal.showInputError(
					$GL("wallet_min_amount:Минимальная сумма [#min] [#currency]", {currency: currency, min: min}).replace('"', '\"'));
				return false;
			}
			AjaxRequest('POST', '/api/wallet/incomeForm', {amount: inputValue, walletId: walletId}, (data) => {
				MY_OVERLAY.active(data.data.html)
				try {
					window.top.swal.close();
				} catch (e) {
				}
				;
			});
		});
	}
}

function getCryptoAdress(callback) {
	var $containers = $('#QRbalance,.QRbalance');

	if ($containers.length == 0) {
		return;
	}
	let Addresses = {};
	$containers.each((i, el) => {

		let $container = $(el);
		var address = $container.data('address');
		if (typeof address !== 'undefined') {
			if (address !== '') {
				//generateQR(address);
			} else {

				var $el = $container.parents('.js-crypro-wrap').find('.js-crypto-address');
				var currency = $el.data('currency');
				let network = $el.data('network');
				AjaxRequest('POST', '/api/wallet/get-crypto-address', {currency: currency, network: network}, (data) => {
					let $c = $('.js-qr-wallet[data-currency=' + currency + ']');

					if (network) {
						$c = $c.filter('[data-network=' + network + ']')
					}
					let address = data.data.address[network] || data.data.address
					$c.data('address', address);
					generateQR(address, $c);
					console.log($el);
					$el.html(address + '&nbsp;<svg class="kmfdm-button__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink"'
						+ ' xlink:href="#lnr-copy"></use></svg>');
					$el.attr('data-clipboard-text', address)
					ZeroClipboardCreate($el);
					callback(address, network);
				});
			}
		}
	})
}

function generateQR(address, $el) {

	var qrcode = new QRCode($el.get(0), {
		width: 150,
		height: 150
	});
	qrcode.makeCode(address);
	$el.find('div').remove();

}

(function ($) {

	getCryptoAdress();

	function calcTax(input) {
		var val = parseFloat($(input).val());
		var tax = parseFloat($(input).data('tax'));
		if (tax > 0 && val > 0) {
			var sum = val - (val * tax / 100);
			sum = Math.round(sum * 100) / 100;
			$('#sum_with_tax').html($GL('wallet_tax_is:К выводу [#sum] [#currency] с учетом комиссии', {sum: sum, currency: $(input).data('currency')}));
		}
	}

	$('#withdrawal_input').on('keyup', function () {
		calcTax(this);
	}).on('change', function () {
		calcTax(this);
	});

	$('.js-wallet-income').on('click', function () {
		var $this = $(this), currency = $this.data('currency');
		Wallet.topUp(currency, $(this).data('wallet-id'));
	})

})
(jQuery);

