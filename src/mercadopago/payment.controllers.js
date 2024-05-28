import { MercadoPagoConfig, Preference } from 'mercadopago'
import { envs } from '../config/enviroments/enviroments.js'


const client = new MercadoPagoConfig({
    accessToken: envs.MERCADOPAGO_TOKEN,
    options: { timeout: 5000, idempotencyKey: 'abc' }
});

export const createDonation = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'ARS'
                }
            ],
            back_urls: {
                success: `${envs.DB_URI}/success`,
                failure: `${envs.DB_URI}/failure`,
                pending: `${envs.DB_URI}pending`
            },
            auto_return: 'approved' 
        };

        const preference = new Preference(client);

        const response = await preference.create({ body });

        res.json({
            id: response.body.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
};