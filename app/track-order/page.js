import Button from "../../components/ui/button";
import { HiOutlinePhone } from "react-icons/hi";
import { TrackOrderForm } from "./track-order-form";

export const metadata = {
  title: "Track Your Order | User.pk",
  description: "Track your order status and delivery updates on User.pk",
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-d-bg animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-d-ink text-center mb-8">
            Track Your Order
          </h1>
          <TrackOrderForm />
        </div>
      </div>
    </div>
  );
}
