import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import Stripe from "stripe";

setGlobalOptions({maxInstances: 10});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// eslint-disable-next-line max-len
export const createPayNowPaymentIntent = onRequest({cors: true}, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {amount} = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    res.status(400).json({error: "Invalid amount"});
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "sgd",
      payment_method_types: ["paynow"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({error: error.message});
  }
});

// eslint-disable-next-line max-len
export const checkPaymentStatus = onRequest({cors: true}, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {paymentIntentId} = req.body;

  if (!paymentIntentId) {
    res.status(400).json({error: "Missing paymentIntentId"});
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.status(200).json({status: paymentIntent.status});
  } catch (err) {
    const error = err as Error;
    res.status(500).json({error: error.message});
  }
});
