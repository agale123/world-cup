# 2019 Women's World Cup App

The app will have sections to explore game locations, browse the schedule, and
plan an itinerary for the tournament. When developing, the app contains the schedule from the 2019 Women's World Cup, but the teams from the 2015 Women's World Cup. When the draw is announced in December, the teams will be updated.

The app is hosted at: https://worldcup.alisongale.com

## Map

This section displays a map with all countries that are in the World Cup. Countries are color coded based on the number of appearances in the World Cup, and tooltips display both appearances and wins.

<img src="https://raw.githubusercontent.com/agale123/world-cup/master/map.jpg" width="500px">

## Schedule

This section allows you to interactively explore the schedule. The first set of controls filters games by team and/or city. The second control allows you to see which elimination games a team will play in if they finish first or second in their group. So you could see where the US would play if they finish first in their group.

<img src="https://raw.githubusercontent.com/agale123/world-cup/master/schedule.jpg" width="500px">

## Itinerary

This section uses an optimiztion algorithm to find the optimal path through the cities based on a set of constraints. List the teams you want to see and their relative weight to get a recommended schedule. A summary card displays details about the trip.

<img src="https://raw.githubusercontent.com/agale123/world-cup/master/itinerary.jpg" width="500px">
