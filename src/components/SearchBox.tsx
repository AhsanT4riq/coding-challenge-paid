import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type SearchBoxProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchNews: () => Promise<void>;
};

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  fetchNews,
}) => {
  const textInputRef = useRef<TextInput | undefined>();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const {searchHistory} = useSelector((state: RootState) => state.news);
  const showSearchHistory = (value: boolean) => {
    setShowHistory(value);
  };
  const selectHistory = (term: string) => {
    setSearchTerm(term);
    fetchNews();
    textInputRef.current?.blur();
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          ref={textInputRef}
          style={styles.search}
          placeholder="Search"
          placeholderTextColor={'grey'}
          keyboardType="default"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          onSubmitEditing={() => fetchNews()}
          onFocus={() => showSearchHistory(true)}
          onBlur={() => showSearchHistory(false)}
          blurOnSubmit={true}
          autoCorrect={false}
        />
        <Icon name="search" size={20} color="black" />
      </View>
      {searchHistory.length && showHistory ? (
        <View style={styles.history}>
          <Text style={styles.historyHeader}>RECENT SEARCHES</Text>
          {searchHistory.map((term, index) => (
            <TouchableOpacity
              onPress={() => selectHistory(term)}
              key={index}
              style={styles.textContainer}>
              <Icon name="history" size={20} color="black" />
              <Text style={styles.historyText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: 'silver',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  search: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    width: '90%',
  },
  history: {borderTopWidth: 1, borderTopColor: 'black'},
  historyHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  historyText: {
    fontSize: 15,
    paddingLeft: 10,
  },
});
