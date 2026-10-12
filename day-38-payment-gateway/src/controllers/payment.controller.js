const razorpay = require("../config/rzp.config");
const { RZP_KEY_ID, RZP_KEY_SECRET } = require("../config/env.config");
const productModel = require("../models/product.model");
const paymentModel = require("../models/payment.model");
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");

const checkout = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const order = await razorpay.orders.create({
      amount: product.price.amount * 100,
      currency: product.price.currency,
      receipt: `ord_rcpt_${product._id}`,
      notes: {
        productId: product._id,
        title: product.title,
      },
    });

    const payment = await paymentModel.create({
      orderId: order.id,
      paymentId: order.id,
      amount: product.price.amount * 100,
      currency: product.price.currency,
      product: product._id,
      signature: "",
      status: "pending",
    });

    res.json({
      message: "Order created successfully",
      keyId: RZP_KEY_ID,
      orderId: order.id,
      amount: product.price.amount * 100,
      currency: product.price.currency,
      productId: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  } catch (error) {
    console.error("Checkout error:", error.error || error.message || error);
    res.status(error.statusCode || 500).json({
      message: error.error?.description || error.message || "Failed to create order",
      error: error.error || error,
    });
  }
};

const verify = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const payment = await paymentModel.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    const isAuthentic = validatePaymentVerification(
      { order_id: orderId, payment_id: paymentId },
      signature,
      RZP_KEY_SECRET
    );

    if (!isAuthentic) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({
        status: "failed",
        message: "Payment verification failed",
      });
    }

    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.status = "completed";
    await payment.save();

    res.json({
      status: "success",
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Verify error:", error.error || error.message || error);
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.error?.description || error.message || "Failed to verify payment",
      error: error.error || error,
    });
  }
};

module.exports = { checkout, verify };