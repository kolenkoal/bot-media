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

export const amountButtons = {
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