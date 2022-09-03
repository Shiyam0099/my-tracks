import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../../navigationRef";


const authReducer = (state, action)=>{
    switch(action.type){
        case 'signin':{
            return {errorMessage:'', token: action.payload}
        }
        case 'signup':{
            return {errorMessage:'', token: action.payload}
        }
        case 'add_error': {
            return {...state, errorMessage: action.payload};
        }
        case 'signout': {
            return {errorMessage:'', token: null}
        }
        default: return state;
    }
}

const autoSignin = (dispatch)=>{
    return async ()=>{
        const token = await AsyncStorage.getItem('token');
        if(token){
            dispatch({type: 'signin', payload: token})
            navigate('TrackList')
        }else{
            navigate('Signup')
        }
    }
}

const signup = (dispatch)=>{
    return async(email, password)=>{
       try {

        const response = await tracker.post('/signup', {email, password})
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signup', payload: response.data.token});

        navigate('TrackList');
        
       } catch (error) {
        dispatch({type: "add_error", payload: "Something went wrong!"})
       }
    }
}
const signin = (dispatch)=>{
    return async(email, password)=>{
        try {
 
         const response = await tracker.post('/signin', {email, password})
         await AsyncStorage.setItem('token', response.data.token);
         dispatch({type: 'signin', payload: response.data.token});
 
         navigate('TrackList');
         
        } catch (error) {
         dispatch({type: "add_error", payload: "Something went wrong with sign in!"})
        }
     }
}
const signout = (dispatch)=>{
   return async ()=>{
        await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});

    navigate('Signup');
    }
    
}


export const {Context, Provider} = createDataContext(authReducer, {signup, signin, signout, autoSignin}, [{token : null, errorMessage: ""}])