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
const ctx = document.getElementById('myChart').getContext('2d');

var datosX = [];
var datosY = [];

// Mostrar lista de juego registrados y porcentajes
database.ref().child("videojuegos").on("child_added", function (snapshot) {
    var vjObj = snapshot.val();
    var item = document.createElement("li");
    item.className = "juegos";

    database.ref().child("votos").on("value", function (snapshot) {
        var total = snapshot.numChildren();
        totalVotos.innerHTML = total;
        console.log(total)

        database.ref().child("videojuegos").child(vjObj.id).child("votos").on("value", function (snapshot) {
            var numVotos = snapshot.numChildren();
            var porcentaje = Math.round((numVotos / totalVotos.innerHTML) * 100);
            item.innerHTML = vjObj.nombre + " (" + porcentaje + "%)";
            myChart.update();
        });
    });

    listaResultados.appendChild(item);
});



// Agregar y actualizar datos del grafico
database.ref().child("votos").on("value", function (snapshot) {
    var total = snapshot.numChildren();;

    database.ref().child("videojuegos").on("value", function (snapshot) {
        var listaHtml = document.querySelectorAll(".juegos");
        for (let i = 0; i < listaHtml.length; i++) {
            //listaHtml[i].remove();
            removeData(myChart);
        }

        snapshot.forEach(element => {
            var vjObj = element.val();
            var vjVot = Object.keys(vjObj.votos);
            var nombre = vjObj.nombre;
            var votos = Math.round(vjVot.length / total * 100);
            addData(myChart, nombre, votos);
        });

    });
});


// Dibujar grafico
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: datosX,
        datasets: [{
            label: '% de voto',
            data: datosY,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Metodo de la libreria para agregar datos
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

// Metodo de la libreria para quitar datos
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}