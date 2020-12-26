import React, {useContext, useState} from 'react';
import { Platform, ActivityIndicator} from "react-native";
import { Background, Container, AreaInput, Input,SubmitButton, SubmitText } from "../SignIn/styles.js";
import { AuthContext } from "../../contexts/auth";
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome)
  }
 return (
   <Background>
       <Container 
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
       >
         <AreaInput>
          <Input 
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(t) => setNome(t)}
          />
         </AreaInput>
         <AreaInput>
          <Input 
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => setEmail(t)}
          />
         </AreaInput>
         <AreaInput>
          <Input 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(t) => setPassword(t)}
          />
         </AreaInput>
         <SubmitButton onPress={handleSignUp}>
         {loadingAuth? (
             <ActivityIndicator size={20} color="#fff"/>
           ): (
            <SubmitText>
            Cadastrar
           </SubmitText>
           )}
          
         </SubmitButton>
       </Container>
    </Background>
  );
}