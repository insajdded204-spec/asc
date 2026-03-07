const STORAGE_KEY = 'asc_store_cart_v1';

function readCart() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function writeCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

export function getCart() {
    return readCart();
}

export function getCartCount() {
    return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(productId, size = null) {
    const cart = readCart();
    const existing = cart.find((item) => item.productId === productId && item.size === size);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ productId, size, quantity: 1 });
    }
    writeCart(cart);
}

export function updateQuantity(productId, size, quantity) {
    const cart = readCart().map((item) => {
        if (item.productId === productId && item.size === size) {
            return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
    });
    writeCart(cart);
}

export function removeFromCart(productId, size) {
    writeCart(readCart().filter((item) => !(item.productId === productId && item.size === size)));
}

export function clearCart() {
    writeCart([]);
}