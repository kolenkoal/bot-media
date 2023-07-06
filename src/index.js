import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv';
import Stripe from 'stripe';

import {
    startMessage,
    chooseAmountMessage
} from "./components/messages/messages.js";

import {
    typeOfCardButtons,
    amountButtons
} from "./components/buttons/buttons.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

const stripe = Stripe(process.env.PAYMENT_KEY)

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id
    console.log('Bot was started');
    await bot.sendMessage(chatId, startMessage, typeOfCardButtons)
})

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;

    try {
        switch (query.data) {
            case 'Foreign Card':
                await bot.sendMessage(chatId, chooseAmountMessage, amountButtons)
                break;
        }
    } catch (err) {
        console.error(err);
    }
})



bot.on('polling_error', (err) => {
    console.log(err)
})

