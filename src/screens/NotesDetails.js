import {
    StyleSheet, Text, View, BackHandler, Alert, TouchableOpacity,
    ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import IconBtn from '../components/buttons/IconBtn';
import { COLORS, FONTS, SIZES } from '../assets/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from '../components/NoteInputModal';

const formateDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
}

const NotesDetails = (props) => {

    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate('Home');
            return true; // Return true to prevent default back button action
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Cleanup event listener on unmount
    }, []);

    const [note, setNote] = useState(props.route.params.note)
    const { setNotes } = useNotes();
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    // Delete Note Functionality
    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result != null) notes = JSON.parse(result);
        const newNotes = notes.filter(n => n.id != note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();

    }

    const displayDeleteAlert = () => {
        Alert.alert('Are You Sure!', 'This action delete your note permanently!', [
            {
                text: 'Delete',
                onPress: () => { deleteNote() },
            },
            {
                text: 'No Thanks',
                onPress: () => console.log("no Thanks")
            }
        ],
            {
                cancelable: true
            });
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes')
        let notes = [];
        if (result !== null) notes = JSON.parse(result)

        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title;
                n.desc = desc;
                n.isUpdated = true;
                n.time = time;
                setNote(n);
            }
            return n;
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }
    const handleOnClose = () => setShowModal(false)

    const openEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                columnGap: 15,
            }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{
                }}>
                    <IconBtn
                        name={'arrowleft'}
                        size={30}
                        color={COLORS._while}
                        style={{
                            backgroundColor: COLORS._blue,
                            width: 30,
                            justifyContent: 'center',
                            borderRadius: 50,
                        }} />
                </TouchableOpacity>
                <Text style={[styles.content, styles.title, styles.headingtitle]} numberOfLines={1}>{note.title}</Text>
            </View>

            <View style={{
                height: 2,
                backgroundColor: COLORS._gray,
                marginTop: 15,
            }}>
            </View>


            <Text style={styles.times}>
                {note.isUpdated
                    ? `Updated At ${formateDate(note.time)}`
                    : `Created At ${formateDate(note.time)}`}
            </Text>


            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.content, styles.title]}>{note.title}</Text>
                <Text style={[styles.content, styles.desc]}>{note.desc}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn2}
                    onPress={displayDeleteAlert}
                >
                    <IconBtn
                        name={'delete'}
                        size={20}
                        color={COLORS._while}
                        style={{}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1}
                    onPress={openEditModal}>
                    <IconBtn
                        name={'edit'}
                        size={20}
                        color={COLORS._while}
                        style={{
                        }}

                    />
                </TouchableOpacity>

            </View>
            <NoteInputModal
                onClose={handleOnClose}
                onSubmit={handleUpdate}
                visible={showModal}
                isEdit={isEdit}
                note={note}
            />
        </View>
    )
}

export default NotesDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS._while,
    },
    content: {
        color: COLORS._black,
    },
    title: {
        fontSize: 20,
        fontFamily: FONTS._poppins_bold,
        color: COLORS._blue,
    },
    desc: {
        fontSize: 15,
        fontFamily: FONTS._poppins_regular,
    }
    ,
    headingtitle: {
        width: '80%'
    },
    times: {
        color: COLORS._gray,
        textAlign: 'right',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
        opacity: 1,
    },
    btnContainer: {
        position: 'absolute',
        zIndex: 1,
        bottom: 60,
        right: 30,
        rowGap: 20,
    },
    btn1: {
        backgroundColor: COLORS._blue,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    btn2: {
        backgroundColor: COLORS._red,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
})