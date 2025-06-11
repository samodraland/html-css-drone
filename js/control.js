(function () {
    const area = $('#app')
    const drone = $('#drone')

    const boundary = area.height() - drone.height() - 56
    const climb = 2
    const fwd = 10
    const key = {}

    function vertical(val, key1, key2) {
        var newVal = parseInt(val, 10)
            - (key[key1] ? climb : 0)
            + (key[key2] ? climb : 0);
        return newVal < 0 ? 0 : newVal > boundary ? boundary : newVal;
    }

    function forward(val, key1) {
        if (drone.offset().top < (boundary - 50)) {
            var newVal = parseInt(val, 10)
                + (key[key1] ? fwd : 0);
            if (newVal > 0) {
                $("#view1").css("animation", "motion1 15s linear infinite")
                $("#view2").css("animation", "motion1 25s linear infinite")
                $("#view3").css("animation", "motion1 35s linear infinite")
            } else {
                $("#view1, #view2, #view3").css("animation-play-state", "paused")
            }
            return `rotate(${newVal}deg)`
        }
    }

    $(window).on('keydown', function (e) {
        key[e.which] = true;
    });

    $(window).on('keyup', function (e) {
        key[e.which] = false;
    });

    drone.css("top", `${boundary}px`)

    setInterval(function () {
        drone.css({
            top: function (index, val) {
                return vertical(val, 38, 40);
            },
            transform: function (index, val) {
                return forward(0, 39)
            }
        });
    }, 5);
})()