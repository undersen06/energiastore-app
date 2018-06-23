.directive('earth', function () {
    return {
        templateUrl: 'js/components/earth/earth.tpl.html',
        controller: function () {

            var worldId;
            worldId = $('#world-animate');
            worldId.addClass('world-container-active');


        }
    }
});

