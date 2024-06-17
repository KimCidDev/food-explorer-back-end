const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');

class PaymentController {
  async createCheckoutSession(request, response) {
    const { items } = request.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'cad',
            product_data: {
              name: item.name,
              id: item.id
            },
            unit_amount: item.price * 100
          },
          quantity: item.quantity
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`
      });

      return response.json({ id: session.id });
    } catch (error) {
      console.error(error);
      throw new AppError('Error creating checkout session', 500);
    }
  }
}

module.exports = PaymentController;
