import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { News } from '../feature/newsSlice';

type NewsItemProps = {
  navigation: NavigationProp<RootStackParamList>;
  article: News;
};

const NewsItem: FC<NewsItemProps> = ({navigation, article}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('News', {
          article: article,
        })
      }>
      <Image
        source={{
          uri: article.urlToImage,
        }}
        resizeMode={'cover'}
        style={styles.image}
      />
      <LinearGradient
        colors={['#0000', '#000A', '#000']}
        style={styles.titleContainer}>
        <Text style={styles.text}>{article.title}</Text>
        <Text style={styles.timestamp}>
          {new Date(article.publishedAt).toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
          })}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
  },
  image: {
    flex: 1,
    borderRadius: 24,
    height: 250,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 160,
    paddingLeft: 16,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: '#fff',
    paddingBottom: 24,
  },
  timestamp: {
    position: 'absolute',
    color: '#eee',
    fontSize: 12,
    fontWeight: '300',
    right: 16,
    bottom: 8,
  },
});
