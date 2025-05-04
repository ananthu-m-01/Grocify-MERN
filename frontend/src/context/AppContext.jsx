import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user,setUser] = useState(true);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});


    // to fetch all products

    const fetchProducts =  async ()=>{
        setProducts(dummyProducts);
    }

    // add to cart
    const addToCart = () =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("added to cart");
    }

    //update cart items
    const updateCartItem = (itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] =  quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    }

    // remove product from cart
    const removeFromCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    const value = {navigate,user,setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem}


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}