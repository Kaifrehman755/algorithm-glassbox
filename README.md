# 🧭 Pathfinding Glass Box: Not Just Another Visualizer

![Project Status](https://img.shields.io/badge/Status-Live_&_Ready-success)
![Vibe](https://img.shields.io/badge/Vibe-Educational_&_Geeky-purple)

##  Why I Built This?
We’ve all been there—staring at a generic BFS or A* algorithm diagram in a textbook, trying to memorize the steps without *actually* understanding how the computer makes decisions.

Most visualizers online show you **"what"** happens (the path animating), but they never tell you **"why"** it happens. They treat the algorithm like a "Black Box."

I wanted to change that. I built the **Pathfinding Glass Box** to break open that box. It doesn't just show colors moving; it explains the logic, the queue states, and the decision-making process in plain English, step-by-step.

It’s built for students, by a student.

---

##  What Makes This Special? (The "Glass Box" Concept)

### 1.  It Speaks Your Language
Instead of just highlighting grid cells, the **Explainer Panel** on the right tells you exactly what's going on:
> *"Exploring node (5,2). Found 3 unvisited neighbors. Adding them to the Queue."*

### 2. Time Travel Debugging
Missed a step? No problem. You don't have to restart the whole simulation.
I implemented a **History Snapshot System** that lets you:
- Pause the algorithm mid-way.
- Step **Backward** to see the previous state.
- Step **Forward** to watch the logic unfold frame-by-frame.

### 3.  BFS vs. A* ( The Showdown)
I added a comparison mode to settle the debate.
- **BFS:** Watch it blindly flood the grid (it works, but it's exhausting!).
- **A* (A-Star):** Watch it use heuristics (math magic) to sprint straight toward the goal.
*The Stats Dashboard proves the efficiency difference instantly.*

---

## 🛠️ Under The Hood (Tech Stack)

I wanted this to be fast, responsive, and accessible anywhere.
- **Frontend:** React.js (Vite) - *Because speed matters.*
- **State Management:** React Hooks - *To handle the time-travel logic.*
- **Styling:** Tailwind CSS - *For that clean, dark-mode "Virtual Lab" aesthetic.*
- **Algorithms:** Custom JavaScript implementations of BFS and A* (No external libraries for logic!).

---

## 📸 See It In Action

| **The Playground** | **The Logic (Glass Box)** |
|:---:|:---:|
| ![Live App Link]-https://algorithm-glassbox.vercel.app/| ![Explainer Demo]- https://drive.google.com/file/d/10GwTWIPu1Vs_5Fosw2JY75WlEIBQ7Bap/view?usp=sharing

---

## 🏃‍♂️ How to Run This on Your Machine

If you want to poke around the code or add a new algorithm (like Dijkstra!), here is how you do it:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/Kaifrehman755/algorithm-glassbox.git](https://github.com/Kaifrehman755/algorithm-glassbox.git)
    ```
2.  **Hop into the folder:**
    ```bash
    cd algorithm-glassbox
    ```
3.  **Install the goods:**
    ```bash
    npm install
    ```
4.  **Ignition:**
    ```bash
    npm run dev
    ```
    *Open `http://localhost:5173` and start creating mazes!*

---

## 🤝 Future Plans
This is just the beginning (MVP). In the future, I plan to add:
- **Maze Generation Algorithms** (Recursive Division).
- **Code Editor:** Where you can write your own BFS code and run it on my grid.
- **Dijkstra's Algorithm:** For weighted graphs (mud, traffic, etc.).

---

**Built with 💻 and ☕ for the DEI X Virtual Labs Hackathon 2026.**
