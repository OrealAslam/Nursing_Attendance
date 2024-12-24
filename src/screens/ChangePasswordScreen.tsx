import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get_async_data, set_async_data, update_password } from '../Helper/AppHelper';
import { Image } from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');
const buttonWidth = width - 140;
const buttonratio = buttonWidth / 880;

const ChangePasswordScreen = ({ navigation }: { navigation: any }) => {
    const [name, setname] = useState(null);
    const [currentpassword, setcurrentpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confirmnewpassword, setconfirmnewpassword] = useState('');
    const [loader, setloader] = useState(false);
    const [message, setmessage] = useState('');

    useEffect(() => {
        (async () => {
            let username = await get_async_data('username');
            let password_change = await get_async_data('password_change');
            setname(username);
            console.log('password_change', password_change);
            if(password_change != null) {
                navigation.navigate('DashboardScreen');
            }
        })()
    }, []);

    const updatePassword = async () => {
        if (
            newpassword.length < 5 ||
            confirmnewpassword.length < 5
        ) {
            setmessage('password length must not be less than 5');
        } else {
            setloader(true);
            const request = await update_password(
                currentpassword,
                newpassword,
                confirmnewpassword,
            );
            if (request.status == 'success') {
                setmessage(request.message);
                setTimeout(async () => {
                    setloader(false);
                    await set_async_data('password_change', 'changed');
                    navigation.navigate('DashboardScreen');
                }, 1000);
            } else {
                setmessage(request.message);
            }
            setloader(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: `rgba(96,96,247,1)` }}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerHeading}>Welcome ,</Text>
                <Text style={styles.headerHeading}>{name}</Text>
            </View>

            <View style={{ backgroundColor: '#fff', width: width, height: '100%', borderTopLeftRadius: 50, borderTopEndRadius: 50, padding: 10 }}>
                {/* <Text style={styles.heading}>New Password</Text> */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                        style={styles.inputText}
                        value={currentpassword}
                        onChangeText={setcurrentpassword}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        style={styles.inputText}
                        value={newpassword}
                        onChangeText={setnewpassword}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm New Password</Text>
                    <TextInput
                        style={styles.inputText}
                        value={confirmnewpassword}
                        onChangeText={setconfirmnewpassword}
                        secureTextEntry={true}
                    />
                </View>
                {loader == true ? (
                    <ActivityIndicator size={'small'} color={'#000'} />
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => updatePassword()}>
                            <Text style={{fontWeight: '700', fontSize: 16}}>Update Password</Text>
                        </TouchableOpacity>
                    </>
                )}
                <Text style={styles.error}>{message}</Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        marginTop: 10, 
        backgroundColor: `rgba(96,96,247,1)`,
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingVertical: 15
    },
    headerHeading: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
    },
    headerContainer: {
        width: width,
        justifyContent: 'center',
        marginBottom: 20,
        padding: 20
    },
    container: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: `rgba(0,0,0,0.7)`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 37,
        width: '21%',
        alignSelf: 'center',
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 1,
    },
    inputContainer: {
        width: (85 / 100) * width,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    heading: {
        color: '#202020',
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        // marginBottom: 10,
    },
    label: {
        color: '#6A7C8D',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: .7,
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    inputText: {
        color: '#2A2A2E',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        textTransform: 'capitalize',
        paddingVertical: 8,
        borderColor: '#ECEEFA',
        borderWidth: 2,
        borderRadius: 6.3,
        marginBottom: 5
    },
    error: {
        textAlign: 'center',
        top: 5,
        color: '#f00',
        textTransform: 'capitalize',
        fontSize: 10,
    },
});
export default ChangePasswordScreen;