import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv';

import {
    startMessage,
    chooseAmountMessage,
    successfulPaymentMessage
} from "./components/messages/messages.js";

import {
    typeOfCardButtons,
    amountButtons
} from "./components/buttons/buttons.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

// Bot start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id
    console.log('Bot was started');
    await bot.sendMessage(chatId, startMessage, typeOfCardButtons)
})

//User interaction
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    try {
        if (['3', '5', '10', '20'].includes(query.data)) {
            const amount = Number(query.data) * 100,
                title = 'Donation',
                description = `Поддержать «Холод» на ${amount / 100} €`,
                providerToken = process.env.PROVIDER_TOKEN,
                currency = 'EUR',
                prices = [{
                    label: "Donation",
                    amount: amount
                }]

            await bot.sendInvoice(
                chatId,
                title,
                description,
                'СДЕЛАТЬ',
                providerToken,
                currency,
                prices)
        }
        switch (query.data) {
            case 'Foreign Card':
                await bot.sendMessage(chatId, chooseAmountMessage, amountButtons)
                break;
        }

    } catch (err) {
        console.error(err);
    }
})

// Pre-checkout
bot.on('pre_checkout_query', async (query) => {
    await bot.answerPreCheckoutQuery(query.id, true);
})


// Successful payment
bot.on('successful_payment', async (msg) => {
    await bot.sendMessage(msg.chat.id, successfulPaymentMessage);
})

// Error while starting a bot
bot.on('polling_error', (err) => {
    console.log(err)
})




