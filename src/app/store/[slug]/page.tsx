import { notFound } from 'next/navigation';
import { getStore } from '@/lib/api';
import { StorePageClient } from './StorePageClient';

type Props = { params: Promise<{ slug: string }> };

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  try {
    const store = await getStore(slug);
    return <StorePageClient store={store} />;
  } catch {
    notFound();
  }
}
