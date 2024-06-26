import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import QData from '../QuizData/QData'

const Quiz = () => {
    const [CQIndex, setCQIndex] = useState(0);
    const allQuestion = QData;
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
    const validationAnswer = () => {
        
    }
    const renderOption = () => {
        return (
            <View>
                {allQuestion[CQIndex]?.option.map(option => (
                    <TouchableOpacity
                        key={option}
                        style={{
                            borderWidth: 3,
                            borderColor: 'black',
                            height: 60,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}>
                        <Text style={{fontSize:20, color:'black'}}>{option}</Text>

                    </TouchableOpacity>
                ))}
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
                {renderQuestion()}
                {renderOption()}

            </View>
        </SafeAreaView>
    )
}

export default Quiz