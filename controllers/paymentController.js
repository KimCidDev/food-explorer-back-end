const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');

class PaymentController {
  async createCheckoutSession(request, response) {
    const { items } = request.body;

    const concatenateURL = (baseURL, path) => {
      if (!baseURL.endsWith('/')) baseURL += '/';
      if (path.startsWith('/')) path = path.substring(1);
      return baseURL + path;
    };

    try {
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name
          },
          unit_amount: item.price
        },
        quantity: item.quantity
      }));

      const successURL = concatenateURL(process.env.CLIENT_URL, 'success');
      const cancelURL = concatenateURL(process.env.CLIENT_URL, 'cancelPay');

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL
      });

      return response.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new AppError('Error creating checkout session', 500);
    }
  }
}

module.exports = PaymentController;
