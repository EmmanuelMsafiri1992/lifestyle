import { notFound } from 'next/navigation';
import { getStore } from '@/lib/api';
import { CheckoutClient } from './CheckoutClient';

type Props = { params: Promise<{ slug: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  try {
    const store = await getStore(slug);
    return <CheckoutClient store={store} />;
  } catch {
    notFound();
  }
}
