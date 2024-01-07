/* http://keith-wood.name/countdown.html
 * Russian initialisation for the jQuery countdown extension
 * Written by Sergey K. (xslade{at}gmail.com) June 2010. */
(function($) {
	$.countdown.regionalOptions['en'] = {
		labels: ['years', 'month', 'week', 'days', 'hours', 'min', 'sec'],
		labels1: ['year', 'month', 'week', 'day', 'hour', 'min', 'sec'],
		labels2: ['year', 'month', 'week', 'day', 'hour', 'min', 'sec'],
		compactLabels: ['y', 'm', 'w', 'd'], compactLabels1: ['y', 'm', 'w', 'd'],
		whichLabels: function(amount) {
			var units = amount % 10;
			var tens = Math.floor((amount % 100) / 10);
			return (amount == 1 ? 1 : (units >= 2 && units <= 4 && tens != 1 ? 2 :
				(units == 1 && tens != 1 ? 1 : 0)));
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['en']);
})(jQuery);