import React, { createContext, useContext, ReactNode } from "react";

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  addToInventory: (item: StoreItem) => void;
  setUser: (data: UserData) => void;
  signOut: () => void;
  updateCartAddress: (address: Address) => void;
  setPaymentMethod: (paymentMethod: string) => void;
  storeItems: StoreItem[];
  userInfo: UserData;
  shippingAddress: Address;
  paymentMethod: string;

  // cart methods
  clearCart: () => void;
  getCartQuantity: () => number;
  getItemQuantity: (_id: string) => number;
  increaseCartQuantity: (_id: string) => void;
  decreaseCartQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  getTax: (tax: number, totalCost: number) => number;
  getTotalPrice: () => number;
  cartItems: CartItem[];
};

type StoreItem = {
  _id: string;
  name: string;
  price: number;
  url: string;
};

type UserData = {
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
  _id: string;
};

type Address = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type CartItem = {
  _id: string;
  quantity: number;
};

const defaultAddress = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

const StoreContext = createContext({} as StoreContext);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeItems, setStoreItems] = React.useState<StoreItem[]>(
    localStorage.getItem("storeItems")
    ? JSON.parse(localStorage.getItem("storeItems")!)
    : []);
  const [userInfo, setUserInfo] = React.useState<UserData | any>(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")!)
      : null
  );
  const [shippingAddress, setShippingAddress] = React.useState<Address>(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : defaultAddress
  );
  const [paymentMethod, setPaymentMethod] = React.useState<string>(
    localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : ""
  );
  const [cartItems, setCartItems] = React.useState<CartItem[]>(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : []
  );

  React.useEffect(() => {
    localStorage.setItem("storeItems", JSON.stringify(storeItems));
  }, [storeItems])

  React.useEffect(() => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  React.useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  React.useEffect(() => {
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
  }, [paymentMethod]);

  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Store methods
  function addToInventory(item: StoreItem) {
    setStoreItems((prevItems) => [...prevItems, item]);
  }

  // User methods
  function setUser(data: UserData) {
    setUserInfo(data);
  }

  function signOut() {
    setUserInfo(null);
    setShippingAddress(defaultAddress);
    setPaymentMethod("");
    clearCart();

    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  }

  function updateCartAddress(newAddress: Address) {
    setShippingAddress( newAddress );
  }

  // Cart methods
  function getCartQuantity() {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  function getItemQuantity(_id: string) {
    return cartItems.find((item) => item._id === _id)?.quantity || 0;
  }

  function increaseCartQuantity(_id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id) == null) {
        return [...currItems, { _id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(_id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== _id);
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(_id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== _id);
    });
  }

  function clearCart() {
    setCartItems([])
    localStorage.removeItem("cartItems")
  }

  function getTax(tax: number, totalCost: number) {
    return totalCost * tax
  }

  function getTotalPrice() {
    return cartItems.reduce((total, cartItem) => {
          const item = storeItems.find((item: any) => item._id === cartItem._id);
            const itemsCost = (item?.price || 0) * cartItem.quantity
            return total + itemsCost
        }, 0)
  };

  return (
    <StoreContext.Provider
      value={{
        storeItems,
        userInfo,
        shippingAddress,
        paymentMethod,
        setUser,
        signOut,
        addToInventory,
        updateCartAddress,
        setPaymentMethod,
        clearCart,
        getCartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getTax,
        getTotalPrice,
        cartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
