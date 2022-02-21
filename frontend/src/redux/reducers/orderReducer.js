import { NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, CLEAR_ERRORS } from "../constants/orderConstant";


export const orderReducer = (state={}, action) => {
    switch(action.type){
        case NEW_ORDER_REQUEST: 
        return{
            ...state,
            loading: true
        }
        case NEW_ORDER_SUCCESS: 
        return{
            ...state,
            loading: false,
            success: action.payload
        }
        case NEW_ORDER_FAIL: 
        return{
            ...state,
            loading: false,
            error: action.payload
        }
        case CLEAR_ERRORS: 
        return{
            ...state,
            error: null
        }
       default : return state
    }
}

export const myOrdersReducer = (state={orders:[]}, action) => {
    switch(action.type){
        case MY_ORDER_REQUEST: 
        return{
            loading: true
        }
        case MY_ORDER_SUCCESS: 
        return{
            loading: false,
            orders: action.payload
        }
        case MY_ORDER_FAIL: 
        return{
            loading: false,
            error: action.payload
        }

        case CLEAR_ERRORS: 
        return{
            ...state,
            error: null
        }
       default : return state
    }
}