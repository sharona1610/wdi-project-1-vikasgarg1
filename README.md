# **Vikas' Tetris Game**

Tetris was created in 1984 by Alexey Pajitnov, an AI researcher working for the Soviet Academy of Sciences in Moscow. Tasked with testing the capabilities of new hardware, Pajitnov would do so by writing simple games for them.

If you want to read more about Tetris, please refer to:
[Tetris on Wikipedia](https://en.wikipedia.org/wiki/Tetris)

Tetris is one of my favorite games of all-time so I thought of honoring Alexey by recreating it.

## **Design and Functionality**
1. I started by setting up the grid for the game and giving it some style characteristics.
2. Tetris has 7 different pieces and each of those was set up as an array of arrays and assigned a color.
3. Functions for player control of the pieces:
- left
- right
- down
- rotate left
- rotate right
4. Function to identify and control collisions and force pieces to stay within the grid.
5. Function to automatically move pieces down in 1 second increments.
6. Functions for determining when a row is filled, sweeping that row and adding a new row from the top and updating the score or resetting the game when pieces reach the top of the grid.
7. I've designed the game to be fast. For every 100 points, the pieces move 0.1 seconds faster.
7. Addition of CSS styles and transitions to the background for a more enjoyable user experience.

## **Languages**
- HTML
- CSS
- Javascript

## **Gameplay**
1. Pieces drop from the top of the grid and can be controlled using the keyboard arrow keys and the letters "z" or "x".
2. When 1 or more rows are completely filled with pieces they are swept and a score is added. 10, 30, 70, and 150 points are awarded for 1, 2, 3, or 4 rows, respectively.

## Link to My Tetris Game!
[Vikas' Tetris Game](https://wdi-sg.github.io/wdi-project-1-vikasgarg1/)

## **Acknowledgements**
I had no idea how difficult this project would be and needed a lot of help along the way. Thanks to my fellow students and instructors at GA Singapore for their help getting this to look right. And special thanks for the instructional video on YouTube posted by Meth Meth Method from Sweden!

[YouTube video "Writing a Tetris Game in Javascript", by Meth Meth Method](https://www.youtube.com/watch?v=H2aW5V46khA)
