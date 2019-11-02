let appObject = {

    database : firebase.database(),

    initialize : function() {
        //firebase.initializeApp(this.config);
        //firebase.analytics();
        this.clock();
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

    // initialize firebase
    // config : function() {
    //     apiKey: "AIzaSyAAtzkJGflxsAb44qVuxYJgt_wC5S29wQo",
    //     authDomain: "train-scheduler-9d172.firebaseapp.com",
    //     databaseURL: "https://train-scheduler-9d172.firebaseio.com",
    //     projectId: "train-scheduler-9d172",
    //     storageBucket: "train-scheduler-9d172.appspot.com",
    //     messagingSenderId: "258198591612",
    //     appId: "1:258198591612:web:a5e709bdd8b9111d7a11f9",
    //     measurementId: "G-K5BZY1KMVZ"
    // },

    newTrain : function() {
        $("#addTrain").on("click", function() {
            event.preventDefault();
            // holding train data from inputs
            let train = $("#train").val().trim();
            let destination = $("#destination").val().trim();
            let firstTrain = $("#firstTrain").val().trim();
            let frequency = $("#frequency").val().trim();
    
            // pushing held data to firebase
            appObject.database.ref().push({
            train : train,
            destination : destination,
            firstTrain : firstTrain,
            frequency : frequency,
            dateAdded : firebase.database.ServerValue.TIMESTAMP
            })
            // need to empty inputs
        });

        // need to pull stored data from firebase and put on DOM

}

appObject.initialize();
