import { Pressable, StyleSheet, Text, View } from 'react-native'

import Colors from '../constants/Colors';

export default function GenericButton({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, (mode === 'flat') ? styles.flat : null]}>
                    <Text style={[styles.buttonText, (mode === 'flat') ? styles.flatText : null]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: Colors.primary500,
        minWidth: 80,
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: Colors.primary200,

    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
        backgroundColor: Colors.primary100,
    }

});