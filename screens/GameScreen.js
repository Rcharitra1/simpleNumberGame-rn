import React, {useState, useRef, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons'
import { View, StyleSheet, Text,Alert, ScrollView , Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const getRandomNumber=(min, max, exclude)=>
{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndM = Math.floor(Math.random() * (max-min))+min;
    if(rndM===exclude)
    {
        return getRandomNumber(min, max, exclude);
    }else
    {
        return rndM;
    }
}

const GameScreen = (props)=>{
    const [currentGuess, setCurrentGuess]=useState(getRandomNumber(1, 100, props.userChoice));
    const [noOfGuess, setNoOfGuess]=useState([]);

    const [deviceHeight, setDeviceHieght]=useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentMax = useRef(100);
    const {handleGameOver, userChoice}= props;
    useEffect(()=>{
        if(noOfGuess.length===0)
        {
            setNoOfGuess([currentGuess, ...noOfGuess]);
        }

        if(currentGuess===userChoice)
        {
            handleGameOver(noOfGuess.length);
        }

        const updateDeviceHeight=()=>{
            setDeviceHieght(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateDeviceHeight);

        return ()=>{
            Dimensions.removeEventListener('change', updateDeviceHeight);
        }

       
    }, [currentGuess,])
    const handleNextGuess=(direction)=>
    {
        if((direction==='L' && currentGuess<props.userChoice) || (direction=='G' && currentGuess>props.userChoice))
        {

            Alert.alert('Liar','Try again', [{text:'Retry', style:'cancel'}])
        }
       else
        {
            if(direction==='L')
            {
             
               currentMax.current = currentGuess;
            }else
            {
                currentLow.current=currentGuess
            }

            const numberGuessed=getRandomNumber(currentLow.current, currentMax.current, currentGuess);
            setCurrentGuess(numberGuessed);
            setNoOfGuess([numberGuessed, ...noOfGuess]);
            
        }
    }
   

    if(deviceHeight>500)
    {
    return(
        
        <View style={styles.screen}>
            <Text style={styles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={()=>{handleNextGuess('L')}}>
                <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>

                <MainButton title="Greater" onPress={()=> {handleNextGuess('G')}}>
                <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.scrollView}>
            <ScrollView contentContainerStyle={styles.scroll}>
            {noOfGuess.map((guess, index)=><View style={styles.item} key={index}><Text style={styles.listGuess}>#{noOfGuess.length-index}</Text><Text style={styles.listText}>{guess}</Text></View>)}
            </ScrollView>
       
            </View>
            
        </View>);
    }
    else
    {
        return(
        <View style={styles.screen}>
        <Text style={styles.title}>Opponent's Guess</Text>
        <Card style={styles.buttonContainer}>
        <MainButton onPress={()=>{handleNextGuess('L')}}>
       
        <Ionicons name='md-remove' size={24} color='white'/>
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>

        <MainButton title="Greater" onPress={()=> {handleNextGuess('G')}}>
        <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
    </Card>
        
       
        <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scroll}>
        {noOfGuess.map((guess, index)=><View style={styles.item} key={index}><Text style={styles.listGuess}>#{noOfGuess.length-index}</Text><Text style={styles.listText}>{guess}</Text></View>)}
        </ScrollView>
   
        </View>
        
    </View>
    
    );
    
}
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:Dimensions.get('window').height>600? 20:10,
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:Dimensions.get('window').height > 600 ? 20:0,
        width:300,
        maxWidth:'80%',

    },
    title:{
        fontSize:22        
    },
    scrollView:{
        margin:10,
        flex:1,
        width:'80%',
    },
    scroll:{
        flexGrow:1,
        justifyContent:'flex-end'
    },
    item:{
        borderRadius:6,
        marginVertical:5,
        backgroundColor:'white',
        shadowColor:'grey',
        shadowRadius:4,
        shadowOffset:{
            height:4,
            width:0
        },
        elevation:4,
        shadowOpacity:0.5,
        alignItems:'center',
    
        borderWidth:1,
        borderColor:'lightgrey',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:5        
    },
    listText:{
        fontSize:22,
        color: 'orange',
        fontWeight:'bold',
        fontFamily:'open-sans-bold'
     
    },
    listGuess:{
        fontSize:22,
        color: 'purple',
        fontWeight:'bold',
        fontFamily:'open-sans-bold'
    }
})
export default GameScreen;
