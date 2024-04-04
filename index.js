const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const mongodb = "";  //add your mongodb go to https://www.mongodb.com/

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const pointSchema = new mongoose.Schema({
    userId: Number,
    points: Number,
    expiryDate: Date
});

const Point = mongoose.model('Point', pointSchema);
const token = ''; //add telegram token

const bot = new TelegramBot(token, { polling: true });
const adminId = 2110818173; // add admin ID

// Function to add or update points for a user
async function addOrUpdatePoints(userId, points, days, chatId) {
    try {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        
        let existingPoints = await Point.findOne({ userId });
        if (existingPoints) {
            existingPoints.points += points;
            existingPoints.expiryDate = expiryDate;
            await existingPoints.save();
            bot.sendMessage(chatId, `Updated points for user ID ${userId}. They now have ${existingPoints.points} points, which expire on ${expiryDate}.`);
        } else {
            await Point.create({ userId, points, expiryDate });
            bot.sendMessage(chatId, `Added ${points} points for user ID ${userId}. They will expire on ${expiryDate}.`);
        }
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'Failed to add/update points. Please try again.');
    }
}

// /addpoint command
bot.onText(/\/add (\d+) (\d+) (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = parseInt(match[1]);
    const points = parseInt(match[2]);
    const days = parseInt(match[3]);

    if (msg.from.id !== adminId) {
        bot.sendMessage(chatId, 'You are not authorized to perform this action.');
        return;
    }

    addOrUpdatePoints(userId, points, days, chatId);
});

// /del command
bot.onText(/\/del (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = parseInt(match[1]);

    if (msg.from.id !== adminId) {
        bot.sendMessage(chatId, 'You are not authorized to perform this action.');
        return;
    }

    try {
        const result = await Point.deleteMany({ userId });
        bot.sendMessage(chatId, `Deleted ${result.deletedCount} points for user ID ${userId}.`);
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'Failed to delete points. Please try again.');
    }
});

// /get command
bot.onText(/\/get/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        const currentDate = new Date();
        const points = await Point.find({ userId, expiryDate: { $gte: currentDate } });
        if (points.length === 0) {
            bot.sendMessage(chatId, 'No points found for you.');
        } else {
            let message = 'Your points:\n';
            points.forEach(point => {
                message += `${point.points} points - Expires on ${point.expiryDate}\n`;
            });
            bot.sendMessage(chatId, message);
        }
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'Failed to fetch your points. Please try again.');
    }
});

// /id command
bot.onText(/\/id/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    try{
        bot.sendMessage(chatId, `The chatId is: <code>${chatId}</code> and userId is: <code>${userId}</code>`, { parse_mode: 'HTML' });
    }catch(err){
        console.error(err);
        bot.sendMessage(chatId, 'Failed to fetch your ID. Please try again.');
    }
});
