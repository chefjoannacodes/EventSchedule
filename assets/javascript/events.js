console.log("our files are linked properly");




 // Initialize Firebase
var config = {
    apiKey: "AIzaSyAYapN0DTajo-kknzOzjEG1mMhU5s3mdSk",
    authDomain: "event-planning-schedule.firebaseapp.com",
    databaseURL: "https://event-planning-schedule.firebaseio.com",
    storageBucket: "event-planning-schedule.appspot.com",
    messagingSenderId: "566839838151"
  };
  firebase.initializeApp(config);

//Variables

//get reference to database
  var database = firebase.database();



var nextArrival = 0;
var minutesAway = 0;

//submit button to add trains function
$("#submit-input").on("click", function(e) {
	console.log("when hit submit", this);
	e.preventDefault();

//Initial values for user input
	var empName = $("#name-input").val().trim();
	var empPlace = $("#place-input").val().trim();
	//var empFirstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
	//var empFrequencyMinutes = moment($("#frequency-input").val().trim()).format("X");

//Creates local "temporary" object for holding new train data
var newEvent = {
	name: empName,
	place: empPlace,
	//firstEventTime: empFirstEventTime,
	//frequencyMinutes: empFrequencyMinutes
};

//uploads new train data to database
database.ref().push(newEvent);

//logs everything to console
console.log(empName.name);
console.log(empPlace.place);
//console.log(empFirstEventTime.firstEventTime);
//console.log(empFrequencyMinutes.frequencyMinutes);

//alert
alert("Train successfully added");

//Clears all text boxes
$("#name-input").val("");
$("#place-input").val("");
$("#first-event-input").val("");
$("#frequency-input").val("");

//prevents moving to new page
return false;

});//end function for adding train "submit" button


//Create firebase event for adding train to the database and a row to HTML
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());
//store everything in a varaible
var empName = childSnapshot.val().name;
var empPlace = childSnapshot.val().place;
var empFirstEventTime = childSnapshot.val().firstEventTime;
var empFrequencyMinutes = childSnapshot.val().frequencyMinutes;

//train info
console.log(empName);
console.log(empPlace);
console.log(empFirstEventTime);
console.log(empFrequencyMinutes);

//prettify the train time and frequency in minutes
//var empFirstTrainTimePretty = moment.unix(empFirstTrainTime).format("HH:mm");

//calculate First train time
//add each train's data into the table
$("#event-table > tbody").append("<tr><td>" + empName + "</td><td>" + empPlace + "</td><td>" + empFirstEventTime + "</td><td>" + empFrequencyMinutes + "</td></tr>");

}); //end firebase event to add to database
















