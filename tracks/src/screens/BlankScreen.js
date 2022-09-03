import { useEffect, useContext } from "react";
import {Context as AuthContext} from '../context/AuthContext'

const BlankScreen = ()=>{
    const {autoSignin} = useContext(AuthContext);

    useEffect(()=>{
        autoSignin();
    }, [])
    return null;
}

export default BlankScreen;