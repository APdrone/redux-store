import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState={
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url)
      .then((resp) => {
        const response=resp.json();
        console.log(response);
        return response;
        // resp.json()
      })
      .catch((err) => console.log(err));
  });

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[]
        },
        removeItem:(state,action)=>{
         const itemId=action.payload;
         state.cartItems=state.cartItems.filter(item=>item.id !==itemId);
        },
        increase:(state,{payload})=>{
         const cartItem=state.cartItems.find(item=>item.id===payload);
         cartItem.amount++;
        },
        decrease:(state,{payload})=>{
         const cartItem=state.cartItems.find(item=>item.id===payload);
         cartItem.amount--;
        },
        calculateTotal:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach(item=>{
                amount+=item.amount;
                total+=item.amount*item.price;
            })
            state.amount=amount;
            state.total=total;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload;
        }).addCase(getCartItems.rejected,(state)=>{
            state.isLoading=false;
        })
    }

})

export const {clearCart,removeItem,increase,decrease,calculateTotal}=cartSlice.actions;

export default cartSlice.reducer;