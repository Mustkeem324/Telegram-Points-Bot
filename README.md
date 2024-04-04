# Telegram Points Bot

This Telegram bot allows administrators to manage points for users within a Telegram group. It's built using Node.js, MongoDB for data storage, and the `node-telegram-bot-api` library for interacting with the Telegram Bot API.

## Features

- **Add Points**: Administrators can add points to a user's account along with an expiry date.
- **Delete Points**: Administrators can delete points for a specific user.
- **Check Points**: Users can check their current points and their expiry dates.
- **Fetch User ID**: Users can retrieve their Telegram chat ID and user ID.

## Setup

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a MongoDB Atlas database and obtain the connection string.
4. Create a `.env` file in the project root and add the following variables:

    ```
    MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
    TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    ADMIN_ID=YOUR_ADMIN_TELEGRAM_USER_ID
    ```

5. Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string, `YOUR_TELEGRAM_BOT_TOKEN` with your Telegram bot token, and `YOUR_ADMIN_TELEGRAM_USER_ID` with the Telegram user ID of the bot administrator.
6. Run the bot using `npm start`.

## Usage

- **Adding Points**: Administrators can use the `/add` command followed by the user ID, points to add, and the number of days until the points expire. For example: `/add 12345 50 30`.
- **Deleting Points**: Administrators can use the `/del` command followed by the user ID to delete all points for that user. For example: `/del 12345`.
- **Checking Points**: Users can use the `/get` command to check their current points and expiry dates.
- **Fetching User ID**: Users can use the `/id` command to retrieve their Telegram chat ID and user ID.

## Contributions

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
