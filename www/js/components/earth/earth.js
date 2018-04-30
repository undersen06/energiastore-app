'use strict';

(function () {
	this.app.component('earth', {
		templateUrl: 'js/components/earth/earth.tpl.html',
		controller: function () {

			var worldId;
			worldId = $('#world-animate');
			worldId.addClass('world-container-active');


		}
	});
}).call(this);
