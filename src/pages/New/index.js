import React, {useContext} from 'react';
import {Alert, Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import { useState } from 'react/cjs/react.development';
import Header from '../../components/Header';
import Picker from '../../components/Picker';
import {Background, Input, SubmitButton, SubmitText} from './styles';
import firebase from '../../services/db';
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../contexts/auth';
export default function New() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const navigation = useNavigation();
  const {user: usuario} = useContext(AuthContext);
  console.disableYellowBox = true;
  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo === null ){
      alert('Preencha todos os campos');
      return;
    }
    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor:R$${parseFloat(valor).toFixed(2)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }
  async function handleAdd(){
    let uid = usuario.uid;
    let key = await (await firebase.database().ref('historico').child(uid).push()).key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    })

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);
      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);
      user.child('saldo').set(saldo);
    })
    setValor('');
    Keyboard.dismiss();
    navigation.navigate('Home')
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{alignItems: 'center'}}>
          <Input placeholder="Valor desejado" 
          keyboardType="numeric"
          returnKeyTipe="next"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={valor}
          onChangeText={(t) => setValor(t)}
          />
          <Picker onChange={setTipo} tipo={tipo}/>
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
