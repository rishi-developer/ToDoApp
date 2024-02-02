import {View, Text, Button, TextInput, KeyboardAvoidingView, StyleSheet, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../firebaseConfig';

const Login = ({navigation}: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH

    const login = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const Signup = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={(text)=>{setEmail(text)}} 
                    placeholder="Email"
                    placeholderTextColor="#999"
                />
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    value={password} 
                    onChangeText={(text)=>{setPassword(text)}} 
                    placeholder="Password"
                    placeholderTextColor="#999"
                />

                {loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
                (
                    <View>
                        <Button title="Login" onPress={login} color="#007BFF" />
                        <Button title="Signup" onPress={Signup} color="#28A745" />
                    </View>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    keyboardView: {
        width: '80%',
    },
    input: {
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFF',
    },
});

export default Login;
