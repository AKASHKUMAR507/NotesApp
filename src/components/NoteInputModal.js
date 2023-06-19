import {
    StyleSheet,
    Text,
    View,
    Modal,
    StatusBar,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../assets/Themes'
import IconBtn from './buttons/IconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title);
            setDesc(note.desc);
        }
    }, [isEdit]);

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    };

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();
        if (isEdit) {
            onSubmit(title, desc, Date.now());
        } else {
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }

        onClose();
    };

    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    };


    return (
        <>
            {/* <StatusBar hidden /> */}
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input, styles.title]}
                        placeholder='Title'
                        placeholderTextColor={COLORS._gray}
                        value={title}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />
                    <TextInput
                        style={[styles.input, styles.content]}
                        multiline
                        placeholder='Content'
                        placeholderTextColor={COLORS._gray}
                        value={desc}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    />
                    <View style={styles.btnContainer}>
                        <IconBtn
                            size={40}
                            name='checkcircle'
                            color={COLORS._blue}
                            onPress={handleSubmit}
                        />
                        {title.trim() || desc.trim() ? (
                            <IconBtn
                                size={40}
                                style={{ marginLeft: 15 }}
                                name='closecircle'
                                color={COLORS._red}
                                onPress={closeModal}
                            />
                        ) : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default NoteInputModal

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS._gray,
        fontSize: 20,
        color: COLORS._gray,
    },
    title: {
        height: 40,
        fontWeight: 'bold',
        padding: 0,
    },
    content: {
        height: 100,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
})