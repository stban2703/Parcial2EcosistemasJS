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


const nombreVideojuego = document.getElementById("nombreVideojuego");
const estudioVideojuego = document.getElementById("estudioVideojuego");
const estrenoVideojuego = document.getElementById("estrenoVideojuego");
const listaJuegos = document.getElementById("listaJuegos");
const registrarBtn = document.getElementById("registrarBtn");
const resultadosBtn = document.getElementById("resultadosBtn");
const database = firebase.database();

// Agregar videojuego
registrarBtn.addEventListener("click", registrar);

function registrar() {
    let nombre = nombreVideojuego.value;
    let estudio = estudioVideojuego.value;
    let estreno = estrenoVideojuego.value;

    if (nombre != "" && estudio != "" && estreno != "") {
        let id = database.ref().child("videojuegos").push().key;
        let videojuego = new Videojuego(id, nombre, estudio, estreno);
        database.ref().child("videojuegos").child(id).set(videojuego);
    } else {
        alert("Completa todos los campos");
    }

}

// Leer lista de firebase
database.ref().child("videojuegos").on("child_added", function (snapshot) {
    var vjObj = snapshot.val();
    var item = document.createElement("li");
    item.innerHTML = vjObj.nombre;
    listaJuegos.appendChild(item);
})
