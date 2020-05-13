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

// Leer lista de firebase
database.ref().child("videojuegos").on("child_added", function (snapshot) {
    var vjObj = snapshot.val();
    var item = document.createElement("li");
    var numVotos;
    datosX.push(vjObj.nombre)

    database.ref().child("votos").on("value", function (snapshot) {
        var total = snapshot.numChildren();
        totalVotos.innerHTML = "Total de votos: " + total;

        database.ref().child("videojuegos").child(vjObj.id).child("votos").on("value", function (snapshot) {
            numVotos = snapshot.numChildren();
            var porcentaje = Math.round((numVotos / total) * 100);
            item.innerHTML = vjObj.nombre + " (" + porcentaje + "%)";
            datosY.push(porcentaje);
            myChart.update();
            console.log(datosY);
        });
    });
    listaResultados.appendChild(item);
});

// Grafico
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: datosX,
        datasets: [{
            label: 'Número de votos',
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

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    //datosX.shift();
    //datosY.shift();
    chart.update();
}
