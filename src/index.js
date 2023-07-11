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
    try {
        const chatId = msg.chat.id
        console.log(`The bot was started in ${chatId} chat`);
        await bot.sendMessage(chatId, startMessage, typeOfCardButtons)

    } catch (err) {
        console.error(err);
    }

})

//User interaction
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id,
        date = new Date();

    try {
        if (['3', '5', '10', '20'].includes(query.data)) {
            const amount = Number(query.data) * 100,
                title = 'Donation',
                description = `Поддержать «Холод» на ${amount / 100} €`,
                payload = `ChatID: ${chatId}. Date: ${date}. Amount: ${amount / 100} €`,
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
                payload,
                providerToken,
                currency,
                prices)

            console.log(payload)
        }

        switch (query.data) {
            case 'Foreign Card':
                console.log(`A foreign Card was chosen in ${chatId} chat`)
                await bot.sendMessage(chatId, chooseAmountMessage, amountButtons)
                break;
        }

    } catch (err) {
        console.error(err);
    }
})

// Pre-checkout
bot.on('pre_checkout_query', async (query) => {
    const chatId = query.from.id;

    try {
        console.log(`Pre-Checkout Query in ${chatId} chat`)
        await bot.answerPreCheckoutQuery(query.id, true);

    } catch (err) {
        console.error(err)
    }
})

// Successful payment
bot.on('successful_payment', async (msg) => {
    const chatId = msg.from.id;

    try {
        console.log(`Successful payment in ${chatId} chat`)
        await bot.sendMessage(msg.chat.id, successfulPaymentMessage);

    } catch (err) {
        console.error(err)
    }
})

// Handling errors
bot.on('error', msg => console.error(msg))

// Error while starting a bot
bot.on('polling_error', (err) => {
    console.log(err)
})




