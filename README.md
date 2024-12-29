# Knight Move Wizard 🐎✨
A TypeScript implementation of a pathfinding algorithm that calculates the shortest path a knight can take between two points on a chess board.

## Description
This project implements a BFS search algorithm to find the minimum number of moves a knight needs to reach a target square on a standard 8x8 chess board.  
The implementation follows functional programming principles and is built with TypeScript for type safety.  

## Features
- Calculate shortest path between any two valid squares
- Validate board boundaries
- Return detailed path information including number of moves
- Modular architecture with separate concerns
- Pure functional approach (where performance allows)
- Full TypeScript support

## Play with it:
- In main.ts, call the knightMoveWizard(start, end) where start and end = [x,y] (an array of integer).
- Open the console to get the result.