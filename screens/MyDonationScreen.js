import React, { Component } from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {Card,Header,Icon, ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
import { FlatList } from 'react-native-gesture-handler'

export default class MyDonationScreen extends Component{
    constructor(){
        super()
        this.state= {
            donorId:firebase.auth().currentUser.email,
            donorName:'',
            allDonations:[]
        }
        this.requestref = null
    }
    static navigationOptions = {header:null}
    getDonorDetails = (donorId)=>{
        db.collection("users").where("email_id","==",donorId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                this.setState({
                    'donorName':doc.data().first_name+' '+doc.data().last_name
                })
            })
        })
    }
    getAllDonations=()=>{
        this.requestref=db.collection("all_donations").where('donor_Id','==',this.state.donorId).onSnapshot((snapShot)=>{
            var allDonations = []
            snapShot.docs.map((doc)=>{
                var donation = doc.data()
                donation['doc_id']=doc.id
                allDonations.push(donation)
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.request_status==='Book Sent'){
            var requeststatus = 'donor interested'
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                'request_status':'donor interested'
            })
            this.sendNotification(bookDetails,requeststatus)
        }
        else{
            var requeststatus ='Book Sent'
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                'request_status':'Book Sent'
            })
            this.sendNotification(bookDetails,requeststatus)
        }
    }
    sendNotification=(bookDetails,requeststatus)=>{
        var requestid = bookDetails.request_id
        var donorId = bookDetails.donor_id
        db.collection("all_notifications").where("request_id",'==',requestid).where("donor_id",'==',donorId).get().then((snapShot)=>{
            snapShot.forEach((doc)=>{var message = ''
        if(requeststatus = 'Book Sent'){
            message = this.state.donorName+'Sent You The Book'
        }
        else{message = this.state.donorName+'Has Shown Interest In Donating The Book'}
        db.collection("all_notifications").doc(doc.id).update({
            'message':message,
            'notification_status':'unread',
            'date':firebase.firestore.FieldValue.serverTimestamp()
        })
        })
        })
    }
    keyExtractor=(item,index)=>{index.toString()}
    renderitem = ({item,i})=>{
        <ListItem key={i}
        title={item.book_name}subtitle={'requested by:'+item.requested_by+'\nstatus:'+item.request_status}
        titleStyle={{color:'black',fontWeight:'bold'}}leftElement={<Icon name="book" type='font_awesome'color='#696969'></Icon>}
        rightElement={
            <TouchableOpacity style={[styles.button,{backgroundColor:item.request_status==='Book Sent'?'green':'#FF5722'}]}onPress={()=>{this.sendBook(item)}}>
                <Text style={{color:'#FFFF'}}>{item.request_status==='Book Sent'?'Book Sent':'Send Book'}</Text>
            </TouchableOpacity>
        }bottomDivider
        ></ListItem>
    }
    componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations
    }
    componentWillUnmount(){
        this.requestref();
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation}title={'My Donations'}> </MyHeader>
                <View style={{flex:1}}>
                    {
                        this.state.allDonations.length===0?(<View style={{flex:1,justifyContent:'center',alignItems:'center',fontsize:20}}>
                            <Text style={{fontSize:20}}>List Of All Book Donations</Text>
                        </View>):(
                            <FlatList keyExtractor={this.keyExtractor}data={this.state.allDonations}renderItem={this.renderItem}></FlatList>
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width:0,height:8},
borderRadius:10,
elevation:16
    }
})