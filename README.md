# FlashFeed | Get your daily dose of news for free!
!!!warning this api only shows news related to united states api docs shows that it shows for every country but not showing!!!
FlashFeed is a simple, easy-to-use news application built with a client-server architecture. It fetches real-time news from the [NewsAPI](https://newsapi.org/), allowing users to explore news from various categories such as Business, Entertainment, Health, Science, Sports, and Technology.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

To get started, clone this repository and install the dependencies for both the **client** and **server**.

### Steps to set up the client:

1. Open a terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Create a `.env` file in the `client` directory and add the following line:
    ```bash
    REACT_APP_IP=localhost:5000
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Run the client application:
    ```bash
    npm start
    ```
   This will start the client application in development mode.

### Steps to set up the server:

1. Open a new terminal window and navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Create a `.env` file in the `server` directory and add the following line:
    ```bash
    NEWS_API_KEY=<Your own newsapi key>
    PORT=<Port of your choice>
    ```

3. Install the server dependencies:
    ```bash
    npm install
    ```

4. Run the server application:
    ```bash
    npm run dev
    ```
   This will start the server application in development mode.

## Accessing the App

Once both the client and server are running, you can access the app by opening the following URL in your browser:

[http://localhost:3000](http://localhost:3000)

## Additional Information

- The client and server are separate applications. Make sure to run both to use the app.
- The client app runs on `http://localhost:3000` and communicates with the server, which runs on `http://localhost:5000` (or the IP/port you specify in the `.env` file).
- The server can be accessed through the relevant API endpoints (depending on your setup).

### Notes:

- Make sure to replace `<Your own newsapi key>` with your actual NewsAPI key in the server's `.env` file.
- You can sign up for a free API key on [NewsAPI](https://newsapi.org/).
"""
