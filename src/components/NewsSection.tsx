import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const NewsSection = (props: Props) => {
  return <View style={styles.section}>{props.children}</View>;
};

export default NewsSection;

const styles = StyleSheet.create({
  section: {marginVertical: 5},
});
