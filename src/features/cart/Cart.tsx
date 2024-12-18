import { ItemType } from "../../interfaces.ts";
import { removeItem } from "../../store/cartSlice.ts";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
// import cartImg3 from "../../data/img/cart.png";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart); // state.cart will be of type CartType
  const dispatch = useDispatch();

  // const handleAddItem = (item: ItemType) => {
  //   dispatch(addItem(item));
  // };

  const handleRemoveItem = (productId: number | string) => {
    dispatch(removeItem(productId));
  };

  const handleSendCart = async () => {
    try {
      const response = await fetch("http://your-backend-url/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.items }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart sent to backend:", data);
      } else {
        console.error("Failed to send cart to backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending cart to backend:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full min-w-[270px] max-w-4xl mx-auto mt-4 p-6 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm"
      // style={{ backgroundImage: `url(${cartImg3})` }}
    >
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="h-auto overflow-y-auto">
        <div className="flex flex-col gap-4">
          {cart.items.map((item: ItemType) => (
            <div
              key={item.productId}
              className=" flex text-sm items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 gap-2"
            >
              <div className="flex flex-col">
                <p className="font-medium">Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Total Price: ${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold text-gray-700 p-2">
          Grand Total: ${cart.totalPrice.toFixed(2)}
        </p>
        <button
          onClick={handleSendCart}
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        >
          Make Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
