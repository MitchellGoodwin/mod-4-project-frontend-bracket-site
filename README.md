# Mod 4 Project

## Project Idea

My Idea is to make a site for making, and entering tournament brackets for competitions. I've used these for different competitions (mainly video game related), and I think it would be fun to be able to take a crack at creating my own.

Examples of similar sites: https://challonge.com/, https://smash.gg/

## General User Flow

The site will have a navbar at the top of every page, with a site title and login/out, signup buttons.

The page will have a list of different tournaments that they can click on to go to that tournament's bracket page. 

That page will have the bracket up top with all the matches, showing the winners of each moving on to the next round until someone wins. At the bottom portion of the page there will be a standings table of the competitors.

If the user is logged in they can enter a tournament that they don't own, and hasnt started yet. They can edit their entry somewhat, including dropping out of the competition.

A user can also create their own tournament, filling out a form to define properties of the tournament. To start it will be a name, picture, and description, but I'd like to add more later as a part of stretch goals, like setting an entry fee.

Once created other users can sign up for their tournament and the admin can change their seed value to change where people are in the bracket. I want the site to be responsive and create empty matches for the tournament according to number of entreants. The admin can mark the tournament as started, at which point no new users can join. Once started the admin can mark scores and winners of each match and the site will update to move the right entrant forward. For the purpose of the mvp I will assume each tournament is being run in person by the admin.

Once complete the bracket cannot be edited anymore, but still viewed.

## Schema

As of now I see my models as being:

* Users
* Brackets
* Matches
* Entries

The relationships get a little wonky:

* Each bracket belongs to one user as an admin
* Users also have many brackets through entries and vice versa
* A bracket has many matches, which belong to two users

The above schema is kinda likly to change, as everything is pretty intermingeled. But for now, this is how I visualize it.

## MVP

I'm hoping to reach my mvp by the weekend. I'd like most of the base functionality listed above. For the brackets themselves, for this weekend if I can get all of the matches listed on the page, but not connected in a bracket style, with an ability to select a winner I'll be happy.

I'm going to start on my user model with authorization first, as I think my site will rely on that to make sense a good amount. From there, figure out the logic for generating matches correctly from varying amounts of entrants.

## Stretch Goals

* Mainly make the bracket display in a classic bracket style, with lines forming a sideways pyramid shape. This is my main stretch goal

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