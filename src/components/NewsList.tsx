import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NewsItem from './NewsItem';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {News} from '../feature/newsSlice';

type NewsListProps = {
  navigation: NavigationProp<RootStackParamList>;
  news: News[];
};

const NewsList: React.FC<NewsListProps> = ({navigation, news}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic">
      {news?.length
        ? news.map((article: News, index: number) => (
            <NewsItem key={index} navigation={navigation} article={article} />
          ))
        : null}
    </ScrollView>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    paddingHorizontal: 5,
  },
});
