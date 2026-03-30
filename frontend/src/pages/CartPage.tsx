import { useCartStore } from '../store/useCartStore.ts';
import { OrderSummary } from '@/components/cart/OrderSummary.tsx';
import { CartItems } from '@/components/cart/CartItems.tsx';
import { CartHeader } from '@/components/cart/CartHeader.tsx';
import { EmptyCart } from '@/components/cart/EmptyCart.tsx';

export default function CartPage() {
  const { items } = useCartStore();

  // Empty state
  if (items.length === 0) return <EmptyCart />;

  return (
    <main className='max-w-4xl mx-auto px-4 py-10'>
      <CartHeader />

      <div className='flex flex-col lg:flex-row gap-8'>
        <CartItems />

        <OrderSummary />
      </div>
    </main>
  );
}
