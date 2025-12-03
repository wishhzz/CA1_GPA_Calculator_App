import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Picker from 'react-native-picker-select';
import { DataContext } from './Data.js';

const Add = ({ navigation }) => {
    const [moduleName, setModuleName] = useState('');
    const [code, setCode] = useState('');
    const [semester, setSemester] = useState('');
    const [grade, setGrade] = useState('');

    const { addGPA } = useContext(DataContext);

    const handleGradeChange = (text) => {
        if (/^\d*\.?\d*$/.test(text)) {
            setGrade(text);
        }
    };

    const handleSubmit = () => {
        if (!moduleName || !code || !semester) {
            Alert.alert("Error", "Please fill in Module Name, Code, and choose a Semester.");
            return;
        }
        if (grade !== '') {
            const numericGrade = parseFloat(grade);
            if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 4) {
                Alert.alert("Invalid Grade", "The grade must be between 0 and 4.");
                return;
            }
        }
        addGPA(moduleName, code, semester, grade);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Module</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Module Name (e.g., Maths)</Text>
                <TextInput
                    style={styles.input}
                    value={moduleName}
                    onChangeText={(text) => setModuleName(text)}
                    placeholder="Enter Module Name"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Module Code (e.g., M101)</Text>
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={(text) => setCode(text)}
                    placeholder="Enter Module Code"
                    autoCapitalize="characters"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Semester</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        onValueChange={(value) => setSemester(value)}
                        items={[
                            { label: 'Semester 1', value: 'Sem 1' },
                            { label: 'Semester 2', value: 'Sem 2' },
                        ]}
                        placeholder={{ label: "Select a Semester...", value: null }}
                        style={pickerSelectStyles}
                        value={semester}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Grade (Optional)</Text>
                <TextInput
                    style={styles.input}
                    value={grade}
                    onChangeText={handleGradeChange}
                    placeholder="Leave empty if not graded yet"
                    keyboardType="decimal-pad"
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#facab0',
    },
    header: {
        marginTop: 50,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        backgroundColor: 'white',
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30,
    },
});

export default Add;