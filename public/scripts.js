//ANALITYCS AND RECAPTHCA
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-0WMXVG4RDT');

window.onload = () => {
    grecaptcha.ready(function () {
        grecaptcha.execute('6Lf3EYIeAAAAAJVpekE5gDClve_vAxS-pLe49-4V', { action: 'submit' }).then(function (token) {
            fetch('/captcha', {
                method: 'POST',
                body: JSON.stringify({
                    token: token
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).catch(function (err) {
                console.log('Something went wrong.', err);
            });
        });
    });
}


//Other scripts
