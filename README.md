## PixelMon Learning Phase Dev Assignment 1

You’ll be creating a game using PhaserJS & Typescript. You can find the tasks that have to implemented below.

**NOTE**

For the assets of the game (images, sprites etc.) you are free to use whatever you like and find on the internet.

**Main Tasks**

- [ ]  Add a character that can be moved around using arrow keys. Use sprite animations for movement. <br>
Resource: https://www.youtube.com/watch?v=ElAmJj8Tfo8 
- [ ]  Add a tilemap for the character to move around in. Add borders/boundaries to make sure the character does not cross the map. <br>
Use a level editor like [Tiled](https://www.mapeditor.org/) for this.

**Bonus Tasks**

- [ ]  Add coins throughout the map for the character to collect. <br>
The location of the coins can be random or predetermined. The coins can be static or animated. <br>
Once the character reaches a particular coin, the coin is considered to be “collected” and should disappear from the screen.
- [ ]  Implement a score system based on the collection of coins. <br>
Each coin collected should increment the current score of the character. You are free to increment the score however you like. 
The current score should be displayed on the screen. 
- [ ]  Keep track of the highest score. <br>
The score resets each session i.e, each time the app is restarted. As the current score changes, keep track of the highest score so far. <br>
Use localStorage to persist the highest score between sessions. <br>
Along with the current score, the highest score should also be displayed on the screen. <br>
Resource: [https://davitdvalashvili1996.medium.com/local-storage-in-javascript-f7aad374980e#:~:text=Local storage is a type,them into strings using JSON](https://davitdvalashvili1996.medium.com/local-storage-in-javascript-f7aad374980e#:~:text=Local%20storage%20is%20a%20type,them%20into%20strings%20using%20JSON).
