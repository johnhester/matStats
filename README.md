# matStats
matStats is a single page mobile application to aid in the training habits of brazilian jiu jitsu (bjj) practitioners by tracking the techniques that they are currently developing in addition to logging their training sessions. matStats offers users full CRUD (Create, Read, Update, Delete) with respect to their training log and partial CRUD with respect to the techniques they are currently training.
* If a technique does not exist in our database, users may add it themselves!
* When logging a new session, in addition to the date, length, type, and notes, users can also track any techniques they successfully executed while training that day.

## Technologies
matStats was made using React, React-Bootstrap, JavaScript, CSS, and HTML.

# Minimum Viable Product: 
* Ability to login for user-specific content
    * logout
* User-specific log of training sessions (CRUD)
      * Date, time, type of training, techniques applied successfully
* User chosen techniques to focus their training (partial CRUD)
    * Once a technique is logged in the system it will be available to all users
    * Techniques will be sorted into types: submission, sweep, escape, takedown, guard, general position, other
    * The user can delete their history with a technique, but cannot remove it from the database

## Stretch Goals:

* Display user training details in meaningful ways using the Victory chart library
* Increase the number of ways that data is displayed in the stats section
* Add ability to have a ‘stable’ of techniques that have been performed successfully or prioritized in the past
* Allow users to add profile photos 
* Allow users to edit their profile
* Allow users to follow each other
    * Messaging between users
* Allow users to tag each other in training sessions


