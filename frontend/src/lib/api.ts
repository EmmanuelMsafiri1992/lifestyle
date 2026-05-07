import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export type Store = {
  id: number;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  type: 'cannabis_cabinet' | 'adults_only';
  requires_age_gate: boolean;
  min_age: number;
  accepts_orders: boolean;
  primary_color: string;
  logo_url: string | null;
  banner_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  whatsapp: string | null;
  social_links: Record<string, string> | null;
  categories?: Category[];
  featured_products?: Product[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  products: Product[];
};

export type Product = {
  id: number;
  store_id: number;
  category_id: number | null;
  category: { id: number; name: string; slug: string } | null;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  current_price: number;
  image_url: string | null;
  gallery: string[] | null;
  stock: number;
  in_stock: boolean;
  is_featured: boolean;
  unit: string;
  attributes: Record<string, string> | null;
};

export type CartItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Cart = {
  id: number;
  session_id: string;
  items: CartItem[];
  subtotal: number;
  item_count: number;
};

export type Order = {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  delivery_type: string;
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string | null;
  notes: string | null;
  store: { name: string; slug: string } | null;
  items: { id: number; product_name: string; price: number; quantity: number; subtotal: number }[];
  created_at: string;
};

export async function getStores(): Promise<Store[]> {
  const { data } = await api.get('/stores');
  return data.data;
}

export async function getStore(slug: string): Promise<Store> {
  const { data } = await api.get(`/stores/${slug}`);
  return data.data;
}

export async function getProducts(storeSlug: string, params?: Record<string, string>): Promise<Product[]> {
  const { data } = await api.get(`/stores/${storeSlug}/products`, { params });
  return data.data;
}

export async function getCart(storeSlug: string, sessionId: string): Promise<Cart> {
  const { data } = await api.get(`/stores/${storeSlug}/cart`, {
    headers: { 'X-Cart-Session': sessionId },
  });
  return data.data;
}

export async function addToCart(storeSlug: string, sessionId: string, productId: number, quantity = 1): Promise<Cart> {
  const { data } = await api.post(
    `/stores/${storeSlug}/cart/items`,
    { product_id: productId, quantity, session_id: sessionId },
    { headers: { 'X-Cart-Session': sessionId } }
  );
  return data.data;
}

export async function updateCartItem(storeSlug: string, sessionId: string, itemId: number, quantity: number): Promise<Cart> {
  const { data } = await api.put(
    `/stores/${storeSlug}/cart/items/${itemId}`,
    { quantity, session_id: sessionId },
    { headers: { 'X-Cart-Session': sessionId } }
  );
  return data.data;
}

export async function removeCartItem(storeSlug: string, sessionId: string, itemId: number): Promise<Cart> {
  const { data } = await api.delete(`/stores/${storeSlug}/cart/items/${itemId}`, {
    headers: { 'X-Cart-Session': sessionId },
    data: { session_id: sessionId },
  });
  return data.data;
}

export async function clearCart(storeSlug: string, sessionId: string): Promise<Cart> {
  const { data } = await api.delete(`/stores/${storeSlug}/cart`, {
    headers: { 'X-Cart-Session': sessionId },
    data: { session_id: sessionId },
  });
  return data.data;
}

export async function placeOrder(
  storeSlug: string,
  orderData: Record<string, unknown>
): Promise<{ data: Order; payfast_data: Record<string, string> | null }> {
  const { data } = await api.post(`/stores/${storeSlug}/orders`, orderData);
  return data;
}

export async function getOrder(orderNumber: string): Promise<Order> {
  const { data } = await api.get(`/orders/${orderNumber}`);
  return data.data;
}
