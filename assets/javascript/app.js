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
  
  firebase.initializeApp(firebaseConfig);

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

// button for adding trains
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	// grabs user input
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainTime = $("#train-time-input").val().trim();
    var trainFrequency = parseInt($("#frequency-input").val().trim());
    
    if (trainName === "" || trainDestination === "" || trainName === "" || trainFrequency === "" ){
        return;
    }

	// local temporary object for storing train data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	// uploads the train data to the firebase database
	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	

	// clears all of the text boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");

	// prevents loading a new page
	return false;
});




