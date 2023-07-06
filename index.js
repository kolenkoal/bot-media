// const TelegramBot = require('node-telegram-bot-api');
//const Stripe = require('stripe');

import {Telegraf} from "telegraf";
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stripe = Stripe(process.env.PAYMENT_KEY)

// Handle incoming messages
