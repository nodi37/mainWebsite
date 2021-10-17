$("document").ready(() => {
    $("#gridform").on("submit", event => {
        event.preventDefault()
        submitform();
    });
})

async function submitform() {
    const token = await grecaptcha.getResponse();

    if (token) {
        $("#tosend").addClass("hidden");
        $("#reply").removeClass("hidden");
        $("#reply").html(`<h1>${comm[0]}</h1><i class="fas fa-circle-notch fa-spin"></i>`);

        const data = $("#gridform").serialize();

        $.ajax({
            url: '/',
            type: 'POST',
            data: data
        }).done(res => {
            if (res.status === 200) {
                $("#reply").html(`<h1>${comm[1]}</h1>
                <p>${comm[2]} ${res.id}</p>
                <h1>${comm[3]}</h1>`);
            } else {
                $("#reply").html(`<h1>${comm[4]} ${res.status} ${res.message} ${res.status===400?comm[6]:comm[7]}</h1>`);
            }
        })
    } else {
        $("#inf").text(comm[5]);
    }
}