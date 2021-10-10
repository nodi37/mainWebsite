$("document").ready(() => {
    var userLang = navigator.language || navigator.userLanguage;
    if (!userLang.toLowerCase().includes("no")) {
        setLang(userLang.toLowerCase());
        $('#notify').slideToggle(1000);
    }
})

const hnorsk = ["Hei!", "Hyggelig å se deg!", "<i class='far fa-hand-point-left'></i>Bruk knappene til å navigere", "Jeg er", "Alder:", "25 år gammel", "Sted:", "Oslo, Norge", "Språk:", "Engelsk, Norsk, Tysk, Polsk", "Utdanning:", "Videregående skole med fagbrev i IT-bransjen", "JEZELI TU JESTES TO ZNACZY ZE CI UFAM.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tortor ut leo vulputate, id pharetra magna aliquet. Suspendisse magna dolor, sollicitudin eu laoreet eget, vulputate id sapien. In quis imperdiet dui. Integer ac porttitor quam, eget scelerisque erat. In urna justo, feugiat blandit velit id, condimentum hendrerit tortor. Curabitur malesuada quam bibendum leo suscipit, ut pulvinar lorem vestibulum. Aliquam ornare convallis lectus at dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate tincidunt massa maximus consequat. Curabitur convallis elit eu justo mollis, a porta diam auctor. Aenean elementum, purus at molestie placerat, metus arcu auctor diam, quis iaculis libero lectus quis turpis. Suspendisse potenti. Integer a sagittis arcu, sed tempus purus. Cras nec mattis erat, in convallis ante. Quisque non scelerisque nisl. Nullam pellentesque turpis velit, eget scelerisque risus sodales ac. Vivamus euismod tristique aliquet. Donec non tempus est. Vestibulum laoreet convallis egestas. Mauris tincidunt dictum eros in placerat. Quisque semper turpis tincidunt, finibus quam ut, vestibulum diam. Pellentesque eu justo nunc. Suspendisse congue tristique ullamcorper. Donec laoreet dictum dolor, blandit gravida ipsum finibus non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras finibus sapien et nibh lobortis, in ultrices risus accumsan. Nulla facilisi. Quisque non accumsan mauris, vitae elementum purus. Donec pharetra mauris vel aliquam feugiat. Mauris est mauris, malesuada at massa ut, scelerisque suscipit urna. Donec auctor, tortor non accumsan lobortis, elit augue hendrerit nibh, auctor posuere erat lorem malesuada ante. Nulla facilisi. Quisque ac volutpat erat. Quisque non libero quis nisi facilisis posuere eget a mi. Sed non efficitur nulla. Cras nulla nisl, laoreet et neque eu, consectetur porttitor nulla.", "Vil du vite mer om meg? Kontakt meg!<i class='far fa-hand-point-down'></i>", "Din melding...", "E-posten din..."];//email placeholder must be the last one in array
const jnorsk = ["Vennligst vent et øyeblikk", "Jeg hår fatt meldingen din og skal svare snart!", "Din melding-id er: ", "Takk!", "Noen feil her!", "Fyll reCaptcha først!", "Sjekk reCaptcha og prøv igjen.", "Prøv igjen senere."];

const henglish = ["Hi!", "Nice to see you!", "<i class='far fa-hand-point-left'></i>Use the buttons to navigate", "I am", "Age:", "25 years old", "Location:", "Oslo, Norway", "Languages:", "English, Norwegian, German, Polish", "Education:", "High school with IT-Technician certificate", "JEZELI TU JESTES TO ZNACZY ZE CI UFAM.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tortor ut leo vulputate, id pharetra magna aliquet. Suspendisse magna dolor, sollicitudin eu laoreet eget, vulputate id sapien. In quis imperdiet dui. Integer ac porttitor quam, eget scelerisque erat. In urna justo, feugiat blandit velit id, condimentum hendrerit tortor. Curabitur malesuada quam bibendum leo suscipit, ut pulvinar lorem vestibulum. Aliquam ornare convallis lectus at dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate tincidunt massa maximus consequat. Curabitur convallis elit eu justo mollis, a porta diam auctor. Aenean elementum, purus at molestie placerat, metus arcu auctor diam, quis iaculis libero lectus quis turpis. Suspendisse potenti. Integer a sagittis arcu, sed tempus purus. Cras nec mattis erat, in convallis ante. Quisque non scelerisque nisl. Nullam pellentesque turpis velit, eget scelerisque risus sodales ac. Vivamus euismod tristique aliquet. Donec non tempus est. Vestibulum laoreet convallis egestas. Mauris tincidunt dictum eros in placerat. Quisque semper turpis tincidunt, finibus quam ut, vestibulum diam. Pellentesque eu justo nunc. Suspendisse congue tristique ullamcorper. Donec laoreet dictum dolor, blandit gravida ipsum finibus non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras finibus sapien et nibh lobortis, in ultrices risus accumsan. Nulla facilisi. Quisque non accumsan mauris, vitae elementum purus. Donec pharetra mauris vel aliquam feugiat. Mauris est mauris, malesuada at massa ut, scelerisque suscipit urna. Donec auctor, tortor non accumsan lobortis, elit augue hendrerit nibh, auctor posuere erat lorem malesuada ante. Nulla facilisi. Quisque ac volutpat erat. Quisque non libero quis nisi facilisis posuere eget a mi. Sed non efficitur nulla. Cras nulla nisl, laoreet et neque eu, consectetur porttitor nulla.", "Do you want to know more about me? Contact me!<i class='far fa-hand-point-down'></i>", "Your message...", "Your email adress:"];//email placeholder must be the last one in array
const jenglish = ["Please wait!", "I got Your message and will answer soon!", "Your message id is:", "Thank you!", "Some serror here: ", "Please finish reCaptcha!", "Check reCaptcha and try again.", "Try again later."];

const hpolish = ["Cześć!", "Miło Cię widzieć!", "<i class='far fa-hand-point-left'></i>Użyj przycisków aby się poruszać", "Jestem", "Wiek:", "25 lat", "Miejsce:", "Oslo, Norwegia", "Języki obce:", "Angielski, Norweski, Niemiecki", "Wyształcenie:", "Średnie-techniczne, profil: Technik-Informatyk", "JEZELI TU JESTES TO ZNACZY ZE CI UFAM.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat tortor ut leo vulputate, id pharetra magna aliquet. Suspendisse magna dolor, sollicitudin eu laoreet eget, vulputate id sapien. In quis imperdiet dui. Integer ac porttitor quam, eget scelerisque erat. In urna justo, feugiat blandit velit id, condimentum hendrerit tortor. Curabitur malesuada quam bibendum leo suscipit, ut pulvinar lorem vestibulum. Aliquam ornare convallis lectus at dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate tincidunt massa maximus consequat. Curabitur convallis elit eu justo mollis, a porta diam auctor. Aenean elementum, purus at molestie placerat, metus arcu auctor diam, quis iaculis libero lectus quis turpis. Suspendisse potenti. Integer a sagittis arcu, sed tempus purus. Cras nec mattis erat, in convallis ante. Quisque non scelerisque nisl. Nullam pellentesque turpis velit, eget scelerisque risus sodales ac. Vivamus euismod tristique aliquet. Donec non tempus est. Vestibulum laoreet convallis egestas. Mauris tincidunt dictum eros in placerat. Quisque semper turpis tincidunt, finibus quam ut, vestibulum diam. Pellentesque eu justo nunc. Suspendisse congue tristique ullamcorper. Donec laoreet dictum dolor, blandit gravida ipsum finibus non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras finibus sapien et nibh lobortis, in ultrices risus accumsan. Nulla facilisi. Quisque non accumsan mauris, vitae elementum purus. Donec pharetra mauris vel aliquam feugiat. Mauris est mauris, malesuada at massa ut, scelerisque suscipit urna. Donec auctor, tortor non accumsan lobortis, elit augue hendrerit nibh, auctor posuere erat lorem malesuada ante. Nulla facilisi. Quisque ac volutpat erat. Quisque non libero quis nisi facilisis posuere eget a mi. Sed non efficitur nulla. Cras nulla nisl, laoreet et neque eu, consectetur porttitor nulla.", "Masz pytanie? Napisz do mnie!<i class='far fa-hand-point-down'></i>", "Twoja wiadomość...", "Twój adres email..."];//email placeholder must be the last one in array
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