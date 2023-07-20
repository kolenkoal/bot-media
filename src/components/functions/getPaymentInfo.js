export const getPaymentInfo = async (query, date, chatId) => {
    try {
        const amount = Number(query) * 100;

        return ({
            title: 'Donation',
            description: `Поддержать «Холод» на ${amount / 100} €`,
            payload: `ChatID: ${chatId}. Date: ${date}. Amount: ${amount / 100} €`,
            providerToken: process.env.PROVIDER_TOKEN_LIVE,
            currency: 'EUR',
            prices: [{
                label: "Donation",
                amount: amount
            }],
            form: {
                start_parameter: 'get_access',
                need_email: true,
                send_email_to_provider: true,
                provider_data: {
                    receipt: {
                        items: [
                            {
                                description: `Поддержать «Холод» на ${amount / 100} €`,
                                quantity: '1.00',
                                amount: {
                                    value: amount,
                                    currency: 'EUR'
                                },
                                vat_code: 1
                            }
                        ]
                    }
                }
            },
        })
    } catch (err) {
        console.error(err)
    }
}
