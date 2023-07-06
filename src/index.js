// const TelegramBot = require('node-telegram-bot-api');
//const Stripe = require('stripe');

import {Telegraf} from "telegraf";
import dotenv from 'dotenv';
import Stripe from 'stripe';

import {
    startMessage
} from "./components/messages/messages.js";

import {
    typeOfCardButtons
} from "./components/buttons/buttons.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log(bot)

//const stripe = Stripe(process.env.PAYMENT_KEY)


bot.start( (ctx) => {
    console.log('Bot was started');
    ctx.reply(startMessage, typeOfCardButtons)
})

bot.launch()
