import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert,ScrollView,Modal} from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class WelcomeScreen extends React.Component{
constructor(){
    super();
    this.state = {
        emailID :'',
        password:'',
        isModalVisible:false,
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        confirmPassword:''
    }
}
showModal=()=>{
  return(
    <Modal animationType='fade'transparent={true}visible={this.state.isModalVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text style={styles.ModalTitle}>Regestration</Text>
            <TextInput style={styles.formtextinput}placeholder="first name"maxLength={8} onChangeText={(text)=>{this.setState({
                    firstName:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="last name"maxLength={8} onChangeText={(text)=>{this.setState({
                    lastName:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="address"multiline={true} onChangeText={(text)=>{this.setState({
                    address:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="contact number"maxLength={10}keyboardType={'numeric'} onChangeText={(text)=>{this.setState({
                    contact:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="E-mail"keyboardType={'email-address'} onChangeText={(text)=>{this.setState({
                    emailID:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="password"secureTextEntry={true} onChangeText={(text)=>{this.setState({
                    password:text
                })}}></TextInput>
                 <TextInput style={styles.formtextinput}placeholder="confirm password"secureTextEntry={true} onChangeText={(text)=>{this.setState({
                  confirmPassword:text
                })}}></TextInput>
                <View style={styles.modalbackbutton}>
                  <TouchableOpacity style={styles.regesterbutton}onPress={()=>{this.userSignUp(this.state.emailID,this.state.password,this.state.confirmPassword)}}>
                    <Text style={styles.regesterbuttontext}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalbackbutton}>
                  <TouchableOpacity style={styles.cancelButton}onPress={()=>{this.setState({isModalVisible:false})}}>
                    <Text style={{color:"#ff5722"}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
}
userlogin=(emailID,password)=>{
  
  firebase.auth().signInWithEmailAndPassword(emailID,password)
  .then(()=>{
      this.props.navigation.navigate('DonateBooks')
  })
  .catch((error)=>{
var errorcode = error.code
var errorMessage = error.errorMessage
return Alert.alert(errorMessage)
  })
}
userSignUp=(emailID,password,confirmPassword)=>{
  console.log(emailID,password,confirmPassword)
if(password!==confirmPassword){
  return(
    Alert.alert("Password does not match")
  )
}else{
  firebase.auth().createUserWithEmailAndPassword(emailID,password)
  .then(()=>{
    db.collection('users').add({
      first_name:this.state.firstName,
      last_name:this.state.lastName,
      contact:this.state.contact,
      address:this.state.address,
      email_Id:this.state.emailID
    })
      return Alert.alert("User Added Sucessfully","",[{text:"ok",onPress:()=>{this.setState({
       'isModalVisible':false
      })}}])
  })
  .catch((error)=>{
var errorcode = error.code
console.log(errorcode)
var errorMessage = error.errorMessage
return Alert.alert(errorMessage)
  })
}
}
render(){
    return(
        <View style={styles.container }>
          {this.showModal()}
            <View style={styles.profileContainer}>
<Text style={styles.title}>BOOK SANTA</Text>
            </View>
            <View style={styles.buttonContainer}>
            <TextInput style={styles.loginBox}placeholder="abc@example.com"placeholderTextColor='#ffff' keyboardType='email-address'onChangeText={(text)=>{this.setState({
                    emailID:text
                })}}></TextInput>
                 <TextInput style={styles.loginBox}placeholder="Password"placeholderTextColor='#ffff' secureTextEntry={true} onChangeText={(text)=>{this.setState({
                    password:text
                })}}></TextInput>
                <TouchableOpacity style={[styles.button,{marginTop:20,marginBottom:20}]}onPress={()=>{this.userlogin(this.state.emailID,this.state.password)}}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}onPress={()=>{this.setState({isModalVisible:true})}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
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
    buttonContainer:{
      flex:1,
      alignItems:'center'
    },
    KeyboardAvoidingView:{
      flex:1,
justifyContent:'center',
alignItems:'center'
    },
    ModalTitle:{
justifyContent:'center',
alignItems:'center',
fontSize:30,
color:'#FF5722',
margin:50,
    },
    modalContainer:{
      flex:1,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFFF',
      marginRight:30,
      marginLeft:30,
      marginTop:80,
      marginBottom:80
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
  