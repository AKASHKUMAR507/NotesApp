import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,

} from 'react-native'
import React, { useEffect, useState } from 'react'
import IconBtn from '../../components/buttons/IconBtn';
import { COLORS, FONTS, SIZES } from '../../assets/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../components/SearchBar';
import NoteInputModal from '../../components/NoteInputModal';
import Note from '../../components/Note';
import { useNotes } from '../../contexts/NoteProvider';
import NotFound from '../../components/NotFound';


const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const Home = ({ user, navigation }) => {

  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes()
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Are You Sure!", "You intend to log out of the application.", [
        {
          text: "Cancel",
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: "Yes",
          onPress: () => BackHandler.exitApp()
        }
      ]);
      return true
    }
    // add event listener for the back button to exit app
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [])


  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

  };

  const openNote = note => {
    navigation.navigate('NotesDetails', { note });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };


  const fintGreet = () => {
    const hrs = new Date().getHours()
    if (hrs === 0 || hrs < 12) return setGreet("Good Morning");
    if (hrs === 1 || hrs < 17) return setGreet('Good Afternoon');
    setGreet('Good Evening');
  }
  useEffect(() => {
    fintGreet()
  }, [])

  const reverseNotes = reverseData(notes)

  return (
    <>

      {/* ********************** Main container ******************* */}
      <View style={styles.container}>
        {/* ******************** Heading ********************* */}
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: SIZES._large,
          marginTop: 15,
        }}>
          <Text style={styles.heading}>{greet}, Your Notes</Text>
        </View>
        <View style={{
          height: 2,
          backgroundColor: COLORS._gray,
        }}></View>
        {/* ******************** Search Bar ********************* */}
        {notes.length ? (<SearchBar
          value={searchQuery}
          onChangeText={handleOnSearchInput}
          onClear={handleOnClear}
          container={styles.searchBarContainer} />) : null}
        {/* ********************** Items ************************* */}
        {resultNotFound ? (
          <NotFound />
        ) : (

          <FlatList
            data={reverseNotes}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Note onPress={() => openNote(item)} item={item} />}
          />
        )}

        {/* ******************** ADD NOTES ********************* */}

        {!notes.length ? (
          <View style={[StyleSheet.absoluteFillObject, styles.emptyHeader]}>
            <Text style={styles.addNotes}>Add Notes</Text>
          </View>
        ) : null}

        <IconBtn
          name={'pluscircle'}
          size={40}
          color={COLORS._blue}
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        />

      </View>
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />

    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS._while,
    paddingHorizontal: SIZES._xxxmedium,
  },
  heading: {
    color: COLORS._blue,
    fontSize: SIZES._xxxmedium,
    fontFamily: FONTS._poppins_bold,
  },
  searchBarContainer: {
    paddingHorizontal: SIZES._xxxmedium,
    marginTop: 15,
    marginBottom: 10,
  },
  emptyHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  addNotes: {
    color: COLORS._black,
    fontSize: SIZES._xmedium,
    fontFamily: FONTS._poppins_bold,
    opacity: 0.15,
    textTransform: 'uppercase',
  },
  addBtn: {
    position: 'absolute',
    right: SIZES._xxmedium,
    bottom: SIZES._large + 2,
    zIndex: 1,
  },
})