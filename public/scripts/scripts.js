$("document").ready(() => {
    var isBigger = ($(window).width() > 1000) ? 1 : 0;
    var currentState = 0;
    var welcome = $("#welcome").position().top;
    var me = $("#me").position().top;
    var contact = $("#contact").position().top;
    handlers();

    $(window).on("resize", () => {
        const wWidth = $(window).width();
        if (isBigger & (wWidth < 1001)) {
            isBigger = 0;
            turnOffHandlers();
        }
        if (!isBigger & (wWidth > 1000)) {
            isBigger = 1;
            handlers();
        }
    })

    function handlers() {
        if (isBigger) {
            $('.welcome')[0].click();
            $(".welcome").addClass("active");
            $('.main').scrollTop(0);
            welcome = $("#welcome").position().top;
            me = $("#me").position().top;
            contact = $("#contact").position().top;
            currentState = 0;

            setTimeout(() => {
                $(".main").scroll(scrollHandle)
            }, 100);

            $(window).on("resize", toTheTop);
            $(".item").on("click", (evt) => {
                clickHandle(evt)
            });
        } else {
            $(".active").removeClass("active");
        }
    }

    function turnOffHandlers() {
        $(".active").removeClass("active");
        $(".item").unbind("click");
        $(".main").unbind("scroll");
        $(window).unbind("resize", toTheTop);
    }

    function toTheTop() {
        $(".item").unbind("click");
        $(".main").unbind("scroll");
        $(".main").stop().animate({
            scrollTop: 0
        }, 100, 'swing', function () {
            welcome = $("#welcome").position().top;
            me = $("#me").position().top;
            contact = $("#contact").position().top;
            currentState = 0;
            if (isBigger) {
                $(".active").removeClass("active");
                $(".welcome").addClass("active");
                setTimeout(() => {
                    $(".main").scroll(scrollHandle)
                    $(".item").on("click", (evt) => {
                        clickHandle(evt)
                    });
                }, 200)
            }
        });
    }

    function clickHandle(evt) {
        $(".main").unbind("scroll");
        $(".item").unbind("click");

        const classes = $(evt.currentTarget).attr("class");
        const target = "a." + classes.substring(0, classes.indexOf(" "));
        move(target);
    }

    function scrollHandle() {
        $(".main").unbind("scroll");
        $(".item").unbind("click");

        const scrolledState = $(".main").scrollTop();

        if (scrolledState > currentState & currentState != contact) {
            const classes = $("a.active").next("a").attr("class");
            const target = "a." + classes.substring(0, classes.indexOf(" "));
            move(target);

        } else if (currentState != welcome) {
            const classes = $("a.active").prev("a").attr("class");
            const target = "a." + classes.substring(0, classes.indexOf(" "));
            move(target);
        }

    }

    function move(target) {
        var top = 0;

        switch (target) {
            case "a.welcome":
                top = welcome;
                break;
            case "a.me":
                top = me;
                break;
            case "a.contact":
                top = contact;
                break;
            default:
                top = 0;
        }

        $(".active").addClass("animateout");
        $(".active").removeClass("active");

        $(target).addClass("animatein");

        $(".main").animate({
            scrollTop: top
        }, 1000, 'swing', function () {

            currentState = $(".main").scrollTop();

            $(".animateout").removeClass("animateout");
            $(target).addClass("active");
            $(".animatein").removeClass("animatein");

            if (top === me) {
                $(".right").animate({
                    scrollTop: 200
                }, 1000, 'swing').animate({
                    scrollTop: 0
                }, 400, 'swing');
            }

            setTimeout(() => {
                $(".main").scroll(scrollHandle)
                $(".item").on("click", (evt) => {
                    clickHandle(evt)
                });
            }, 200)
        });
    }
})



var counter = 0;

function fnClear(x) {
    if (counter === 0) {
        counter++;
        x.value = '';
    }
}