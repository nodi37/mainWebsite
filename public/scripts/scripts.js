$("document").ready(() => {
    setTimeout(() => {
        $(".main").scroll(scrollHandle)
    }, 100)

    $('.welcome')[0].click();
    $('.main').scrollTop(0);
    var welcome = $("#welcome").position().top;
    var me = $("#me").position().top;
    var contact = $("#contact").position().top;
    var currentState = 0;

    $(window).on("resize", () => {
        $(".main").stop().animate({
            scrollTop: 0
        }, 100, 'swing', function () {
            welcome = $("#welcome").position().top;
            me = $("#me").position().top;
            contact = $("#contact").position().top;
            $(".active").removeClass("active");
            $(".welcome").addClass("active");
        });
    })

    $(".item").on("click", evt => {
        $(".main").off("scroll", scrollHandle);
        const classes = $(evt.currentTarget).attr("class");
        const target = "a." + classes.substring(0, classes.indexOf(" "));
        move(target);
    });

    function scrollHandle() {
        $(".main").off("scroll", scrollHandle);

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
            }, 100)
        });
    }
})

var counter = 0;

function fnClear(x) {
    if (counter === 0) {
        counter++;
        x.value='';
    }
}