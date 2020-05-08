var firebaseConfig = {
    apiKey: "AIzaSyDJEmg0jHehB0ovXKiIE9R4EZosycjT1bk",
    authDomain: "parcial2ecosistemas-2df25.firebaseapp.com",
    databaseURL: "https://parcial2ecosistemas-2df25.firebaseio.com",
    projectId: "parcial2ecosistemas-2df25",
    storageBucket: "parcial2ecosistemas-2df25.appspot.com",
    messagingSenderId: "130371026147",
    appId: "1:130371026147:web:b6320725a9b9987e1719d6",
    measurementId: "G-1W8CN4G81E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const listaResultados = document.getElementById("listaResultados");
const database = firebase.database();
const totalVotos = document.getElementById("totalVotos");

let votos = 0;

totalVotos.innerHTML = "Total de votos: " + votos;

// Leer lista de firebase
database.ref().child("videojuegos").on("child_added", function (snapshot) {
    var vjObj = snapshot.val();
    var item = document.createElement("li");

    //var porcentaje = (vjObj.voto / votos) * 100;

    item.innerHTML = vjObj.nombre /*+ " (" + porcentaje + "%)"*/;
    listaResultados.appendChild(item);
})