import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert,ScrollView,Modal} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends React.Component{
constructor(){
    super()
    this.state={
        emailId:'',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        docId:''
    }
}
getUserDetails=()=>{
    var email = firebase.auth().currentUser.email
    db.collection("users").where('email_id','==',email).get()
    .then((snapShot)=>{snapShot.forEach((doc)=>{
        var data = doc.data()
        this.setState({
            emailId:data.email_id,
            firstName:data.first_name,
            lastName:data.last_name,
            address:data.address,
            contact:data.contact,
            docId:doc.id
        })
    })})
}
updateUserDetails=()=>{
    db.collection("users").doc (this.state.docId).update({
        'first_name':this.state.firstName,
        'last_name':this.state.lastName,
        'address':this.state.address,
        'contact':this.state.contact
    })
    Alert.alert("Profile Updated Successfully")
}
componentDidMount(){
    this.getUserDetails();
}
render(){
    return(
        <View style={styles.container}>
            <MyHeader title='Settings'navigation={this.props.navigation}></MyHeader>
            <View style={styles.formContainer}>
            <TextInput style={styles.formtextinput}placeholder="first name"value={this.state.lastName}maxLength={8} onChangeText={(text)=>{this.setState({
                    firstName:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="last name"value={this.state.firstName}maxLength={8} onChangeText={(text)=>{this.setState({
                    lastName:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="address"value={this.state.address}multiline={true} onChangeText={(text)=>{this.setState({
                    address:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="contact number"value={this.state.contact}maxLength={10}keyboardType={'numeric'} onChangeText={(text)=>{this.setState({
                    contact:text
                })}}></TextInput>
                <TouchableOpacity style={styles.button}onPress={()=>{this.updateUserDetails()}}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formContainer:{
      flex:1,
      alignItems:'center',
      width:'100%'
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
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
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
    regesterbutton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    regesterbuttontext:{
      color:'#FF5722',
      fontSize:15,
      fontWeight:'bold'
        },
        cancelButton:{
          width:200,
          height:30,
          justifyContent:'center',
          alignItems:'center',
          marginTop:5
        }
  })
  