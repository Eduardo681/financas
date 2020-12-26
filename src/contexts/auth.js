import React, {createContext, useState, useEffect } from 'react';
import firebase from "../services/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({});
console.disableYellowBox = true
function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    },[])
    
    async function signIn(email,password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (v) => {
            let uid = v.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: v.user.email
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((err) => {
            alert(err.code)
            console.log(err)
            setLoadingAuth(false);
        })
    }
    
    async function signUp(email, password, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (v) => {
            let uid = v.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: v.user.email
                }            
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch((err) => {
                alert(err.code)
                setLoadingAuth(false);
            })
        })
    }

    async function signOut(){
        await firebase.auth().signOut();
        AsyncStorage.clear()
        .then(() => {
            setUser(null)
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }
    return (
        <AuthContext.Provider value={{signed: !!user,user, signUp, signIn, loading, signOut, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;