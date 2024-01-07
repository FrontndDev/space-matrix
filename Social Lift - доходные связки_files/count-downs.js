function activateCountDown(selector){

	$(selector).each(function () {
		var $this    = $(this),
		    canEnter = false,
		    onExpiry = function (itsPreTime) {
			    var callback = $this.data('callback');
			    canEnter = true;
			    itsPreTime = itsPreTime || false;
			    if (typeof callback === 'function') {
				    callback(itsPreTime);
			    }
		    };

		if ($this.hasClass('is-countdown')){
			return;
		}
		$this.countdown({
			until: $this.data('until'),
			format: 'dHMS',
			padZeroes: true,
			compact: true,
			onExpiry: function () {
				onExpiry(false);
			},
			tickInterval: 1,
			onTick: function (periods) {
				if (periods[3] === 0 && periods[4] === 0 && periods[5] < 30 && !canEnter) {
					onExpiry(true);
				}
			}
		});
	});
}
$(document).ready(function () {
	activateCountDown('.countdown:not(.countdown-uniq)');
});