import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
// import square1 from '../../../assets/png/square1.png';
// import square2 from '../../../assets/png/square2.png';
// import square3 from '../../../assets/png/square3.png';
// import square4 from '../../../assets/png/square4.png';
// import helper1 from '../../../assets/png/helper1.png';
// import helper2 from '../../../assets/png/helper2.png';
// import home1 from '../../../assets/png/home1.png';
// import home2 from '../../../assets/png/home2.png';
// import free1 from '../../../assets/png/free1.png';
// import free2 from '../../../assets/png/free2.png';
// import detail from '../../../assets/png/detail.png';
// import search from '../../../assets/png/search.png';

const square1 = "http://kestackoss.muxixyz.com/guidance/square1.png"
const square2 = "http://kestackoss.muxixyz.com/guidance/square2.png"
const square3 = "http://kestackoss.muxixyz.com/guidance/square3.png"
const square4 = "http://kestackoss.muxixyz.com/guidance/square4.png"
const helper1 = "http://kestackoss.muxixyz.com/guidance/helper1.png"
const helper2 = "http://kestackoss.muxixyz.com/guidance/helper2.png"
const home1 = "http://kestackoss.muxixyz.com/guidance/home1.png"
const home2 = "http://kestackoss.muxixyz.com/guidance/home2.png"
const free1 = "http://kestackoss.muxixyz.com/guidance/free1.png"
const free2 = "http://kestackoss.muxixyz.com/guidance/free2.png"
const detail = "http://kestackoss.muxixyz.com/guidance/detail.png"
const search = "http://kestackoss.muxixyz.com/guidance/search.png"




export default class MxGuide extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      show: true,
      height: 1,
      width: 1
    };
  }
  onClick() {
    this.setState({
      show: false
    });
  }
  render() {
    const { type } = this.props;
    const map = new Map([
      ['square1', square1],
      ['square2', square2],
      ['square3', square3],
      ['square4', square4],
      ['helper1', helper1],
      ['helper2', helper2],
      ['home1', home1],
      ['home2', home2],
      ['free1', free1],
      ['free2', free2],
      ['search', search],
      ['detail', detail]
    ]);
    const res = Taro.getSystemInfoSync();
    // this.setState({
    //   height: res.windowHeight,
    //   width: res.windowWidth
    // });
    const root = {
      height: res.windowHeight + 'px',
      width: res.windowWidth + 'px'
    };
    const show = this.state.show;
    return (
      show && (
        <View className="guide" onClick={this.onClick.bind(this)}>
          <Image style={root} src={map.get(type)}></Image>
        </View>
      )
    );
  }
}
MxGuide.defaultProps = {
  onClick: () => {}
};
