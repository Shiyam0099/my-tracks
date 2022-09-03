import React, {useState, useContext} from "react";
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext} from "../context/AuthContext";

const SigninScreen = ({navigation})=>{
    const {state, signin} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style = {styles.view}>
        <Spacer>
            <Text h3>Signin Screen</Text>
        </Spacer>
        <Input 
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        label='Email'/>
        
        <Spacer />
        <Input 
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        label='Password'/>
            {state.errorMessage? <Text style={styles.error}>{state.errorMessage}</Text> : null}
        <Spacer>
            <Button title='Sign in' onPress={()=>signin(email, password)} />
        </Spacer>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <Spacer>
                <Text style={styles.link}>Don't have an account? Signup!</Text>
            </Spacer>
        </TouchableOpacity>
        </View>
    )
}

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200,
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 15,
        alignSelf: 'center'
    },
    link: {
        color: 'blue',
        alignSelf: 'center'
    }
});

export default SigninScreen;