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
        $("#reply").html(`<h1>${comm[0]}</h1>`);

        const data = $("#gridform").serialize();

        $.ajax({
            url: '/',
            type: 'POST',
            data: data
        }).done(res => {
            if (res.status === 200) {
                const mid = res.id.slice(1, res.id.indexOf("@"));
                $("#reply").html(`<h1>${comm[1]}</h1>
                <p>${comm[2]} ${mid}</p>
                <h1>${comm[3]}</h1>`);
            } else {
                $("#reply").html(`<h1>${comm[4]} ${res.status} ${res.message} ${res.status===400?comm[6]:comm[7]}</h1>`);
            }
        })
    } else {
        $("#inf").text(comm[5]);
    }
}