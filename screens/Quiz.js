import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert, Modal, Animated } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import QData from '../QuizData/QData'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Quiz = () => {
    const [CQIndex, setCQIndex] = useState(0);
    const allQuestion = QData;
    const [COSelected, setCOSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isODisable, setIsODisable] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setshowNextButton] = useState(false);
    const [showScoreModel, setShowScoreModel] = useState(false);
    const [progresBar, setprogresBar] = useState(new Animated.Value(0));
    const progressAnimation = progresBar.interpolate({inputRange:[0,allQuestion.length], outputRange:['0%','100%'] });

    const renderQuestion = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 30, }}>
                    <Text style={{ color: 'black', fontSize: 20, opacity: 0.6, marginRight: 2 }}>{CQIndex + 1}</Text>
                    <Text style={{ color: 'black', fontSize: 18, opacity: 0.6 }}>/{allQuestion.length}</Text>
                </View>
                <Text style={{ color: 'black', fontSize: 30 }}>{allQuestion[CQIndex]?.question}</Text>
            </View>
        );
    }
    const validationAnswer = (selectOption) => {
        let correctOption = allQuestion[CQIndex]['correctOption'];
        setCOSelected(selectOption);
        setCorrectOption(correctOption);
        setIsODisable(true);
        if (selectOption == correctOption) {
            setScore(score + 1);
        }
        setshowNextButton(true);
    }
    const handleNextButton = () => {
        if (CQIndex == allQuestion.length - 1) {
            setShowScoreModel(true);
        }
        else {
            setCQIndex(CQIndex + 1)
            setCOSelected(null);
            setCorrectOption(null);
            setIsODisable(false);
            setshowNextButton(false);
        }
        Animated.timing(progresBar, {
            toValue:CQIndex+1,
            duration:1000,
            useNativeDriver: false            
        }).start();
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={() => handleNextButton()}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: '#9d8189', padding: 20, borderRadius: 50
                    }}>
                    <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            );
        }
        else {
            return null;
        }
    }

    const renderOption = () => {
        return (
            <View>
                {allQuestion[CQIndex]?.option.map(option => (
                    <TouchableOpacity
                        onPress={() => validationAnswer(option)}
                        key={option}
                        disabled={isODisable}
                        style={{
                            borderWidth: 3,
                            borderColor: option == correctOption ? '#00ff44' : option == COSelected ? '#ff0000' : 'black',
                            backgroundColor: option == correctOption ? '#00ff44' + '20' : option == COSelected ? '#ff0000' + '20' : '#d8e2dc',
                            height: 60,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>{option}</Text>
                        {
                            option == correctOption ? (
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30 / 2,
                                    backgroundColor: '#00ff44',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <MaterialCommunityIcons name="check" style={{
                                        color: 'black',
                                        fontSize: 20
                                    }} />
                                </View>
                            ) : option == COSelected ? (
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30 / 2,
                                    backgroundColor: '#ff0000',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name="close" style={{ color: 'black', fontSize: 20 }} />

                                </View>
                            ) : null
                        }

                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    const reStartQuiz = () => {
        setShowScoreModel(false);
        setCQIndex(0);
        setScore(0);
        setCOSelected(null);
        setCorrectOption(null);
        setIsODisable(false);
        setshowNextButton(false);
    }
    const renderProgressBar = () => {
        return(
            <View style={{
                marginTop:20,
                width:'100%',
                borderRadius:20,
                height:20,
                backgroundColor:'##00ff4'
            }}>
                <Animated.View style={[{
                    height:20,
                    borderRadius:20,
                    backgroundColor:'##00ff4'
                },{
                    width:progressAnimation
                }]}>

                </Animated.View>

            </View>
        );
    }
    return (
        <SafeAreaView>
            <StatusBar barStyle='light-content' backgroundColor='#ffcad4' />
            <View style={{
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: '#d8e2dc',
            }}>
                {renderProgressBar()}
                {renderQuestion()}
                {renderOption()}
                {renderNextButton()}
                {
                    <Modal animationType='slide'
                        transparent={true}
                        visible={showScoreModel}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: '#d8e2dc',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                backgroundColor: '#ffe5d9',
                                width: '90%',
                                borderRadius: 30,
                                padding: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestion.length / 2) ? 'Congratulations !' : 'Oops ! '}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginVertical: '20'
                                }}>
                                    <Text style={{
                                        fontSize: 30,
                                        color: score > (allQuestion.length / 2) ? '#00ff44' : '#ff0000'
                                    }}>{score}
                                    </Text>
                                    <Text style={{
                                        fontSize: 20,
                                        color: 'black'
                                    }}>/{allQuestion.length}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => reStartQuiz()}
                                    style={{
                                        backgroundColor: '#9d8189',
                                        padding: 20,
                                        width: '100%',
                                        borderRadius: 20
                                    }}>
                                    <Text style={{
                                        textAlign: 'center', color: 'black', fontSize: 20
                                    }}>Retry Quiz</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>
                }
            </View>
        </SafeAreaView>
    )
}

export default Quiz