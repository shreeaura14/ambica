const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc  Get current user's cart
// @route GET /api/cart
// @access Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images isActive");
    if (!cart) {
      return res.json({ success: true, data: { items: [] } });
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error("getCart:", error);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

// @desc  Add item to cart (or increase qty if exists)
// @route POST /api/cart/add
// @access Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: "productId is required" });

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        priceUnit: product.priceUnit,
        purity: product.purity,
        image: product.images?.[0] || "",
        quantity: Number(quantity),
      });
    }

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error("addToCart:", error);
    res.status(500).json({ message: "Server error adding to cart" });
  }
};

// @desc  Update cart item quantity
// @route PUT /api/cart/update
// @access Private
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index < 0) return res.status(404).json({ message: "Item not in cart" });

    cart.items[index].quantity = Number(quantity);
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error("updateCartItem:", error);
    res.status(500).json({ message: "Server error updating cart" });
  }
};

// @desc  Remove a single item from cart
// @route DELETE /api/cart/:productId
// @access Private
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    console.error("removeCartItem:", error);
    res.status(500).json({ message: "Server error removing item" });
  }
};

// @desc  Clear entire cart
// @route DELETE /api/cart/clear
// @access Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("clearCart:", error);
    res.status(500).json({ message: "Server error clearing cart" });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
