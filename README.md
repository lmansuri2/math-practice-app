# Timed Mental Math Assessment Application
A cross-platform mobile application in **React Native** that simulates time-pressured assessment environments through 30-second arithmetic challenges and personal best-score tracking.


## Tech Stack
* **Framework:** React Native, Expo
* **Database & Auth:** Supabase
* **State Management:** React Hooks (`useState` and `useEffect` for local state and side effects)
* **Target Platform:** iOS (Cross-Platform Deployment)

## Key Engineering Features
* **Asynchronous Game Loop:** Utilising React state hooks (`useState` and `useEffect`) to manage a non-blocking countdown timer that updates the system state accurately without lagging the user interface thread.
* **Algorithmic Arithmetic Engine:** Dynamic generation of variable-difficulty mathematical calculations (addition, subtraction, multiplication, division).

## How to Run the Code Locally
1. Clone this repository: `git clone https://github.com/lmansuri2/math-practice-app.git`
2. Install the necessary project dependency: `npm install`
3. Launch the application inside your local emulator: `npx expo start`
