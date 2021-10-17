$("document").ready(() => {
    var isBigger = ($(window).width() > 1000) ? 1 : 0;
    var currentState = 0;
    var welcome = $("#welcome").position().top;
    var me = $("#me").position().top;
    var contact = $("#contact").position().top;
    var rightScrollTop = 0;
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
    });

    function handlers() {
        if (isBigger) {
            $('.welcome').removeAttr('href');
            $('.me').removeAttr('href');
            $('.contact').removeAttr('href');
            $('.welcome')[0].click();
            $(".welcome").addClass("active");
            $('.main').scrollTop(0);
            welcome = $("#welcome").position().top;
            me = $("#me").position().top;
            contact = $("#contact").position().top;
            currentState = 0;

            setTimeout(() => {
                $(".main").scroll(scrollHandle);
            }, 100);

            //$(".right").on("mouseenter", stopAnimateHandler) //I will use it later
            $(window).on("resize", toTheTop);
            $(".item").on("click", (evt) => {
                clickHandle(evt)
            });
        } else {
            righttotop();
            $(".active").removeClass("active");
            $('.welcome').attr('href', '#welcome');
            $('.me').attr('href', '#me');
            $('.contact').attr('href', '#contact');
        }
    }

    function turnOffHandlers() {
        $(".active").removeClass("active");
        $(".item").unbind("click");
        $(".main").unbind("scroll");
        //$(".right").unbind("mouseenter"); //I will use it later
        $(window).unbind("resize", toTheTop);
        $('.welcome').attr('href', '#welcome');
        $('.me').attr('href', '#me');
        $('.contact').attr('href', '#contact');
    }

    $(".right").scroll(rightscroll);

    function rightscroll(e) { //To not let overscroll on Safari! CSS: overscroll-behavior: contain; not work in safari.
        const columnheight = $(".right").height();
        const articleheight = $(".right>article").height();
        const top = $(".noscroll").height();
        const end = articleheight + top - columnheight;

        //STILL TESTING 
        // console.log("Początek art: " + top);
        // console.log("Aktualny stan: " + rightScrollTop);
        // console.log("Koniec art: " + end);

        if (!$(".right").is(":animated")) {
            rightScrollTop = $(".right").scrollTop();

            if ((rightScrollTop > end + 100)) {
                console.log("END!");
                $(".right").animate({
                    scrollTop: end
                }, 1000, 'swing');
            }

            if (rightScrollTop < top - 100) {
                console.log("TOP");
                $(".right").animate({
                    scrollTop: top
                }, 1000, 'swing');
            }
        }
    }

    //OLD function 
    // function stopAnimateHandler() {
    //     if ($(".right").is(":animated")) {
    //         $(".right").stop().animate({
    //             scrollTop: 0
    //         }, 200, 'swing');
    //     }
    // }

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
        righttotop();

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

            setTimeout(() => {
                $(".main").scroll(scrollHandle)
                $(".item").on("click", (evt) => {
                    clickHandle(evt)
                });
            }, 200)
        });
    }

    function righttotop() {
        const rtop = $(".noscroll").height(); //MOVES RIGHT COLUMN TO RIGHT TOP
        $(".right").animate({
            scrollTop: rtop
        }, 400, 'swing');
    }
})



var counter = 0;

function fnClear(x) {
    if (counter === 0) {
        counter++;
        x.value = '';
    }
}

function copy(event) {
    const target = $(event.target).parents('.copybox').attr('id');
    navigator.clipboard.writeText($("#" + target).text());
}