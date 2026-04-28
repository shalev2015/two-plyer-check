 


> Open this page at [https://shalev2015.github.io/multiplayer-check/](https://shalev2015.github.io/multiplayer-check/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/shalev2015/multiplayer-check** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/shalev2015/multiplayer-check** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

#### How to Use Blocks

run code on (1) here check every (2). In the (1), write the number of players you are checking for (2-infinity). In the (2), write the number of ms of intervals to check. set max number of players (1). In the (1), write the number of max players posible. reset connection. Resets the array of players. everyone here. Returns true or false, depending on if the number of players joined is equal to the max number of players. current player count. returns the number of current players. max number of players. Returns the max number of players. on player disconnects. Run code on player disconnect. my player number. Translates your ID to multiplayer extension compactible player numbers. player number for ID (1). Write a 6 digit ID in (1), this block will translate it to multiplayer extension compactible player numbers. my ID. Returns your ID. array of all devices. Returns an array of all player IDs, including you.
 
#### What it Does

This extension provides extra blocks to know when a person enters the game, leaves it, and how many players are currently playing. It can also translate the device IDs (generated randomly by the extension) into player numbers (p1-4).

#### Please Note

This extesion only works with radio. The radio group will automaticaly be set to 1. Compactibillity with multiplayer extension only works with 2-4 players.
