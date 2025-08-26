// "use client";

// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useCart } from "../../context/CartContext";
// import { formatPrice } from "../../lib/utils";

// const CreateOrderForm = ({ onFormChange, onOpenBilling, onOpenShipping, formData }) => {
//   const { cart, getCartTotal } = useCart();

//   const { register, watch, formState: { errors } } = useForm({
//     defaultValues: formData || {
//       email: "",
//       firstName: "",
//       lastName: "",
//       phone: "",
//       country: "Pakistan",
//       city: "",
//       address: "",
//       shippingMethod: "standard",
//       notes: "",
//     },
//   });

//   // Sync form values to parent (CheckoutPage)
//   const values = watch();
//   useEffect(() => {
//     onFormChange(values);
//   }, [JSON.stringify(values)]);

//   return (

//   );
// };

// export default CreateOrderForm;
