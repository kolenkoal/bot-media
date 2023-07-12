export const typeOfCardButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Российской', callback_data: 'Russian Card', url: "https://boosty.to/holod.media"},
                {text: 'Зарубежной', callback_data: 'Foreign Card'}
            ]
        ]
    })
}

export const typeOfPaymentButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Разовое', callback_data: 'One Time Donation'},
                {text: 'Регулярное', callback_data: 'Regular Donation'}
            ]
        ]
    })
}

export const amountButtonsOneTime = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: '3 €', callback_data: '3'},
                {text: '5 €', callback_data: '5'}
            ],
            [
                {text: '10 €', callback_data: '10'},
                {text: '20 €', callback_data: '20'}
            ],
        ]
    }
}

export const amountButtonsRegular = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: '3 €', callback_data: '3 €', url: "https://buy.stripe.com/cN29DAa6P33zgUg4gj"},
                {text: '5 €', callback_data: '5 €', url: "https://buy.stripe.com/4gw4jg92L0Vr33q6os"}
            ],
            [
                {text: '10 €', callback_data: '10 €', url: "https://buy.stripe.com/6oEbLI5QzcE933qeUZ"},
                {text: '20 €', callback_data: '20 €', url: "https://buy.stripe.com/9AQ2b8a6PgUpeM85kq"}
            ],
        ]
    }
}