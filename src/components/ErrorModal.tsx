import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  searchTerm: string;
  isVisible: boolean;
  onClose: () => void;
};

const ErrorModal: FC<Props> = ({isVisible, onClose, searchTerm}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.container}>
        <View style={styles.errorIcon}>
          <Icon name="error" size={50} color="#FF666B" />
          <Text style={styles.errorTitle}>Sorry!</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>
            No result for term:{' '}
            <Text style={{fontWeight: 'bold'}}>{searchTerm}</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
  },
  errorIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
  },
  content: {padding: 10},
  closeBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FF666B',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  btnText: {
    fontSize: 20,
  },
});
