import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './courseCommentsDetails.scss'

export default class Coursecommentsdetails extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='courseCommentsDetails'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
