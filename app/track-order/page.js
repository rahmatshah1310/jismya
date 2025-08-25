import Button from "../../components/ui/button";
import { HiOutlinePhone } from "react-icons/hi";
import { TrackOrderForm } from "./track-order-form";

export const metadata = {
  title: "Track Your Order | User.pk",
  description: "Track your order status and delivery updates on User.pk",
};

export default function TrackOrderPage() {
  return (
    <div className="container-custom py-20">
      <div className="max-w-2xl mx-auto">
        <TrackOrderForm />
      </div>
    </div>
  );
}
