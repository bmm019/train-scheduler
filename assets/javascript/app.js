// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

const firebaseConfig = {
    apiKey: "AIzaSyDD8tyF3RxwQzknHEOdWY_Qp-BJWqsmKyk",
    authDomain: "trainscheduler-ae713.firebaseapp.com",
    databaseURL: "https://trainscheduler-ae713.firebaseio.com",
    projectId: "trainscheduler-ae713",
    storageBucket: "",
    messagingSenderId: "7147069919",
    appId: "1:7147069919:web:3af2812b07c2fc9f"
  };
  
  firebaseConfig.initialize(firebaseConfig);

  // Assign the reference to the database to a variable named 'database'
// var database = ...

var database = firebase.database();

// display current time
var currentTime = null;

function updateTime() {
	currentTime = moment().format("HH:mm:ss");
	$("#currentTime").html(currentTime);
}
console.log(currentTime);

$(document).ready(function() {
	updateTime();
	setInterval(updateTime, 1000);
});


