import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  const date = new Date();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Icon name="globe-asia" size={35} color="black" />
          <Text style={styles.title}>News</Text>
        </View>
        <View>
          <Text style={styles.headerDate}>
            {date.toLocaleString('default', {day: '2-digit', month: 'long'})}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  header: {},
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    paddingHorizontal: 5,
  },
  headerDate: {
    fontSize: 25,
    fontWeight: '800',
    color: 'grey',
  },
  history: {

  },
  historyText:{

  }
});
