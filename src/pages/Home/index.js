import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import {Background, Container, Nome, Saldo, Title, List, Area} from './styles';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/db';
import {format, isPast} from 'date-fns';
import {Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import DatePicker from '../../components/DatePicker';
export default function Home() {
  const {user} = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const uid = user.uid;
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);
  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', (snapshot) => {
          setSaldo(snapshot.val().saldo);
        });
      await firebase
        .database()
        .ref('historico')
        .child(uid)
        .orderByChild('date')
        .equalTo(format(newDate, 'dd/MM/yyyy'))
        .limitToLast(10)
        .on('value', (snapshot) => {
          setHistorico([]);
          snapshot.forEach((item) => {
            let list = {
              key: item.key,
              tipo: item.val().tipo,
              valor: item.val().valor,
              date: item.val().date,
            };
            setHistorico((oldArray) => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, [newDate]);

  function handleDelete(data) {
    if (isPast(new Date(data.date))) {
      alert('Não excluir registros antigos');
      return;
    }
    Alert.alert(
      'Cuidado atenção',
      `Você deseja excluir ${data.tipo} - Valor: R$ ${data.valor.toFixed(2)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data),
        },
      ],
    );
  }
  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref('historico')
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === 'despesa'
          ? (saldoAtual += parseFloat(data.valor))
          : (saldoAtual -= parseFloat(data.valor));

        await firebase
          .database()
          .ref('users')
          .child(uid)
          .child('saldo')
          .set(saldoAtual);
      })
      .catch((err) => {});
  }

  function handleShowPicker() {
    setShow(true);
  }
  function handleClose(){
    setShow(false);
  }

  const onChange = (date) =>{
    setShow(Platform.IOS === 'ios');
    setNewDate(date);
  }
  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2)}</Saldo>
      </Container>
      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" size="#fff" size={30} color="white" />
        </TouchableOpacity>
        <Title>Ultimas informações</Title>
      </Area>
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />
      {show && <DatePicker onClose={handleClose} date={newDate} onChange={onChange} />}
    </Background>
  );
}
