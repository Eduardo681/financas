import React from 'react';
import {View} from 'react-native';
import {PickerView} from './styles';
import {Picker as RNPickersSelect} from '@react-native-picker/picker';
export default function Picker({onChange, tipo}) {
  return (
    <PickerView>
      <RNPickersSelect
        style={{
          width: '100%',
        }}
        selectedValue={tipo}
        onValueChange={(t) => onChange(t)}>
          <RNPickersSelect.Item label="Receita" value="receita"/>
          <RNPickersSelect.Item label="Despesa" value="despesa"/>
        </RNPickersSelect>
    </PickerView>
  );
}
