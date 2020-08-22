import React, { isValidElement } from 'react'
import {Text,View,StyleSheet,TouchableOpacity,FlatList, TouchableNativeFeedbackBase} from 'react-native'
import {Card,Header,Icon,ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationref=null
    }
   getNotification = ()=>{
       this.notificationref = db.collection("all_notifications").where('notification_status','==','unread').where('targeted_user_id','==',this.state.userId).onSnapshot((snapShot)=>{
           var allNotifications = []
           snapShot.docs.map((doc)=>{
               var notification = doc.data()
               notification['doc_id']=doc.id
               allNotifications.push(notification)
           })
           this.setState({
               allNotifications:allNotifications
           })
       })
   }
   componentDidMount(){
this.getNotification()
   }
   componentWillUnmount(){
       this.notificationref()
   }
   keyExtractor=(item,index)=>index.toString()
   renderItem = ({item,index})=>{
       return(
           <ListItem key={index}leftElement={<Icon name='Book'type='font-awesome'color='#696969'></Icon>}title={item.book_name}titleStyle={{color:'black',fontWeight:'bold'}}subtitle={item.message}bottomDivider></ListItem>
       )
   }
   render(){
       return(
           <View style={{flex:1}}>
               <View style={{flex:0.1}}>
                   <MyHeader title='Notifications'navigation={this.props.navigation}></MyHeader>
               </View>
               <View styel={{flex:0.9}}>
                   {this.state.allNotifications.length===0?(
                       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                           <Text>You Have No Notifications</Text>
                       </View>
                   ):(
                       <FlatList keyExtractor={this.keyExtractor}data={this.state.allNotifications}renderItem={this.renderItem}></FlatList>
                   )}
               </View>
           </View>
       )
   }
}