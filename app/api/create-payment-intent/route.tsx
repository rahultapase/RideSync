import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe key not configured" },
      { status: 500 }
    );
  }

  try {
    const { amount } = await request.json();
    console.log("Received amount:", amount); // Debug log

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      console.log("Invalid amount:", amount); // Debug log
      return NextResponse.json(
        { error: "Invalid amount provided." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe API Error:", error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: "Payment service unavailable" },
      { status: 500 }
    );
  }
}
