import React,{Component} from 'react'
import {Header} from 'react-native-elements'
import {Text,View,StyleSheet,Alert} from 'react-native'

const MyHeader = props=>{
    return(
        <Header backgroudColor="#EAF8FE"centerComponent={{text:props.title,style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}></Header>
    )
}
export default MyHeader;