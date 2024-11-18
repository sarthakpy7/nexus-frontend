import Stripe from "stripe";
import axios from "axios";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
};

export const testStripeConnection = async (req, res) => {
  try {
    const response = await axios.get("https://api.stripe.com/v1/charges", {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Stripe connection test failed:", error);
    res.status(500).send({ error: "Stripe connection test failed" });
  }
};
