Tic Tac Toe with AI 🤖
Welcome to Tic Tac Toe with AI, a modern, browser-based Tic Tac Toe game powered by an intelligent AI opponent using the alpha-beta pruning algorithm. Challenge yourself against three difficulty levels, enjoy a sleek interface, and experience visually distinct "X" and "O" symbols. Perfect for casual fun or testing your strategic skills!
🎮 Features

Smart AI Opponent: Play against an AI using alpha-beta pruning for optimized moves.
Three Difficulty Levels:
Easy: Random moves (70% chance) for a relaxed game.
Medium: Balanced strategy with moderate depth.
Hard: Near-optimal moves for a tough challenge.


Color-Coded Symbols: "X" in bold red and "O" in vibrant blue for clear distinction.
Responsive Design: Clean, modern UI with a dark theme, built with HTML, CSS, and JavaScript.
Reset Functionality: Start a new game anytime with a single click.
Heuristic-Based AI: Evaluates board states for strategic gameplay, adjustable by difficulty.

🚀 Getting Started
Prerequisites

A modern web browser (Chrome, Firefox, Safari, etc.).
No additional dependencies or server setup required!

Installation

Clone the Repository:git clone https://github.com/your-username/tic-tac-toe-ai.git


Navigate to the Project Directory:cd tic-tac-toe-ai


Open the Game:
Double-click index.html to open it in your browser, or
Serve the files using a local server (e.g., npx http-server).



Project Structure
tic-tac-toe-ai/
├── index.html       # Main HTML file
├── script.js        # Game logic and AI implementation
├── style.css        # Styling for the game UI
├── package.json     # Project metadata
└── README.md        # This file

🎲 How to Play

Select Difficulty: Choose from Easy, Medium, or Hard using the dropdown menu.
Make Your Move: Click an empty square to place your "X" (red).
AI Responds: The AI places an "O" (blue) after a short delay.
Check for Win/Draw:
Win by aligning three "X"s or "O"s in a row, column, or diagonal.
A draw occurs when the board is full without a winner.


Reset Game: Click the "Reset" button to start a new game.

🖼️ Screenshots
Game Interface with Color-Coded Symbols
Note: Replace screenshots/gameplay.png with an actual screenshot for best effect.
🛠️ Technical Details

AI Algorithm: Uses minimax with alpha-beta pruning for efficient move selection.
Difficulty Tuning:
Easy: 70% random moves, depth 1.
Medium: Depth 3, balanced heuristic.
Hard: Depth 5, aggressive heuristic.


Heuristic Function: Scores board states based on potential wins and blocks, scaled by difficulty.
UI Framework: Pure HTML/CSS/JavaScript, no external libraries.
Styling: Dark-themed UI with responsive grid layout and hover effects.

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Please ensure your code follows the existing style and includes tests if applicable.
📜 License
This project is licensed under the ISC License.
🙌 Credits

Author: Shubham
Built with: HTML, CSS, JavaScript
Inspired by: Classic Tic Tac Toe with a modern AI twist


⭐ Enjoy the game? Give it a star on GitHub! ⭐
For questions or suggestions, open an issue or contact the author.
