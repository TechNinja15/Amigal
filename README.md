AmiGal - Friend Chat
AmiGal is a real-time WebRTC-based communication platform designed for Amity students. It allows two users to connect via a private room code to engage in high-quality video calls, text chat, and synchronized live video sharing.

🚀 Features
Private Room System: Users can create or join rooms using a unique 6-digit code.

One-on-One Interaction: The platform is optimized for a maximum of 2 people per room.

Video & Audio Calling: Real-time communication powered by WebRTC and Socket.io.

Text Chat: Integrated messaging system to chat alongside the video call.

Movie Mode (Activity Sharing): Play local video files live and synchronized with your partner. Features include:

Synchronized playback (Play/Pause/Skip).

Cinematic fullscreen mode.

Interactive, draggable, and resizable video bubbles for camera feeds.

Media Controls: Easily toggle your microphone and camera during the call.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Modern UI with a cyberpunk aesthetic), and Vanilla JavaScript.

Backend: Node.js with Express.

Real-time Communication: Socket.io for signaling and messaging.

Peer-to-Peer: WebRTC for direct video and audio streaming.

📦 Installation
Clone the repository:

Bash
git clone <repository-url>
cd AmiGal
Install dependencies:

Bash
npm install
Start the server:

Bash
npm start
Access the application: Open your browser and navigate to http://localhost:3000.

📖 How to Use
Enter Room Code: Enter a 6-digit code and click "Next".

Identity: Enter your name to identify yourself to your partner.

Chat & Call: Once a second person joins the same room code, the video call will initiate automatically.

Start a Movie: Click the 🎬 icon to select a video file from your device and watch it together in synchronized "Movie Mode".

Note: This project is specifically tailored for Amity students to connect and collaborate.