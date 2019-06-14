// Initialize Firebase


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


var database = firebase.database();

// display current time
var currentTime = null;

function updateTime() {
	currentTime = moment().format("HH:mm:ss");
	$("#currentTime").html(currentTime);
}


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


    // user must enter text in all fields to submit
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

function addTrain(childSnapshot) {

	var train = {
		trainName: childSnapshot.val().name,
		trainDestination: childSnapshot.val().destination,
		trainTime: childSnapshot.val().time,
		trainFrequency: childSnapshot.val().frequency,
		minutesAway: 0,
		nextArrival: ""
	}

	// converts the train time
	var timeConverted = moment(train.trainTime, "HH:mm");
	console.log("Time converted: " + timeConverted);

	// calculate the difference between first train time and now
	var timeDiff = moment().diff(moment(timeConverted), "minutes");
	console.log("Difference in time: " + timeDiff);

	// calculate minutes until next train 
	var remainder = timeDiff % train.trainFrequency;
	console.log("Remainder: " + remainder);
	console.log("Train Frequency: " + train.trainFrequency)
	train.minutesAway = train.trainFrequency - remainder;
	console.log("Minutes away: " + train.minutesAway);

	// calculate next train
	var nextTrain = moment().add(train.minutesAway, "minutes");

	// arrival time
	train.nextArrival = moment(nextTrain).format("HH:mm");
	console.log("Next arrival: " + train.nextArrival);

	// add each train's data into the table
	$("#new-train").append("<tr><td>" + train.trainName + "</td><td>" + train.trainDestination + "</td><td>" + "Every " + train.trainFrequency + " min" + "</td><td>" + train.nextArrival + "</td><td>" + train.minutesAway + " min" + "</td></tr>");
}

// creates firebase event for adding train to database and adds a row to the html
database.ref().on("child_added", function(childSnapshot) {

	addTrain(childSnapshot);

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});






