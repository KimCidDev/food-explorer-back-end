const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');

class PaymentController {
  async createCheckoutSession(request, response) {
    const { items } = request.body;

    try {
      // Map items to Stripe line items format
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name
          },
          unit_amount: item.price // Ensure price is in cents
        },
        quantity: item.quantity
      }));

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancelPay`
      });

      return response.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new AppError('Error creating checkout session', 500);
    }
  }
}

module.exports = PaymentController;
