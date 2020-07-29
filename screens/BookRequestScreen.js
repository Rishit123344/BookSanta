import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert,ScrollView,Modal} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:''
             }
    }
    createUniqueId(){
        return(Math.random().toString(36).substring(7))
    }
    addRequest=(bookName,reasonToRequest)=>{
        var userId = this.state.userId
var randomRequestId = this.createUniqueId()
db.collection("requested_books").add({
    'user_Id':userId,
    'book_name':bookName,
    'reason_to_request':reasonToRequest,
    'reason_id':randomRequestId
})
this.setState({
    bookName:'',
    reasonToRequest:''
})
return(
    Alert.alert("Book Requested Successfully")
)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Request Book"></MyHeader>
                <KeyboardAvoidingView style={styles.KeyboardStyles}>
                    <TextInput style={styles.formTextInput}placeholder={"Enter Book Name"}onChangeText={(text)=>{this.setState({
                        bookName:text
                    })}}value={this.state.bookName}></TextInput>
                     <TextInput style={styles.formTextInput}placeholder={"Reason For The Book"}onChangeText={(text)=>{this.setState({
                        reasonToRequest:text
                    })}}value={this.state.reasonToRequest}multiline numberOfLines={8}></TextInput>
                    <TouchableOpacity style={styles.button}onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}>
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    KeyboardStyles:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    formtextinput:{
        width:'75%',
        height:35,
        alignSelf:'center',
        borderColor:'#FFAB91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
  padding:10
      },
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
      },
})