# Knight's Moves Calculator
## Overview
This project implements a chess knight movement path finder, calculating the minimum number of moves required for a knight to move from one position to another on a standard 8x8 chessboard. The implementation uses TypeScript and Deno, focusing on low-level data structures and algorithms rather than using built-in high-level implementations.

## Technical Details
### Algorithm

Uses Breadth-First Search (BFS) to find the shortest path
Implements a custom queue for BFS traversal
Uses a simple position tracking system with concatenated coordinates
Validates moves within the 8x8 board constraints

### Key Features

- Finds the minimum number of moves required
- Validates board boundaries (0-7 for both x and y coordinates)
- Handles all possible knight moves (8 different positions)
- Efficient position tracking to avoid revisiting squares

### Implementation Notes

- Written in TypeScript
- Runs on Deno runtime
- Minimalistic approach avoiding high-level data structures
- Custom position tracking using concatenated coordinate strings

## Requirements

Deno 1.x or higher

## Installation

Make sure you have Deno installed on your system
Clone this repository