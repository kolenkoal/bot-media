import TelegramBot from 'node-telegram-bot-api'
import {Stripe} from "stripe";
import dotenv from 'dotenv';

import {
    startMessage,
    typeOfPaymentMessage,
    chooseAmountMessage,
    successfulPaymentMessage
} from "./components/messages/messages.js";

import {
    typeOfCardButtons,
    typeOfPaymentButtons,
    amountButtonsOneTime, amountButtonsRegular
} from "./components/buttons/buttons.js";

import {
    getPaymentInfo
} from "./components/functions/getPaymentInfo.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

// Bot start
bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id

        await bot.sendMessage(chatId, startMessage, typeOfCardButtons)
        console.log(`The bot was started in ${chatId} chat`);

    } catch (err) {
        console.error(err);
    }
})

bot.onText(/\/donation/, async (msg) => {
    try {
        const chatId = msg.chat.id

        await bot.sendMessage(chatId, startMessage, typeOfCardButtons)
        console.log(`The bot was started in ${chatId} chat`);

    } catch (err) {
        console.error(err);
    }
})

//User interaction
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id,
        date = new Date();

    try {
        // If User chose the amount to pay in One-time Payment
        if (['1', '3', '5', '10', '20'].includes(query.data)) {
            const paymentInfo = await getPaymentInfo(query, date, chatId);

            await bot.sendInvoice(
                chatId,
                paymentInfo.title,
                paymentInfo.description,
                paymentInfo.payload,
                paymentInfo.providerToken,
                paymentInfo.currency,
                paymentInfo.prices,
                paymentInfo.form,
            )

            // If User chose the amount to pay in Regular Payment
        } else if (['3 €', '5 €', '10 €', '20 €'].includes(query.data)) {

        }

        // If user chose to pay with a foreign card
        switch (query.data) {
            case 'Foreign Card':
                await bot.sendMessage(chatId, typeOfPaymentMessage, typeOfPaymentButtons)
                console.log(`A Foreign Card was chosen in ${chatId} chat`)

                break;

            case 'One Time Donation':
                await bot.sendMessage(chatId, chooseAmountMessage, amountButtonsOneTime)
                console.log(`A One-Time Donation was chosen in ${chatId} chat`)

                break;
            case 'Regular Donation':
                await bot.sendMessage(chatId, chooseAmountMessage, amountButtonsRegular)
                console.log(`A Regular Donation was chosen in ${chatId} chat`)


        }

    } catch (err) {
        console.error(err);
    }
})

// Pre-checkout
bot.on('pre_checkout_query', async (query) => {
    const chatId = query.from.id;

    try {
        await bot.answerPreCheckoutQuery(query.id, true);
        console.log(`Pre-Checkout Query in ${chatId} chat`)

    } catch (err) {
        console.error(err)
    }
})

// Successful payment
bot.on('successful_payment', async (msg) => {
    const chatId = msg.from.id;

    try {
        await bot.sendMessage(msg.chat.id, successfulPaymentMessage);
        console.log(`Successful payment in ${chatId} chat`)
        console.log(msg.successful_payment.invoice_payload)

    } catch (err) {
        console.error(err)
    }
})

// Handling errors
bot.on('error', msg => console.error(msg))

// WebHook errors
bot.on('webhook_error', (error) => {
    console.log(error.code);
});

// Error while starting a bot
bot.on('polling_error', (err) => {
    console.log(err)
})




