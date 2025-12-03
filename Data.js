import React, {useState, createContext} from 'react';

export const DataContext = createContext();

export const DataSource = ({ children }) => {
    const [GPA, setGPA] = useState([
        {
            Module: 'Maths',
            code: 'M101',
            data: [
                { id: ' M1', semester: 'Sem 1', grades: 3.0 },
                { id: 'M2', semester: 'Sem 2', grades: 3.5 },
            ]
        },
        {
            Module: 'English',
            code: 'E100',
            data: [
                { id: ' E1', semester: 'Sem 1', grades: 3.1 },
                { id: 'E2', semester: 'Sem 2', grades: 3.0 },
            ]
        },
        {
            Module: 'Science',
            code: 'S300',
            data: [
                { id: ' S1', semester: 'Sem 1', grades: 2.5 },
                { id: 'S2', semester: 'Sem 2', grades: 2.65 },
            ]
        },
    ]);

    const addGPA = (moduleName, code, semester, grade) => {
        let numericGrade = null;
        if (grade !== '' && grade !== null) {
            numericGrade = parseFloat(grade);
        }

        const existingModuleIndex = GPA.findIndex((item) => item.code === code);

        if (existingModuleIndex !== -1) {
            const updatedGPA = [...GPA];
            const targetModule = { ...updatedGPA[existingModuleIndex] };
            const targetData = [...targetModule.data];
            const existingSemesterIndex = targetData.findIndex(d => d.semester === semester);

            if (existingSemesterIndex !== -1) {
                targetData[existingSemesterIndex] = {
                    ...targetData[existingSemesterIndex],
                    grades: numericGrade
                };
            } else {
                targetData.push({
                    id: Math.random().toString(),
                    semester: semester,
                    grades: numericGrade
                });
            }

            targetData.sort((a, b) => a.semester.localeCompare(b.semester));
            targetModule.data = targetData;
            updatedGPA[existingModuleIndex] = targetModule;
            setGPA(updatedGPA);

        } else {
            const newModule = {
                Module: moduleName,
                code: code,
                data: [
                    {
                        id: Math.random().toString(),
                        semester: 'Sem 1',
                        grades: semester === 'Sem 1' ? numericGrade : null
                    },
                    {
                        id: Math.random().toString(),
                        semester: 'Sem 2',
                        grades: semester === 'Sem 2' ? numericGrade : null
                    }
                ]
            };
            setGPA([...GPA, newModule]);
        }
    };

    const editGPA = (newName, newCode, semester, newGrade, originalCode) => {
        let numericGrade = null;

        if (newGrade !== '' && newGrade !== null) {
            numericGrade = parseFloat(newGrade);
        }

        const updatedGPA = GPA.map((module) => {
            if (module.code === originalCode) {

                const updatedData = module.data.map((item) => {
                    if (item.semester === semester) {
                        return { ...item, grades: numericGrade };
                    }
                    return item;
                });

                return {
                    ...module,
                    Module: newName,
                    code: newCode,
                    data: updatedData
                };
            }
            return module;
        });
        setGPA(updatedGPA);
    };

    const deleteGPA = (code, semester = null) => {
        if (semester) {
            const updatedGPA = GPA.map((module) => {
                if (module.code === code) {
                    const updatedData = module.data.map((item) => {
                        if (item.semester === semester) {
                            return { ...item, grades: null };
                        }
                        return item;
                    });
                    return { ...module, data: updatedData };
                }
                return module;
            });
            setGPA(updatedGPA);
        } else {
            const updatedGPA = GPA.filter((module) => module.code !== code);
            setGPA(updatedGPA);
        }
    };

    const calculateOverallGPA = () => {
        let totalGrades = 0;
        let totalCount = 0;

        GPA.forEach((module) => {
            module.data.forEach((item) => {
                if (item.grades !== null && item.grades !== "" && !isNaN(item.grades)) {
                    totalGrades += parseFloat(item.grades);
                    totalCount += 1;
                }
            });
        });

        if (totalCount === 0) return "0.00";
        return (totalGrades / totalCount).toFixed(2);
    }

    return (
        <DataContext.Provider value={{ GPA, addGPA, editGPA, deleteGPA, calculateOverallGPA }}>
            {children}
        </DataContext.Provider>
    );
};