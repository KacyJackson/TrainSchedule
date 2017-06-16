
//<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'>

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnfTLWwgy1FfPipoHvXgkf7eFXPtEnTcw",
    authDomain: "train-scheduler-c192c.firebaseapp.com",
    databaseURL: "https://train-scheduler-c192c.firebaseio.com",
    projectId: "train-scheduler-c192c",
    storageBucket: "train-scheduler-c192c.appspot.com",
    messagingSenderId: "695360725649"
  };
  firebase.initializeApp(config);

// Create Firebase variable and on-click function once the submit button is selected

  var database = firebase.database();
    $("#addTrainButton").on("click", function() {

      event.preventDefault()

// grab the user input from the add train form and store in a variable
  var trainName = $("#enterTrainName").val().trim();
  var destination = $("#enterTrainDestination").val().trim();
  var firstDepartureTime = moment($("#departureTime").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequencyInMinutes = $("#trainFrequency").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log (firstDepartureTime);
  console.log (trainFrequencyInMinutes);

// put the train data into the database

  var addTrain = {
    name: trainName,
    place: destination,
    firstTrain: firstDepartureTime,
    trainFrequency: trainFrequencyInMinutes
  }

//push the addTrain data to Firebase

  database.ref().push(addTrain);
    console.log(addTrain.name);
    console.log(addTrain.place);
    console.log(addTrain.departureTime);
    console.log(addTrain.trainFrequency);

//reset the form fields to "" without refreshing the page or opening a new tab

  $("#enterTrainName").val("");
  $("#enterTrainDestination").val("");
  $("#departureTime").val("");
  $("#trainFrequency").val("");

//return false;


// Tell firebase when to add new trains to the database

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

// Store childSnapshot variables into a variable to add to chart

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstDepartureTime = childSnapshot.val().departureTime;
  var trainFrequencyInMinutes = childSnapshot.val().trainFrequency;

// Update the time for the first train so it arrives earlier than current time
  
  var firstTimeUpdated = moment(firstDepartureTime, "HH:mm");

// create variable for the current time

  var timeNow = moment().format("HH:mm");
  console.log("Time Now:" + timeNow);

// calculate time left to wait  
  var timeDifference = moment().diff(moment(firstDepartureTime), "minutes");

  var waitTime = timeDifference % trainFrequencyInMinutes;  
  console.log(waitTime);
  
  var minutesLeft = trainFrequencyInMinutes - waitTime;
  console.log(minutesLeft);

// Add the train details to the train schedule chart

  var theTrainComing = moment().add(minutesLeft, "minutes").format("HH:mm");
  $("#trainChart>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + theTrainComing + "</td><td>" + trainFrequencyInMinutes + "</td><td>" + waitTime + "</td></tr>");

//close the on-click function  



});

});


  







