import React, { useContext } from 'react';
import { StatusBar, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { DataContext } from './Data';

const Home = ({ navigation }) => {
    const { GPA, deleteGPA, calculateOverallGPA } = useContext(DataContext);

    const renderItem = ({ item, section }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate("Edit", {
                        name: section.Module,
                        code: section.code,
                        semester: item.semester,
                        grade: item.grades === null ? '' : item.grades.toString()
                    });
                }}
            >
                <Text style={styles.itemText}>{item.semester}</Text>
                <Text style={styles.itemText}>{item.grades === null ? 'Not Graded' : `Grade: ${item.grades}`}</Text>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section }) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.headerText}>{section.Module} ({section.code})</Text>
                <TouchableOpacity
                    style={styles.deleteIconBtn}
                    onPress={() => {
                        Alert.alert("Delete Module", `Are you sure you want to delete ${section.Module}?`, [
                            { text: "Cancel" },
                            { text: "Yes", onPress: () => deleteGPA(section.code) }
                        ]);
                    }}
                >
                    <Text style={styles.deleteIconText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.gpaContainer}>
                <Text style={styles.gpaLabel}>Overall GPA</Text>
                <Text style={styles.gpaValue}>{calculateOverallGPA()}</Text>
            </View>

            <View style={{ margin: 10 }}>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate("Add")}
                >
                    <Text style={styles.addBtnText}>Add New Module</Text>
                </TouchableOpacity>
            </View>

            <SectionList
                sections={GPA}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item.id + index}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 0, backgroundColor: '#facab0',},
    gpaContainer: {paddingBottom:20, paddingTop: 40, alignItems: 'center', backgroundColor: '#f1cccc', borderBottomWidth: 1,
        borderColor: '#000000', marginBottom: 10,
    },
    gpaLabel: {marginTop:20, fontSize: 16, color: '#000000',},
    gpaValue: {fontSize: 40, fontWeight: 'bold', color: '#000000',},
    sectionHeader: {backgroundColor: '#3498db', padding: 10, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',},
    headerText: {maxWidth: '80%',fontSize: 18, fontWeight: 'bold', color: 'white',},
    itemContainer: {backgroundColor: 'white', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee',
        flexDirection: 'row', justifyContent: 'space-between',},
    itemText: {fontSize: 16,},
    buttonContainer: {margin: 10,},
    addBtn: {backgroundColor: '#0c6e1a', padding: 15,borderRadius: 5,alignItems: 'center'},
    addBtnText: {color: 'white', fontWeight: 'bold', fontSize: 16,},
    deleteIconBtn: {backgroundColor: '#c0392b', width: 30, height: 30, justifyContent: 'center',
        alignItems: 'center', borderRadius: 15,},
    deleteIconText: {color: 'white', fontWeight: 'bold', fontSize: 14,}
});

export default Home;