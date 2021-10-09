$("document").ready(() => {
    var userLang = navigator.language || navigator.userLanguage;
    if (!userLang.toLowerCase().includes("no")) {
        setLang(userLang.toLowerCase());
        $('#notify').slideToggle(1000);
    }
})

const hnorsk = ["Hei!", "Hyggelig å se deg!", "<i class='far fa-hand-point-left'></i>Bruk knappene til å navigere", "Jeg er", "Alder:", "25 år gammel", "Sted:", "Oslo, Norge", "Språk:", "Engelsk, Norsk, Tysk, Polsk", "Utdanning:", "Videregående skole med fagbrev i IT-bransjen", "TEKST O MNIE PO NORWESKU", "Vil du vite mer om meg? Kontakt meg!<i class='far fa-hand-point-down'></i>", "Din melding...", "E-posten din..."];//email placeholder must be the last one in array
const jnorsk = ["Vennligst vent et øyeblikk", "Jeg hår fatt meldingen din og skal svare snart!", "Din melding-id er: ", "Takk!", "Noen feil her!", "Fyll reCaptcha først!", "Sjekk reCaptcha og prøv igjen.", "Prøv igjen senere."];

const henglish = ["Hi!", "Nice to see you!", "<i class='far fa-hand-point-left'></i>Use the buttons to navigate", "I am", "Age:", "25 years old", "Location:", "Oslo, Norway", "Languages:", "English, Norwegian, German, Polish", "Education:", "High school with IT-Technician certificate", "TEKST O MNIE PO ANG", "Do you want to know more about me? Contact me!<i class='far fa-hand-point-down'></i>", "Your message...", "Your email adress:"];//email placeholder must be the last one in array
const jenglish = ["Please wait!", "I got Your message and will answer soon!", "Your message id is:", "Thank you!", "Some serror here: ", "Please finish reCaptcha!", "Check reCaptcha and try again.", "Try again later."];

const hpolish = ["Cześć!", "Miło Cię widzieć!", "<i class='far fa-hand-point-left'></i>Użyj przycisków aby się poruszać", "Jestem", "Wiek:", "25 lat", "Miejsce:", "Oslo, Norwegia", "Języki obce:", "Angielski, Norweski, Niemiecki", "Wyształcenie:", "Średnie-techniczne, profil: Technik-Informatyk", "TEKST O MNIE PO PL", "Masz pytanie? Napisz do mnie!<i class='far fa-hand-point-down'></i>", "Twoja wiadomość...", "Twój adres email..."];//email placeholder must be the last one in array
const jpolish = ["Proszę czekać!", "Dostałem Twoją wiadomość i odpowiem jak najszybciej!", "Identyfikator wiadomości to:", "Dziękuję!", "Jakiś błąd: ", "Uzupełnij reCaptcha!", "Sprawdź reCaptcha i spróbuj ponownie.", "Spróbuj ponownie później."];

var txts = hnorsk;
var comm = jnorsk;

function setLang(language) {
    language.includes("en")&&(language="en");
    language.includes("no")&&(language="no");
    language.includes("pl")&&(language="pl");

    switch (language) {
        case "en":
            document.title = "Hire Norbert! He is the best!";
            txts = henglish;
            comm = jenglish;
            break;
        case "no":
            document.title = "Lei Norbert! Han er best!";
            txts = hnorsk;
            comm = jnorsk;
            break;
        case "pl":
            document.title = "Szukam pracy!";
            txts = hpolish;
            comm = jpolish;
            break;
        default:
            txts = hnorsk;
            comm = jnorsk;
    }
    setElements();
}

function setElements() {
    const targets = [".greeting>h1", ".greeting>h2", ".greeting>h3", ".left>p", "#lage", "#tage", "#lloc", "#tloc", "#llang", "#tlang", "#ledu", "#tedu", ".right>article", ".view3 h1", ".mess"]; //REMEMBER TO USE CLASSES FOR JQUERY IN THE FUTURE! 
    $('#email').attr("placeholder", txts[txts.length - 1])
    targets.forEach((target, index) => {
        if (target.charAt(0) === "#") { 
            document.getElementById(target).innerHTML = txts[index];
        } else {
            $(target).html(txts[index]);
        }
    })
}