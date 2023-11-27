//le script des contenus de l'applications.
//tout ce qu'il y a comme calendrier et date de marché

//ça commence ici
//fonction pour vérifier si une année est bissextile ou pas. Elle retourne 0 ou 1
var date = new Date();

var notification = document.querySelector(".notification");
var closeNotif = document.querySelector(".closebtn");

closeNotif.addEventListener("click", () => {
    notification.style.display = "none";
})

/* afficher/cacher les jours du calendrier */
var lesJoursCalendrier = document.querySelector(".lebas");
var showCalendarDays = document.querySelector(".showCalendar");

showCalendarDays.addEventListener("click", showContent);

function showContent() {
    showCalendarDays.innerHTML = "Cacher le calendrier";
    lesJoursCalendrier.style.display = "grid";
    showCalendarDays.removeEventListener("click", showContent);
    showCalendarDays.addEventListener("click", hideContent);
}

function hideContent() {
    showCalendarDays.innerHTML = "Afficher le calendrier";
    lesJoursCalendrier.style.display = "none";
    showCalendarDays.removeEventListener("click", hideContent);
    showCalendarDays.addEventListener("click", showContent);
}


/* fonction qui retourne un mois courant */
function mcourant() {
    var mc = date.getMonth();
    switch (mc) {
        case 0:
            return "Janvier";
            break;
        case 1:
            return "Février";
            break;
        case 2:
            return "Mars";
            break;
        case 3:
            return "Avril";
            break;
        case 4:
            return "Mai";
            break;
        case 5:
            return "Juin";
            break;
        case 6:
            return "Juillet";
            break;
        case 7:
            return "Août";
            break;
        case 8:
            return "Septembre";
            break;
        case 9:
            return "Octobre";
            break;
        case 10:
            return "Novembre";
            break;
        case 11:
            return "Décembre";
            break;
        default:
            return "Erreur";
            break;
    }
}

var jcourant = date.getDate();
var acourant = date.getFullYear();

function anneeBissextile(a) {
    if (a % 100 == 0) {
        if (a % 400 == 0) {
            var x = 1;
        } else {
            var x = 0;
        }
    } else {
        if (a % 4 == 0) {
            var x = 1;
        } else {
            var x = 0;
        }
    }
    return x;
}
// fin de la fonction bissextile

// #fonction pour renvoyer le nom du mois, le nombre de jours
function moisDeAnnee(a) {
    switch (a) {
        case 1:
            return ["Janvier", 31, 0, 1];
            break;
        case 2:
            return ["Février", 28, 29, 2];
            break;
        case 3:
            return ["Mars", 31, 0, 3];
            break;
        case 4:
            return ["Avril", 30, 0, 4];
            break;
        case 5:
            return ["Mai", 31, 0, 5];
            break;
        case 6:
            return ["Juin", 30, 0, 6];
            break;
        case 7:
            return ["Juillet", 31, 0, 7];
            break;
        case 8:
            return ["Août", 31, 0, 8];
            break;
        case 9:
            return ["Septembre", 30, 0, 9];
            break;
        case 10:
            return ["Octobre", 31, 0, 10];
            break;
        case 11:
            return ["Novembre", 30, 0, 11];
            break;
        case 12:
            return ["Décembre", 31, 0, 12];
            break;
        default:
            return "erreur";
            break;
    }
}
//la fonctin suivante est la fonction qui va nous envoyer toutes les informations sur un mois donné. ça va envoyer le nom du moi, les jours de façon précise et le jour du début du mois suivant.
function construitMois(pj, mois, annee) {
    var nom = moisDeAnnee(mois)[0];
    var semaines = [
        [nom, annee],
        ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    if (anneeBissextile(annee) == 1) {
        if (mois == 2) {
            var n = moisDeAnnee(mois)[2];
        } else {
            var n = moisDeAnnee(mois)[1];
        }
    } else {
        var n = moisDeAnnee(mois)[1];
    }
    if (pj == 8) {
        var pjint = 0;
    } else {
        var pjint = pj - 1;
    }
    var j = 2;
    var k = 1;

    for (let index = 0; index < 6; index++) {
        j = index + 2;
        for (let i = 0; i < 7; i++) {
            if (j == 2) {
                if (i < pjint) {
                    var t = " ";
                    semaines[j].push(t);
                } else {
                    if (k <= n) {
                        semaines[j].push(k);
                        k = k + 1;
                    }
                }
            } else {
                if (k <= n) {
                    semaines[j].push(k);
                    k = k + 1;
                }
            }
        }
    }
    if (semaines[7].length != 0) {
        var taille = semaines[7].length + 1;
        var n = semaines[7].length;
        while (n < 7) {
            t = " ";
            semaines[7].push(t);
            n = semaines[7].length;
        }
    } else {
        var taille = semaines[6].length + 1;
        var n = semaines[6].length;
        while (n < 7) {
            var t = " ";
            semaines[6].push(t);
            n = semaines[6].length;
        }
        for (let i = 0; i < 7; i++) {
            var t = " ";
            semaines[7].push(t);
        }
    }
    if (semaines[6].length == 0) {
        var taille = semaines[5].length + 1;
        var n = semaines[5].length;
        while (n < 7) {
            var t = " ";
            semaines[5].push(i, t);
            n = semaines[5].length;
        }
        for (let i = 0; i < 7; i++) {
            var t = " ";
            semaines[6].push(t);
        }
        for (let i = 0; i < 7; i++) {
            var t = " ";
            semaines[7].push(t);
        }
    }
    return [semaines, taille];
}

function construitInterfaceMois(moisConstruit) {
    var liste1 = moisConstruit[0];
    var debutMS = moisConstruit[1];

    var tetemois = document.querySelector(".tetemois");
    var nomMois = tetemois.getElementsByTagName("div")[0];
    tetemois.removeChild(nomMois);
    var lebas = document.querySelector(".lebas");
    var jours = document.querySelector(".jours");
    lebas.removeChild(jours);
    //var div1 = document.createElement("div");
    //div1.setAttribute("class", "mois");

    var div2 = document.createElement("div");
    div2.innerHTML = liste1[0][0] + ",  l'an " + liste1[0][1];
    div2.setAttribute("class", "nomMois");
    tetemois.appendChild(div2);
    //div1.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "jours");

    //var i=1;
    //var j=0;
    for (let j = 0; j <= 6; j++) {
        for (let i = 1; i <= 7; i++) {
            var span = document.createElement("span");
            span.innerHTML = liste1[i][j];

            /*if (liste1[i][j] != " ") {
                span.setAttribute(
                    "onclick",
                    "envoisDetails(" +
                    liste1[i][j] +
                    "," +
                    monthNumber(liste1[0][0]) +
                    "," +
                    liste1[0][1] +
                    "," +
                    j +
                    ");"
                );
            }*/

            if (
                liste1[0][1] == acourant &&
                liste1[0][0] == mcourant() &&
                liste1[i][j] == jcourant
            ) {
                span.setAttribute("id", "jcourant");
            }
            div3.appendChild(span);
        }
    }
    lebas.appendChild(div3);
    return debutMS;
}

function construitInterfaceMoisSA(moisConstruit) {
    var debutMS = moisConstruit[1];
    return debutMS;
}

function positionPremierJourAnnee(annee) {
    var m = annee - 1970;
    if (m < 0) {
        m = -m + 1;
        var d = 4;
        for (let a = 1; a < m; a++) {
            annee = 1970 - a;
            var f = d - 1;
            if (f == 0) {
                f = 7;
            }
            if (anneeBissextile(annee) == 1) {
                d = f - 1;
                if (d == 0) {
                    d = 7;
                }
            } else {
                d = f;
            }
        }
        return d;
    } else {
        var d = 4;
        for (let a = 0; a < m; a++) {
            var annee = 1970 + a;
            for (let i = 0; i < 12; i++) {
                var t = i + 1;
                var moisCourant = construitMois(d, t, annee);
                d = construitInterfaceMoisSA(moisCourant);
            }
        }
        return d;
    }
}

function cMois(a, b) {
    var c = positionPremierJourAnnee(b);
    for (let i = 0; i < 12; i++) {
        var t = i + 1;
        var moisCourant = construitMois(c, t, b);
        if (t == a) {
            c = construitInterfaceMois(moisCourant);
        } else {
            c = construitInterfaceMoisSA(moisCourant);
        }
    }
}

function monthNumber(a) {
    switch (a) {
        case "Janvier":
            return 1;
            break;
        case "Février":
            return 2;
            break;
        case "Mars":
            return 3;
            break;
        case "Avril":
            return 4;
            break;
        case "Mai":
            return 5;
            break;
        case "Juin":
            return 6;
            break;
        case "Juillet":
            return 7;
            break;
        case "Août":
            return 8;
            break;
        case "Septembre":
            return 9;
            break;
        case "Octobre":
            return 10;
            break;
        case "Novembre":
            return 11;
            break;
        case "Décembre":
            return 12;
            break;
        default:
            return 0;
            break;
    }
}

/* gestions des jours du marchés */

// fonction pour détecter le prochain jour du marché.
function JourProchain(jour, intervalle = 4) {
    var tamp = jour + intervalle,
        nbreTotalejoursSemaine = 7;
    tamp > nbreTotalejoursSemaine ? tamp = tamp - nbreTotalejoursSemaine : tamp = tamp;
    return tamp;
}

//fonction pour détecter le précédent jour du marché.
function JourPrecedent(jour, intervalle = 4) {
    var tamp = jour - intervalle,
        nbreTotalejoursSemaine = 7;
    tamp <= 0 ? tamp = nbreTotalejoursSemaine + tamp : tamp = tamp;
    return tamp;
}

//cette fonction reçois le jour de la semaine, et retourne une liste contenant le nom complet du jour et la première lettre du nom du jour: ex : JoursJ(1) retourne ["Lundi", "L"]
function JoursJ(jour) {
    switch (jour) {
        case 1:
            return ["Lundi", "L"];
            break;
        case 2:
            return ["Mardi", "M"];
            break;
        case 3:
            return ["Mercredi", "M"];
            break;
        case 4:
            return ["Jeudi", "J"];
            break;
        case 5:
            return ["Vendredi", "V"];
            break;
        case 6:
            return ["Samedi", "S"];
            break;
        case 7:
            return ["Dimanche", "D"];
            break;
        default:
            return "erreur de position";
            break;
    }
}

//la fonction suivante attribue le nombre de jours à un mois.
function NombreDeJoursDuMois(mois, annee) {
    if (anneeBissextile(annee) == 1) {
        if (mois == 2) {
            var nombreDeJoursDuMois = moisDeAnnee(mois)[2];
        } else {
            var nombreDeJoursDuMois = moisDeAnnee(mois)[1];
        }
    } else {
        var nombreDeJoursDuMois = moisDeAnnee(mois)[1];
    }
    return nombreDeJoursDuMois;
}

//la fonction suivante retourne le premier jour du marché de n'importe quelle mois de n'importe quelle année. Elle prend le mois et l'année concernée, l'intervalle et autres.
function firstMonthMarketDay(mois, annee, moisDeReference, anneeReference, premierJourReference, positionJourReference, intervalle) {
    var anneeFixe = anneeReference;
    var moisFixe = moisDeReference;
    var jourMarcheMois = premierJourReference;

    while (jourMarcheMois > intervalle) {
        jourMarcheMois = jourMarcheMois - intervalle;
        positionJourReference = JourPrecedent(positionJourReference, intervalle);
    }

    //on vérifie si l'année entrée par l'utilisateur est la même que l'année fixée et que le mois aussi est le même que le mois fixé dans le programme. Si tel est le cas, on sort directement avec comme retour la liste que fournit la date du premier jour du mois, et sa position dans la semaine (position entre 1 et 7)
    if ((anneeFixe == annee) && (moisFixe == mois)) {
        return [jourMarcheMois, positionJourReference];
    }

    // si le mois et l'année fournit par l'utilisateur ne sont pas les mêmes que ceux fixés, on fait ce qui suit
    else {
        if (anneeFixe == annee) {
            if (moisFixe < mois) {
                while (moisFixe < mois) {
                    var nbreJours = NombreDeJoursDuMois(moisFixe, anneeFixe);
                    var prochaineDate = jourMarcheMois + intervalle;

                    jourMarcheMois = prochaineDate;
                    if (prochaineDate > nbreJours) {
                        moisFixe = moisFixe + 1;
                        jourMarcheMois = prochaineDate - nbreJours;
                    }
                    positionJourReference = JourProchain(positionJourReference, intervalle);
                }
            } else {
                var premierJourDuMarche = 31
                var moisFixe = 8;

                while (moisFixe >= mois) {

                    var nbreJours = NombreDeJoursDuMois(moisFixe, anneeFixe);
                    premierJourDuMarche = premierJourDuMarche - intervalle;
                    positionJourReference = JourPrecedent(positionJourReference, intervalle);

                    if (premierJourDuMarche <= 0) {
                        if (moisFixe == mois) {
                            premierJourDuMarche = intervalle + premierJourDuMarche;
                            break;
                        } else {
                            moisFixe = moisFixe - 1;
                            premierJourDuMarche = NombreDeJoursDuMois(moisFixe, anneeFixe) + premierJourDuMarche;
                        }
                    }

                }
                jourMarcheMois = premierJourDuMarche;
            }
        } else {
            if (anneeFixe < annee) {

                while (anneeFixe <= annee) {
                    if ((moisFixe == mois) && (anneeFixe == annee)) {
                        break;
                    }
                    var nbreJours = NombreDeJoursDuMois(moisFixe, anneeFixe);
                    var prochaineDate = jourMarcheMois + intervalle;
                    positionJourReference = JourProchain(positionJourReference, intervalle);
                    jourMarcheMois = prochaineDate;
                    if (prochaineDate > nbreJours) {
                        moisFixe = moisFixe + 1;
                        jourMarcheMois = prochaineDate - nbreJours;
                        if (moisFixe > 12) {
                            moisFixe = 1;
                            anneeFixe = anneeFixe + 1
                        }
                    }

                }
            } else {
                var premierJourDuMarche = 31
                var moisFixe = 8;

                while (anneeFixe >= annee) {

                    var nbreJours = NombreDeJoursDuMois(moisFixe, anneeFixe);
                    premierJourDuMarche = premierJourDuMarche - intervalle;
                    positionJourReference = JourPrecedent(positionJourReference, intervalle);
                    if (premierJourDuMarche <= 0) {
                        if ((anneeFixe == annee) && (moisFixe == mois)) {
                            premierJourDuMarche = intervalle + premierJourDuMarche;
                            break;
                        } else {
                            moisFixe = moisFixe - 1;
                            if (moisFixe == 0) {
                                moisFixe = 12;
                                anneeFixe = anneeFixe - 1;
                            }
                            premierJourDuMarche = NombreDeJoursDuMois(moisFixe, anneeFixe) + premierJourDuMarche;
                        }
                    }

                }
                jourMarcheMois = premierJourDuMarche;
            }
        }
        return [jourMarcheMois, positionJourReference];
    }
}

// cette fonction renvois les jours respectifs de marché dans un mois donné.

function lesDatesDuMarcheDuMois(mois, annee, moisDeReference, anneeReference, premierJourReference, positionJourReference, intervalle) {
    if (anneeBissextile(annee) == 1) {
        if (mois == 2) {
            var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[2];
        } else {
            var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
        }
    } else {
        var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
    }
    //on connait le nombre total de jours dans le mois.

    //on récupere le premier jour de marché du mois, et sa position.
    var pJP = firstMonthMarketDay(mois, annee, moisDeReference, anneeReference, premierJourReference, positionJourReference, intervalle);
    var lesDates = [];
    var lesJours = [];
    var lesLettresJours = [];
    var signatures = [];

    var a = pJP[0];
    var b = pJP[1];

    do {
        lesDates.push(a);
        lesJours.push(JoursJ(b)[0]);
        lesLettresJours.push(JoursJ(b)[1]);
        a = a + intervalle;
        b = JourProchain(b, intervalle);
    } while (a <= nbresTotaleDeJourDuMois);

    var datePresente = false;
    var positionListe = -1;
    for (let i = 0; i < lesDates.length; i++) {
        const element = lesDates[i];
        if (element == date.getDate()) {
            datePresente = true;
            positionListe = i;
        }
    }
    //vérification de la date pour envoyer la notification
    var dateCompletes = [];
    for (let i = 0; i < lesDates.length; i++) {
        var dateComplete = "Le " + lesDates[i] + " " + moisDeAnnee(mois)[0] + " " + annee;
        dateCompletes.push(dateComplete);
    }

    var marketDayNotif;
    if ((annee == date.getFullYear()) && (mois == date.getMonth() + 1) && (datePresente == true)) {
        marketDayNotif = [true, dateCompletes[positionListe]];
    } else {
        marketDayNotif = [false, ""]
    }

    //remplissage de signatures
    for (let i = 0; i < lesDates.length; i++) {
        var temporaire;
        if ((mois == date.getMonth() + 1) && (annee == date.getFullYear())) {
            if (lesDates[i] < date.getDate()) {
                temporaire = "#datePassée";
            } else if (lesDates[i] > date.getDate()) {
                temporaire = "#à_venir";
            } else {
                temporaire = "#actuellement";
            }
        } else {
            if (mois < date.getMonth() + 1) {
                if (annee <= date.getFullYear()) {
                    temporaire = "#datePassée_AM";
                } else {
                    temporaire = "#à_venir_FM";
                }

            } else {
                if (annee < date.getFullYear()) {
                    temporaire = "#datePassée_AM";
                } else {
                    temporaire = "#à_venir_FM";
                }
            }
        }
        signatures.push(temporaire);
    }

    return [dateCompletes, lesLettresJours, lesJours, marketDayNotif, signatures, lesDates];
}

/* je crée la fonction qui va créer les dates de marché à leurs endroit */
function creatMarketDays(mois, annee, moisDeReference = 9, anneeReference = 2022, premierJourReference = 4, positionJourReference = 7, intervalle = 4) {
    var LesDates = lesDatesDuMarcheDuMois(mois, annee, moisDeReference, anneeReference, premierJourReference, positionJourReference, intervalle);
    var days = LesDates[0];
    var daysletters = LesDates[1];
    var allDaysNames = LesDates[2];
    var allSignatures = LesDates[4];
    var dates = LesDates[5];
    var listeDateFormater = [];

    for (let i = 0; i < days.length; i++) {
        var day = days[i];
        var dayletter = daysletters[i];
        var dayName = allDaysNames[i];
        var signature = allSignatures[i];

        //creations des balises
        var divDate = document.createElement("div");
        divDate.setAttribute("class", "dates");

        var span1 = document.createElement("span");
        span1.innerHTML = i + 1;
        span1.setAttribute("class", "numeros");
        divDate.appendChild(span1)

        var div1 = document.createElement("div");
        div1.setAttribute("class", "datesdiv1");

        var span0 = document.createElement("span");
        span0.innerHTML = "";
        span0.setAttribute("class", "pointconnect");
        console.log(dates[i]);
        if ((annee == date.getFullYear()) && (mois == date.getMonth() + 1) && (dates[i] == date.getDate())) {
            span0.setAttribute("id", "pointconnectj");
            span0.setAttribute("title", "Aujourd'hui est un jour de marché !");
        }
        div1.appendChild(span0);

        var span2 = document.createElement("span");
        span2.innerHTML = dayletter;
        span2.setAttribute("class", dayName);
        span2.setAttribute("id", "lettreJour");
        div1.appendChild(span2);

        var span3 = document.createElement("span");
        span3.innerHTML = dayName;
        span3.setAttribute("class", "nomCompletJour");
        div1.appendChild(span3);

        //on ajoute div1 à divdate
        divDate.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class", "banniere1");

        var div3 = document.createElement("div");
        div3.setAttribute("class", "banniere2");

        var div4 = document.createElement("div");
        div4.setAttribute("class", "informations");
        div4.innerHTML = day;
        div3.appendChild(div4);

        var div5 = document.createElement("div");
        div5.setAttribute("class", "signature");
        div5.innerHTML = signature;
        div3.appendChild(div5);
        div2.appendChild(div3);

        //on ajoute maintenant div2 dans divdates
        divDate.appendChild(div2);
        listeDateFormater.push(divDate);
    }

    return [listeDateFormater, LesDates[3]];
}

/* je crée maintenant une fonction qui vas supprmer les élément existant dans le div market_day et les remplacer
par les nouveaux */
function addMarketDaysToBlock(divdate) {
    var lesDatesPrecise = divdate[0]
    var marketCase = document.querySelector(".market_day");

    //on commence par supprimer toutes les balises div de l'endroit de stockage afin de mieux placer les prochaine création de balise.
    var lesDivs = marketCase.querySelectorAll(".dates");
    for (let i = 0; i < lesDivs.length; i++) {
        const element = lesDivs[i];
        marketCase.removeChild(element);
    }

    /* on ajoute maintenant les dates formater de notre code. */
    for (let i = 0; i < lesDatesPrecise.length; i++) {
        marketCase.appendChild(lesDatesPrecise[i]);
    }
    return divdate[1];
}

function cleanMarketDates() {
    var marketCase = document.querySelector(".market_day");

    //on commence par supprimer toutes les balises div de l'endroit de stockage afin de mieux placer les prochaine création de balise.
    var lesDivs = marketCase.querySelectorAll(".dates");
    for (let i = 0; i < lesDivs.length; i++) {
        const element = lesDivs[i];
        marketCase.removeChild(element);
    }
}

//on sélectionne le select qui contient les options de marché pour chaque département
var marcherSelect = document.querySelector("#marcher");
marcherSelect.addEventListener('click', () => {
    if (marcherSelect.value) {
        var donneesMarcher = listeReferences(marcherSelect.value.split("/"));
        addMarketDaysToBlock(creatMarketDays(mc, anneCourant, donneesMarcher[0], donneesMarcher[1], donneesMarcher[2], donneesMarcher[3], donneesMarcher[4]));
    } else {
        cleanMarketDates();
    }
})


//cette fonction prend les références passée en Value pour une option et les convertis en entier pour le bien des fonctions définit plus haut
function listeReferences(tab) {
    var liste = [];
    for (let i = 0; i < tab.length; i++) {
        var element = tab[i];
        element = parseInt(element);
        liste.push(element);
    }
    return liste
}

// la compilation du code par défaut pour la page. Cela fait appel à des fonctions créée pour le cas.
var mc = date.getMonth() + 1;
var anneCourant = acourant;
cMois(mc, anneCourant);

//fonction pour générer les prochains jours du marhé ainsi que les prochains mois de l'années
function moisSuivant() {
    mc = mc + 1;
    if (mc == 13) {
        mc = 1;
        anneCourant = anneCourant + 1;
    }
    cMois(mc, anneCourant);
    if (nomMarcher) {
        var donneesMarcher = listeReferences(nomMarcher.split("/"));
        var tempoMarcher = addMarketDaysToBlock(creatMarketDays(mc, anneCourant, donneesMarcher[0], donneesMarcher[1], donneesMarcher[2], donneesMarcher[3], donneesMarcher[4]));
    } else {
        cleanMarketDates();
    }
}

//fonction pour générer les mois précédents de l'année ainsi que les anciens jours du marché.
function moisPrecedent() {
    mc = mc - 1;
    if (mc == 0) {
        mc = 12;
        anneCourant = anneCourant - 1;
    }
    cMois(mc, anneCourant);
    if (nomMarcher) {
        var donneesMarcher = listeReferences(nomMarcher.split("/"));
        var tempoMarcher = addMarketDaysToBlock(creatMarketDays(mc, anneCourant, donneesMarcher[0], donneesMarcher[1], donneesMarcher[2], donneesMarcher[3], donneesMarcher[4]));
    } else {
        cleanMarketDates();
    }
}
//ça termine ici

/* ************************************* ******************
** ************************************* ******************
** ************************************* ******************
** ************************************* ****************** */

/* les actions sur l'écran */
/* **********************************************************/

//scroll
var nomMenusApp = document.querySelector('.nomMenusApp');
var marcherSurvole = document.querySelector(".marcherSurvole");

var corps = document.querySelectorAll(".corps");
corps[1].onscroll = function (e) {
    //var inabtn = document.querySelector("#inabtn");
    //var lBody = document.body.clientHeight;
    //var lFoot = document.getElementsByTagName("footer")[0].clientHeight;
    var rthaut = document.querySelector(".rthaut");
    //var diffLong = lBody - lFoot - 200;

    // pour le boutton de retour vers le haut
    if (this.scrollTop >= 310) {
        rthaut.style.display = "block";
        marcherSurvole.style.display = "block";
    }
    else {
        rthaut.style.display = "none";
        marcherSurvole.style.display = "none";
    }
}
//finscroll


//Dynamisation du menu
var menusAppBtn = document.querySelector(".menusBtn");
var menusAppContent = document.querySelector(".menus");

menusAppBtn.addEventListener("click", afficheMenus);

function afficheMenus() {
    menusAppContent.style.display = "block";
    menusAppBtn.removeEventListener("click", afficheMenus);
    menusAppBtn.addEventListener("click", fermeMenus);
    corps[1].addEventListener("click", fermeMenus);
}

function fermeMenus() {
    menusAppContent.style.display = "none";
    menusAppBtn.removeEventListener("click", fermeMenus);
    menusAppBtn.addEventListener("click", afficheMenus);
}
// fin de la dynamisation  du Menu


/* action suvant et precedent */
var precedent = document.querySelector(".precedent");
var suivant = document.querySelector(".suivant");

/* precedent.addEventListener("click", moisPrecedent);
suivant.addEventListener("click", moisSuivant); */

/* disparition du menus */
var corps = document.querySelector(".corps");
corps.addEventListener("click", fermeMenus);

/* action sur les corps */
var corps = document.querySelectorAll(".corps");
for (let i = 0; i < corps.length; i++) {
    var element = corps[i];
    element.style.display = "none";
}

// le corps par défaut
corps[1].style.display = "block";

function corpsHidden(i) {
    for (let i = 0; i < corps.length; i++) {
        const element = corps[i];
        element.style.display = "none";
    }
    corps[i].style.display = "block";
    corps[i].addEventListener("click", fermeMenus);
}

/* fin des actions sur les corps */

/* action sur l'image pour actualiser */
var actualiser = document.querySelector(".actualiser");
actualiser.addEventListener("click", () => {
    window.location.reload();
})

/* selection des sapans de menus */
var spans = document.querySelector(".menus").getElementsByTagName("span");
var marcherSurvoleParent = document.querySelector(".marcherSurvoleParent");
var rthautParent = document.querySelector(".rthautParent");

function cacheAfficheSpan(i) {
    spans[i].addEventListener("click", () => {
        nomMenusApp.innerHTML = spans[i].textContent;
        corpsHidden(i);
        if (i != 1) {
            marcherSurvoleParent.style.display = "none";
            rthautParent.style.display = "none";
        }
        else {
            marcherSurvoleParent.style.display = "grid";
            rthautParent.style.display = "block";
        }
        fermeMenus();
    })
}

for (let i = 0; i < 3; i++) {
    cacheAfficheSpan(i);
}

/* ********************************************* ************/
/* fin des actions sur l'écran */
/* **********************************************************
*************************************************************
*************************************************************
*************************************************************
*************************************************************
************************************************************/

//codes javascript pour la dynamisation des départements
//et marché.

var btnValide = document.querySelector(".valideBtn");
var allownewDep = document.querySelector(".nouveau");
var allMarket = document.querySelector(".allMarket");
var simule = document.querySelector(".simule");

var divInfoMarcher = document.querySelector("#pDatesMarche");

var nomDepartement = "";
var nomMarcher = "";
var dep = document.querySelector("#departement");


btnValide.addEventListener("click", valideDep)

function valideDep() {
    if (dep.value) {
        dep.setAttribute("disabled", "disabled");
        allMarket.style.display = "block";
        /* remplissage du select du marché */
        var marcherSelect = document.querySelector("#marcher");
        if (nomDepartement != dep.value) {
            nomMarcher = "";
            cleanMarketDates();
            nomDepartement = dep.value;

            allMarket.removeChild(marcherSelect);
            var newMarcherSelect = document.createElement("select");
            newMarcherSelect.setAttribute("name", "marcher");
            newMarcherSelect.setAttribute("id", "marcher");

            var valeurDepart = eval(dep.value);


            for (let i = 0; i < valeurDepart.length; i++) {
                var element = valeurDepart[i];
                var optionC = document.createElement("option");
                var newValue = element[0] + "/" + element[1];
                optionC.setAttribute("value", newValue);
                //optionC.setAttribute("value", element[0]);
                optionC.innerHTML = element[1];
                newMarcherSelect.appendChild(optionC);
            }

            allMarket.appendChild(newMarcherSelect);
        }
        btnValide.innerHTML = "Valide";
        btnValide.removeEventListener("click", valideDep);
        btnValide.addEventListener("click", valideMarket);

        simule.style.display = "none";
        allownewDep.style.display = "block";
        allownewDep.addEventListener("click", allowNewDep);
    }

}

/* fonction pour valider le marché concerné */
function valideMarket() {
    dep.setAttribute("disabled", "disabled");
    var marcherSelect = document.querySelector("#marcher");

    nomMarcher = marcherSelect.value;
    var donneesMarcher = listeReferences(marcherSelect.value.split("/"));
    if (donneesMarcher.length != 2) {
        var jourSpecifique = addMarketDaysToBlock(creatMarketDays(mc, anneCourant, donneesMarcher[0], donneesMarcher[1], donneesMarcher[2], donneesMarcher[3], donneesMarcher[4]));

        if (jourSpecifique[0] == true) {
            var MarketNotif = document.querySelector(".notification");
            MarketNotif.style.display = "block";
            var MarketNotifDate = document.querySelector(".date_notif");
            MarketNotifDate.innerHTML = jourSpecifique[1];
            var mkteName = document.querySelector(".mkteName");
            mkteName.innerHTML = marcherSelect.value.split("/")[5];

            function showContent() {
                MarketNotif.classList.add('notification_fini');
            }
            setTimeout(showContent, 3000);
            MarketNotif.setAttribute("class", "notification");
        }

        divInfoMarcher.style.display = "block";
        var nomMarcherD = document.querySelector(".pDatesMarchespUn");
        nomMarcherD.innerHTML = '<span style="font-size:0.3em;"> marché de </span><br>' + marcherSelect.value.split("/")[5];

        marcherSurvole.innerHTML = marcherSelect.value.split("/")[5];

        simule.style.display = "none";
        allownewDep.style.display = "block";
        allownewDep.addEventListener("click", allowNewDep);
    } else {
        console.log(donneesMarcher);
        cleanMarketDates();
    }
}

/* actionner les nouveau */
function allowNewDep() {
    dep.removeAttribute("disabled");
    btnValide.innerHTML = "Continue";
    btnValide.removeEventListener("click", valideMarket);
    btnValide.addEventListener("click", valideDep);
    allMarket.style.display = "none";
    allownewDep.style.display = "none";
    simule.style.display = "block";
    cleanMarketDates();
    divInfoMarcher.style.display = "none";
}

/* travaux sur les marchés du jours */
/* **************************************************** */
/* **************************************************** */