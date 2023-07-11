export const getPaymentInfo = async (query, date, chatId) => {
    try {
        const amount = Number(query.data) * 100;

        return ({
            title: 'Donation',
            description: `Поддержать «Холод» на ${amount / 100} €`,
            payload: `ChatID: ${chatId}. Date: ${date}. Amount: ${amount / 100} €`,
            providerToken: process.env.PROVIDER_TOKEN,
            currency: 'EUR',
            prices: [{
                label: "Donation",
                amount: amount
            }]
        })
    } catch (err) {
        console.error(err)
    }


}
