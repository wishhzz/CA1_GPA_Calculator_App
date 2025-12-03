import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DataContext } from './Data';

const Edit = ({ navigation, route }) => {
    const { name, code, semester, grade } = route.params;

    const [newName, setNewName] = useState(name);
    const [newCode, setNewCode] = useState(code);
    const [newGrade, setNewGrade] = useState(grade);

    const { editGPA, deleteGPA } = useContext(DataContext);

    const handleGradeChange = (text) => {
        if (text === '' || /^\d*\.?\d*$/.test(text)) {
            setNewGrade(text);
        }
    };

    const handleSave = () => {
        if (!newCode || !newName) {
            Alert.alert("Error", "Module Code and Name cannot be empty.");
            return;
        }

        if (newGrade !== '' && newGrade !== null) {
            const numericGrade = parseFloat(newGrade);

            if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 4) {
                Alert.alert("Invalid Grade", "The grade must be between 0 and 4.0");
                return;
            }
        }

        editGPA(newName, newCode, semester, newGrade, code);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Module</Text>

            <View style={styles.inputContainer}>
                <View style={styles.readOnlyBox}>
                    <Text style={styles.label}>Semester:</Text>
                    <Text style={styles.readOnlyText}>{semester}</Text>
                </View>

                <Text style={styles.label}>Module Name:</Text>
                <TextInput
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="e.g. Mobile App Dev"
                />

                <Text style={styles.label}>Module Code:</Text>
                <TextInput
                    style={styles.input}
                    value={newCode}
                    onChangeText={setNewCode}
                    placeholder="e.g. C346"
                />

                <Text style={styles.label}>Grade (Leave empty if not graded):</Text>
                <TextInput
                    style={styles.input}
                    value={newGrade}
                    onChangeText={handleGradeChange}
                    keyboardType="decimal-pad"
                    placeholder="0.0 - 4.0"
                />
            </View>

            <View style={styles.buttonGroup}>
                <View style={styles.btn}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        title="Delete"
                        color="red"
                        onPress={() => {
                            Alert.alert("Confirm", "Delete this module?", [
                                { text: "Cancel" },
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        deleteGPA(code, semester);
                                        navigation.goBack();
                                    }
                                }
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#facab0',
        justifyContent: 'center'
    },
    header: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30
    },
    readOnlyBox: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10
    },
    readOnlyText: {
        fontSize: 18,
        color: '#555',
        marginTop: 5
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        flex: 1,
        marginHorizontal: 5
    }
});

export default Edit;