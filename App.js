import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import Rebot from './Rebot.json'

import Web3 from 'web3'

export default function App() {

  const [input, setinput] = useState('')
  
  const [txt, settxt] = useState('')

  const [rebotContract, setContract] = useState()

  //load ether
  useEffect(() => {
    async function load () {
    const web3 = new Web3('https://ropsten.infura.io/v3/a9464a6968ab4a509cefe50f66baa7f9')
    const contract = new web3.eth.Contract(Rebot.abi, '0xc5F13aE40e06114eDe1d250D526838Cc7D2E85D4')
    const account = await web3.eth.getBlockNumber()
    console.log(account)
    setContract(contract)
    }
    load()
  }, [])

  const xd = async () => {
    const data = await rebotContract.methods.str(input).call()

    settxt(data)
  }



  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setinput(text)}
        value={input}
      />
      <Button title="PRESS" onPress={xd}/>
      <Text>
        {txt}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
