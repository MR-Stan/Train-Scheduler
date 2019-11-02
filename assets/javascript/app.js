let appObject = {

    database : firebase.database,

    nextArrival : "null",

    minutesAway : "null",

    // initialize firebase
    config : {
        apiKey: "AIzaSyAAtzkJGflxsAb44qVuxYJgt_wC5S29wQo",
        authDomain: "train-scheduler-9d172.firebaseapp.com",
        databaseURL: "https://train-scheduler-9d172.firebaseio.com",
        projectId: "train-scheduler-9d172",
        storageBucket: "train-scheduler-9d172.appspot.com",
        messagingSenderId: "258198591612",
        appId: "1:258198591612:web:a5e709bdd8b9111d7a11f9",
        measurementId: "G-K5BZY1KMVZ"
    },

    initialize : function() {
        firebase.initializeApp(this.config);
        firebase.analytics();
        this.clock();
        this.childAdded();
    },

    // displays current time
    clock : function() {
        let clock = moment().format("h:mm:ss a")
        $("#clock").text("Current Time: " + clock);

        let me = this;
        this.interval = setInterval(function() {
            me.clock();
        }, 1000);
    },

    newTrain : function() {
        $("#addTrain").on("click", function(event) {
            event.preventDefault();

            // pushing input data to firebase
            appObject.database.ref().push({
            train : $("#train").val().trim(),
            destination : $("#destination").val().trim(),
            frequency : $("#frequency").val().trim(),
            firstTrain : $("#firstTrain").val().trim(),
            dateAdded : firebase.database.ServerValue.TIMESTAMP
            });

            // creating new table row with data from firebase
            $("#newRow").append("<tr>" +
            "<td>" + snapshot.val().train + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
            "<td>" + snapshot.val().frequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td>" +
            "</tr>");

            appObject.clearInputForm();
        });
    },

    clearInputForm : function() {
        // clearing input fields
        $("#train").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    },

    childAdded : function() {
        appObject.database.ref().on("child_added", function (snapshot) {
            let check = false;
            if (snapshot.val().firstTrain != "" && snapshot.val().frequency != "") {
                let time = moment(snapshot.val().firstTrain, "h:mm");
                while (!check) {
                    if (moment().isAfter(time)) {
                        time.add(snapshot.val().frequency, 'minutes');
                    } 
                    else {
                        check = true;
                    }
                }
                appObject.arrivalTime = time.format("h:mm a");
                appObject.minutesAway = moment(arrivalTime, "h:mm a").fromNow(true);
            }
        });
    }
}

appObject.initialize();
