//nombre de marché en cours 
var nbreMarche = document.querySelector(".nbreMarche");
//les variables qui vont évoluer avec les click
var mcourantMarche = date.getMonth() + 1;
var anneCourantMarche = date.getFullYear();
var dateAu = date.getDate();
var varClick = 0;

//selection des boutons suivant et précedent
var precedenteDate = document.querySelector(".precedenteDate");
var suivanteDate = document.querySelector(".suivanteDate");
var dateDuJours = document.querySelector(".dateDuJours");

//marchés aujourd'hui par défaut
ajouteMarcheJourX(dateAu);
//fonction pour aller à une date future
bougeDateMarche(mcourantMarche, anneCourantMarche, dateAu);
function dateSuivante() {
    if (varClick < 1) {
        cleanDayMarketTable();
        dateAu = dateAu + 1;
        bougeDateMarche(mcourantMarche, anneCourantMarche, dateAu);
        ajouteMarcheJourX(dateAu);
        varClick = varClick + 1;
    }
}

//fonctioon pour aller à une date passée
function datePrecedente() {
    if (varClick > -1) {
        cleanDayMarketTable();
        dateAu = dateAu - 1;
        bougeDateMarche(mcourantMarche, anneCourantMarche, dateAu);
        ajouteMarcheJourX(dateAu);
        varClick = varClick - 1;
    }
}

function bougeDateMarche(mois, annee, date) {
    if (anneeBissextile(annee) == 1) {
        if (mois == 2) {
            var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[2];
        } else {
            var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
        }
    } else {
        var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
    }
    if (date > nbresTotaleDeJourDuMois) {
        date = 1;
        dateAu = date;
        if (mois < 12) {
            mois = mois + 1;
            mcourantMarche = mois;
        }
        else {
            mois = 1;
            annee = annee + 1;
            mcourantMarche = mois;
            anneCourantMarche = annee;
        }

    }
    else {
        if (date <= 0) {
            mois = mois - 1;
            if (mois <= 0) {
                mois = 12;
                annee = annee - 1;
            }

            if (anneeBissextile(annee) == 1) {
                if (mois == 2) {
                    var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[2];
                } else {
                    var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
                }
            } else {
                var nbresTotaleDeJourDuMois = moisDeAnnee(mois)[1];
            }

            mcourantMarche = mois;
            date = nbresTotaleDeJourDuMois;
            dateAu = date;
            anneCourantMarche = annee
        }
    }
    dateDuJours.innerHTML = date + " " + moisDeAnnee(mois)[0] + " " + annee;
    return 0;
}
//attribution de l'événement "click" au bouton
precedenteDate.addEventListener("click", datePrecedente);

suivanteDate.addEventListener("click", dateSuivante);

//fonction pour faire nettoyer les élément du tableau
var aujourdhui = document.querySelector("#aujourdhui");
function cleanDayMarketTable() {
    var laTable = document.querySelector(".au_table");

    aujourdhui.removeChild(laTable);

    //je crée à nouveau la table
    var newTable = document.createElement("table");
    newTable.setAttribute("class", "au_table");

    var newTr = document.createElement("tr");
    var fTh = document.createElement("th");
    fTh.innerHTML = "N°";
    newTr.appendChild(fTh);

    var sTh = document.createElement("th");
    sTh.innerHTML = "Marché";
    newTr.appendChild(sTh);
    newTable.appendChild(newTr)
    aujourdhui.appendChild(newTable);
}

//fonction pour mieux faire sortir les dates du marché dont in besoin

function lesDatesDuMarcheDuMoisSI(mois, annee, moisDeReference, anneeReference, premierJourReference, positionJourReference, intervalle) {
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

    return lesDates;
}

//essai
var leMarcher = listeReferences(Atacora[3][0].split("/"));
var listeDateSA = lesDatesDuMarcheDuMoisSI(mcourantMarche, anneCourantMarche, leMarcher[0], leMarcher[1], leMarcher[2], leMarcher[3], leMarcher[4]);

function ajouteMarcheJourX(date) {
    var auTable = document.querySelector(".au_table");
    var m = 1;
    for (let i = 0; i < listeDepartement.length; i++) {
        var nomDepartementAu = listeDepartement[i];
        var variableMDep = eval(listeDepartement[i]);

        for (let j = 1; j < variableMDep.length; j++) {
            var marcherQ = variableMDep[j];
            var nomMarcherAu = marcherQ[1];
            var lesReference = listeReferences(marcherQ[0].split("/"));
            var lesDatesX = lesDatesDuMarcheDuMoisSI(mcourantMarche, anneCourantMarche, lesReference[0], lesReference[1], lesReference[2], lesReference[3], lesReference[4]);
            for (let k = 0; k < lesDatesX.length; k++) {
                var elmtDateX = lesDatesX[k];
                if (elmtDateX == date) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    td1.innerHTML = m;
                    m = m + 1;
                    tr.appendChild(td1);
                    var td2 = document.createElement("td");
                    td2.innerHTML = nomMarcherAu + ", " + nomDepartementAu;
                    tr.appendChild(td2);
                    auTable.appendChild(tr);
                }
            }
        }

    }
    nbreMarche.innerHTML = m - 1;
}

