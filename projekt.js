/*          --Innehållsförteckning--

    1. Globala variabler
    2. Design
    3. Funktioner
    4. Klasser
    5. Start av spel

*/






/*--------------------           1. Globala variabler           --------------------*/
// OBS: antal är default 15 av anledningen att om användaren själv inte väljer antal möss som ska genereras, så genereras 15 st. 
var antal = 15,
    div, poang, tidtimer;



/*--------------------           2. Design av Gränssnitt som används i spelet            --------------------*/
// Stylar upp gameboxen! (skulle kunnas stylas upp i CSS, men har med det för att visa kunskapen)
div = document.getElementById("gamebox");
div.style.width = "500px";
div.style.height = "500px";
div.style.margin = "0 auto";
div.style.border = "darkblue dotted 2px";
div.style.position = "absolute";
div.style.top = "50px";
div.style.left = "650px";
div.style.backgroundColor = "aliceblue";




/*--------------------           3. Funktioner           --------------------*/


// Funktion som hämtar in antal möss som ska genereras
function guess() {
    var musnummer;
    // Hämtar antalet
    musnummer = document.getElementById("musnummer").value;

    //Avrundar talet ifall man skrivit med decimaler.
    musnummer = Math.floor(musnummer);

    // Visar hur många man ska fånga (visas ej för användare)
    if (musnummer > 0 && musnummer <= 100) {
        console.log("Antal möss som placeras i spelet: " + musnummer + " stycken möss!")
    }

    // Utifall man skriver något annat än tal mellan 0-100.
    else {
        musnummer = 15;
        alert("Du får endast gissa mellan 1 - 100")
    }
    // Globala variabeln antal får värdet av det man gissat man ska klara fånga.
    antal = musnummer;
}



// Funktion som räknar antal poäng, samt skriver ut hur många möss man ätit
function poangrakning() {
    poang += 1;
    document.getElementById("eatenmouse").innerHTML = poang;
}



// Funktion som säger hur spelet gick!
function utfall() {

    // Körs om man lyckas fånga alla möss från sin egen gissning eller standard-spelet(15 st)
    if (poang == antal || antal == 15 && poang == 15 /*Eller-delen används om användaren ej angett nummer, och fångar alla 15 "standard"-möss*/ ) {
        alert("Grattis, du lyckades hjälpa Kattson att fånga alla " + poang + " möss inom tiden!")
    }

    // Om man endast har 1-2 möss kvar att fånga körs denna. 
    else if ((antal >= 3 || poang >= 1) && poang >= (antal - 2)) {
        alert("Nära skjuter ingen hare! Testa igen och se om du lyckas äta alla, du hade bara " + (antal - poang) + " kvar");
    } else {
        // Om man inte spelar alls
        if (poang == 0) {
            alert("Sover du? Nu får du faktiskt försöka på riktigt!")
        }

        // Om man inte hinner fånga alla möss samt har fler än 2 möss kvar
        else {
            alert("Tyvärr du lyckades endast fånga " + poang + " av " + antal + " möss inom tiden, försök igen!")
        }
    }
}



// Funktion som nollställer spelet(knapp)
function reset() {

    // Nollställer poängen som visar antal ätna möss
    poang = 0;
    document.getElementById("eatenmouse").innerHTML = poang;

    // Tar bort alla överflödiga musar
    var allmouse = document.getElementsByClassName("musbild");
    for (var i = 0; i < allmouse.length; i++) {
        allmouse[i].style.display = "none";
    }

    // Nollställer timer
    clearInterval(tidtimer);
    document.getElementById("timer").innerHTML = "10";


    // Nollställer antalet
    antal = 15;
    document.getElementById("musnummer").value = "";

}




/*--------------------           4. Klasser           --------------------*/

// Skapar bilden mus och placerar den i spelrutan
class mus {
    constructor() {

        // Skapar random position inom spelrutan
        var yPos = (Math.random() * 420) + 20;
        var xPos = (Math.random() * 420) + 20;

        // Skapar bild-element samt ger alla en klass och ett event som flyttar musen vid knapptryck
        this.bild = document.createElement("img");
        this.bild.className = "musbild";
        this.bild.setAttribute("onclick", "style.display='none'; poangrakning();");

        // Stylar bild
        this.bild.style.position = "absolute";

        // Placerar bilderna på random position inom spelrutans
        this.bild.style.top = yPos + ("px");
        this.bild.style.left = xPos + ("px");

        // Länkar in bilden
        this.bild.src = "images/mus.png";

        // Placerar ut bilden
        document.getElementById("gamebox").appendChild(this.bild);
    }
}


// Genererar rätt antal bilder
class generateantal {
    constructor(antalmoss) {

        this.bilder = [];

        for (var i = 0; i < antalmoss; i++) {
            this.bilder[i] = new mus();
        }
    }
}




/*--------------------           5. Spelets start           --------------------*/

// Startar spelet, och placerar bilder 
function start() {


    /*---           Nollställning inför varje spelstart          ---*/

    // Nollställer poängen som visar antal ätna möss
    poang = 0;
    document.getElementById("eatenmouse").innerHTML = poang;

    // Tar bort alla överflödiga musar
    var allmouse = document.getElementsByClassName("musbild");
    for (var i = 0; i < allmouse.length; i++) {
        allmouse[i].style.display = "none";
    }

    // Nollställer timer
    clearInterval(tidtimer);
    document.getElementById("timer").innerHTML = "10";

    // Nollställer poängen vid varje ny start
    poang = 0;



    /*---           Start av spel           ---*/

    // Skapar alla bilder
    var skapabild = {};
    skapabild = new generateantal(antal);


    // Timer som tickar
    var tidkvar = 9;
    tidtimer = setInterval(function () {
        if (tidkvar <= 0) {
            clearInterval(tidtimer);
            document.getElementById("timer").innerHTML = "0";

            // Funktion som körs när tiden är ute (som berättar resultatet!)
            utfall();
        } else {
            document.getElementById("timer").innerHTML = tidkvar;
        }
        tidkvar -= 1;
    }, 1000);
}