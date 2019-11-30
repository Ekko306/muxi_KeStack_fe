import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import './index.scss'
import MxCard from '../../components/common/MxCard'
import MxRate from '../../components/common/MxRate/MxRate'
import MxIcon from '../../components/common/MxIcon'
import octodex from '../../assets/png/octodex.jpg'
import MxInput from '../../components/common/MxInput/MxInput'
import {MxFab} from '../../components/common/MxFab/index'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '选课助手',
  }

  constructor() {
    super(...arguments);
    this.state = {
      value:5,
      datas: [
        {
          text: '马克思主义基本原理',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)',
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)',
        },
        {
          text: '线性代数B',
          teacher: '张俊',
          num: '2019347817462',
          people: '23',
          time: '周二7~8；周四5~6',
          address: '7203(东区)',
        },
       
      ]
    };
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  ChangeTodetails() {
    Taro.navigateTo({
        url: '/pages/courseDetails/courseDetails'
    });
  }


  ChangeTofree() {
    Taro.navigateTo({
        url: '/pages/freeCourse/index'
    });
}
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const content = (
      <View className='detailsBoxes'>
      <View
        className='muxi-fab'
        onClick={this.ChangeTofree.bind(this)}
      >
        排课
      </View>
        {
          this.state.datas.map((data) => {
            return (
              <View className='detailsBox'>
                <View className='mx-card' onClick={this.ChangeTodetails.bind(this)}>
  
        <View className='info'>
        <View className='user-info'>
            <View className='class'>{data.text}</View>
            <View className='teacher'>{data.teacher}</View>
            <View className='num'>{data.num}</View>
        </View>
        <View className='ta'> 
          <View className='time'>
              <Text>{data.time}</Text>
          </View>
          <View className='address'>
              <Text>{data.address}</Text>
          </View>
        </View>
        </View>
        </View>
      </View>
            )
          })
        }
      </View>
    )

    return (
      <View style='display: block'>
        <View className='chooseBox'>
          <View className='search'>
          <MxInput
          leftSrc='../../../assets/svg/searchicon.svg'leftSize='20px' width='670rpx' height='72rpx' background='rgba(241,240,245,1)'
          radius='36rpx'
          > 
          </MxInput>
          </View>
        </View>
        {content}
      </View>
    )
  }
}