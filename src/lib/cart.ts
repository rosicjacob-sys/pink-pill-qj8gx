export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
}

const CART_KEY = 'pink-pill-cart';

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id && i.variant === item.variant);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({ ...item });
  }
  saveCart(cart);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function removeFromCart(id: string, variant: string) {
  const cart = getCart().filter((i) => !(i.id === id && i.variant === variant));
  saveCart(cart);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function updateQuantity(id: string, variant: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.variant === variant);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  }
}

export function getCartCount(): number {
  return getCart().reduce((acc, i) => acc + i.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((acc, i) => acc + i.price * i.quantity, 0);
}
