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