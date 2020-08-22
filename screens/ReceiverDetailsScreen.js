import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import {Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam('details')['user_id'],
            requestId:this.props.navigation.getParam('details')['request_id'],
            bookName:this.props.navigation.getParam('details')['book_name'],
            reasonForRequesting:this.props.navigation.getParam('details')['reason_to_request'],
            receiverName:'',
            receiverContact:'',
            address:'',
            receiverRequestDocId:'',
            userName:''
        }
    }
    getReceiverDetails(){
        db.collection("users").where('email_id','==',this.state.receiverId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{this.setState({
                receiverName:doc.data().first_name,
                receiverContact:doc.data.contact,
                receiveraddress:doc.data.address
            })})
        })
        db.collection("requested_books").where('request_id','==',this.state.requestId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{this.setState({
                receiverRequestDocId:doc.id
            })})
        })
    }
    componentDidMount(){this.getReceiverDetails()}
    updateBookStatus=()=>{
        db.collection("all_donations").add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.receiverName,
            donor_id:this.state.userId,
            request_status:'donorIntrested'
        })
    }
    addNotification=()=>{
        var message = this.state.userName+'has Shown Interest In Donating The Book'
        db.collection('all_notifications').add({
            targeted_user_id:this.state.receiverId,
            donor_id:this.state.userId,
            request_id:this.state.requestId,
            book_name:this.state.bookName,
            date:firebase.firestore.FieldValue.serverTimestamp(),
notification_status:'unread',
message:message
        })
    }
    getUserDetails=(userId)=>{
        db.collection("users").where('email_id','==',userId).get().then((snapShot)=>{
            snapShot.forEach((doc)=>{this.setState({
                userName:doc.data().first_name+' '+doc.data().last_name
            })})
        })
    }
    componentDidMount(){
        this.getUserDetails(this.state.userId)
        this.getReceiverDetails()
    }
    render(){
        return(
<View style={styles.container}>
    <View style={{flex:0.1}}>
        <Header leftComponent={<Icon name='arrow-left'type='feather'color='#696969'onPress={()=>{this.props.navigation.goBack()}}></Icon>}
        centerComponent={{text:'donateBooks',style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}backgroundColor='#EAF8FE'
        >
        </Header>
    </View>
    <View style={{flex:0.3}}>
        <Card title={'bookInformation'}titleStyle={{fontSize:20}}>
            <Card>
        <Text style={{fontWeight:'bold'}}>Name:{this.state.bookName}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>reason:{this.state.reasonForRequesting}</Text>
            </Card>
        </Card>
    </View>
    <View style={{flex:0.3}}>
    <Card title={'ReceiverInformation'}titleStyle={{fontSize:20}}>
            <Card>
        <Text style={{fontWeight:'bold'}}>Name:{this.state.receiverName}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>contact:{this.state.receiverContact}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>address:{this.state.receiveraddress}</Text>
            </Card>
        </Card>
    </View>
    <View style={styles.buttonContainer}>
        {
            this.state.receiverId!==this.state.userId ?(
                <TouchableOpacity style={styles.button}onPress={()=>{this.updateBookStatus()
                    this.addNotification();
                this.props.navigation.navigate('MyDonations')}}>
                    <Text>I Want To Donate</Text>
                </TouchableOpacity>
            ):null
        }
    </View>
</View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF5722',
        shadowColor:'#000',
        shadowOffset:{width:0,height:8},
borderRadius:10,
elevation:60
    }
})




