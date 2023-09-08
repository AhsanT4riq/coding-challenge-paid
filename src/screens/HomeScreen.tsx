import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import NewsList from '../components/NewsList';
import {RootStackParamList} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {updateSearchTerm, getArticles, clearState} from '../feature/newsSlice';
import {RootState} from '../store';
import ErrorModal from '../components/ErrorModal';

type HomeScreenProps = {};

const HomeScreen: FC<HomeScreenProps> = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {loading, news, searchTerm, totalResults} = useSelector(
    (state: RootState) => state.news,
  );
  const dispatch: any = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //Fetching News articles on Return
  const fetchNews = async () => {
    dispatch(clearState());
    dispatch(getArticles(searchTerm));
  };

  const setSearchTerm = (term: string) => {
    dispatch(updateSearchTerm(term));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Box */}
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchNews={fetchNews}
      />

      {/* News List */}
      {loading ? (
        <View style={styles.newsContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <NewsList navigation={navigation} news={news} />
      )}
      <ErrorModal
        searchTerm={searchTerm}
        isVisible={totalResults === 0}
        onClose={() => dispatch(clearState())}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
