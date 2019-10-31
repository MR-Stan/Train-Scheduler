let appObject = {

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
    config : function() {

    },

    newTrain : function() {
        
    }


}






appObject.clock();