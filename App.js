import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import { ethers } from 'ethers'

export default function App() {

  const [input, setinput] = useState('')
  
  const [txt, settxt] = useState('')

  const [rebotContract, setContract] = useState()

  //load ether
  useEffect(() => {
    async function load () {
    let wallet = ethers.Wallet.fromMnemonic('sea peace bike clock whip caution fiber wrist force pair disease release')
    const provider = new ethers.getDefaultProvider('ropsten')
    wallet = wallet.connect(provider)

    const ABI = [
      'function nmb(uint8 _nr) public',
      'function str(string memory _string) public view returns(string memory)'
    ]
    const contract = new ethers.Contract('0xc5F13aE40e06114eDe1d250D526838Cc7D2E85D4',
                                          ABI,
                                          provider)

    setContract(contract)
    }
    load()
  }, [])

  const xd = async () => {
    const data = await rebotContract.str(input)

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
