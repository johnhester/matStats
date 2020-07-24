# matStats
Overview: matStats is a mobile app to aid in the training habits of brazilian jiu jitsu (bjj) practitioners by tracking the techniques that they are currently developing along with logging their training sessions.

# Minimum Viable Product: 
* Ability to login for user-specific content
    * logout
* User-specific log of training sessions (CRUD)
      * Date, time, type of training, techniques applied successfully
* User chosen techniques to focus their training (partial CRUD)
    * Once a technique is logged in the system it will be available to all users
    * Techniques will be sorted into types: submission, sweep, escape, takedown, guard, general position, other
    * The user can delete their history with a technique, but cannot remove it from the database

# Stretch Goals:

* Display user training details in meaningful ways using the Victory chart library
* Increase the number of ways that data is displayed in the stats section
* Add ability to have a ‘stable’ of techniques that have been performed successfully or prioritized in the past
* Allow users to add profile photos 
* Allow users to edit their profile
* Allow users to follow each other
    * Messaging between users
* Allow users to tag each other in training sessions

# User Stories:
* As a grappler, in order to track my training, I’d like to keep a log of my training sessions
    * I would like to be able to specify the type of training in each session, drilling, sparring, or both
    * I would like to note the successful use of any techniques in that session (if any)
    * I would like the ability to keep notes documenting the experience
* As a grappler, in order to focus my training, I’d like to keep a list of techniques that I am currently focusing on
    * I would like to be able to search for techniques in a database
    * I would like techniques to be sorted by type (submission, sweep, escape, takedown, guard, general position, other)
    * I would like the ability to add a technique to the database if it does not already exist
    * I would like the ability to delete my relationship with a technique
* As a grappler, to better understand my game (preferred set of techniques), I’d like to see a visual representation of my training data
     * I would like to see my session data displayed over time, by type, or by quality (techniques executed)
     * I would like to see my technique data displayed over time, successful uses, or by type
     
# Planning Links:
* ERD - https://dbdiagram.io/d/5f188fc41e6ca02dc1a443e5
* Wireframe - https://sketchboard.me/zCfEdge3AODc#/
* Github Repository - https://github.com/johnhester/matStats

# Possible External Tools:
* Victory Chart Library
* Reactstrap
* Cloudinary
* Pixabay
