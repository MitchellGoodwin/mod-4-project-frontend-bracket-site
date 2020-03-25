# Mod 4 Project

heroku link: https://tourney-finder.herokuapp.com/

## Project Idea

My Idea is to make a site for making, and entering tournament brackets for competitions. I've used these for different competitions (mainly video game related), and I think it would be fun to be able to take a crack at creating my own.

Examples of similar sites: https://challonge.com/, https://smash.gg/

## General User Flow

The site has a navbar at the top of every page, with a site title and login/out/signup buttons. It also has a create bracket button if the user is logged in to take them to a form to create their bracket. As well as a button to go back to the home page/bracket index.

The homepage has a list of different tournaments that they can click on to go to that tournament's bracket page. 

That bracket page has the bracket up top with all the matches, showing the winners of each moving on to the next round until someone wins. At the bottom portion of the page there will be a standings table of the competitors.

If the user is logged in they can enter a tournament that they don't own, and hasnt started yet. They can edit their entry somewhat, mainly dropping out.

A user can also create their own tournament, filling out a form to define properties of the tournament. To start it will be a name, and description, but I'd like to add more later as a part of stretch goals, like setting an entry fee.

Once created other users can sign up for their tournament and the admin can change their seed value to change where people are in the bracket. The site is responsive and creates empty matches for the tournament according to number of entreants. The admin can mark the tournament as started, at which point no new users can join. Once started the admin can mark winners of each match and the site will update to move the right entrant forward. For the purpose of the mvp I will assume each tournament is being run in person by the admin.

Once complete the bracket cannot be edited anymore, but still viewed.

## Schema

As of now my models are:

* Users
* Brackets
* Matches
* Entries

The relationships get a little wonky:

* Each bracket belongs to one user as an admin
* Users also have many brackets through entries and vice versa
* A bracket has many matches, which belong to two users
* Each match belongs to a bracket, as well as two users who are the opponents, and a winner. Each of the user associations is optional as winners arent decided right away, and matches can have empty slots.

## Challenges

I had a lot of challenges with this project, both expected and unexpected. The backend logic ended taking a lot of whiteboarding and figuring out. I wanted the bracket model to be smart about reorganizing it's match models when there was a change to any of it's associated models, as well as being able to seed it's entrants into the proper matches, and that took a lot of time. I'm both proud of what I figured out, and wanting to improve it. For the sake of time I made a working set of methods to do all of that correctly, but I'm going to come back and fix it up later.

Showing the bracket how I wanted to ended up being a huge problem. I have it sort of working through Semantic Grid, but it's got some issues. I think I need to start over with another resource or figure it out from scratch. As this is a CSS issue, it wasnt a focus of this project, but I'd really like to get it to work how I picture it.

I didn't reach any of my original stretch goals, as I lost a lot more time to the backend side than I expected. Overall I'm happy with this project though. I'm proud of what I have figured out so far on both sides of the app, and my long list of stretch goals left means that this will be a valuable porject to work on in the long run, which I'm happy to have.

## Stretch Goals

* Mainly make the bracket display in a classic bracket style, with lines forming a sideways pyramid shape. This is has already been a challenge, and I think I need to redo my styling from scratch for this component. Maybe look into D3.

* Toggle showing predicted winners on the bracket view for each uncompleted match.

* Add an ability to take real payment for entry fees.

* Add websockets for:
    * Notifications
    * Chat with the tournament admin
    * Chat with your match opponent

* Add an MMR score tracker for users according to match history, and use it to auto generate recommended seeding.

* Drag and Drop entrants on the bracket to change seeding

* Email notifications

* Add support for not just single elimination tournaments

## TODO:


* If you are going to deploy, make CORS match