var friends = require('../data/friends.js');
module.exports = function (app) {

    app.get('/app/data/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/app/data/friends', function (req, res) {

        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        // convert user score to a number
        var scores = userScores.map(function (item) {
            return parseInt(item, 10);
        });
        userData = {
            "name": req.body.name,
            "photo": req.body.photo,
            "scores": scores
        }


        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        var sum = scores.reduce((a, b) => a + b, 0);
        console.log("Sum of user's score " + sum);
        console.log("Best match friend difference " + bestMatch.friendDifference);


        console.log("+++++++=================++++++++++");

        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Diff " + totalDifference);
            console.log("Best match friend difference " + bestMatch.friendDifference);

            var friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total friend score " + friendScore);
            totalDifference += Math.abs(sum - friendScore);
            console.log(" -------------------> " + totalDifference);
            // Loop through all the scores of each friend
            // for (var j = 0; j < friends[i].scores[j]; j++) {

            //     // We calculate the difference between the scores and sum them into the totalDifference
            //     totalDifference += Math.abs(sum - parseInt(friends[i].scores[j]));
            //     console.log(friends[i].scores[j] + " Friends Scores");

            // If the sum of differences is less then the differences of the current "best match"
            if (totalDifference <= bestMatch.friendDifference) {

                // Reset the bestMatch to be the new friend. 
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
                // }

            }
            console.log("Total Difference is " + totalDifference);

        }
        console.log(bestMatch);

        friends.push(userData);
        console.log("New User added");
        console.log(userData);

        res.json(bestMatch);

    });

}