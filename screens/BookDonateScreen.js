import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert,ScrollView,Modal,FlatList} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
import {ListItem} from 'react-native-elements'

export default class BookDonateScreen extends React.Component{
constructor(){
    super()
    this.state={
        requestedBooksList:[],
    }
    this.requestref=null
}
getRequestedBooksList=()=>{
    this.requestref=db.collection("requested_books")
    .onSnapshot((snapshot)=>{
        var requestedBooksList = snapshot.docs.map(document=>document.data())
        this.setState({
            requestedBooksList:requestedBooksList
        })
    })
}
componentDidMount(){
    this.getRequestedBooksList()
}
componentWillUnmount(){
    this.requestref();
}
keyExtractor = (item,index)=>{index.toString()}
renderItem = ({item,i})=>{
    return(
        <ListItem key = {i}title={item.book_name}subtitle={item.reason_to_request}titleStyle={{color:'black',fontWeight:'bold'}}rightElement={<TouchableOpacity style={styles.button}>
            <Text style={{color:'#FFFF'}}>View</Text>
        </TouchableOpacity>}bottomDivider></ListItem>
    )
}
render(){
    return(
        <View style={{flex:1}}>
            <MyHeader title='Donate Books'navigation={this.props.navigation}></MyHeader>
            <View style={{flex:1}}>
                {
                    this.state.requestedBooksList.length===0?(<View style={styles.subcontainer}>
                        <Text style={{fontSize:20}}>List Of All Requested Books</Text>
                    </View>):(<FlatList keyExtractor={this.keyExtractor}data={this.state.requestedBooksList}renderItem={this.renderItem}></FlatList>)
                }
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
    subcontainer:{
        flex:1,
        fontSize:20,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF5722',
        shadowColor:'#000',
        shadowOffset:{width:0,height:8}
    }
})