import Taro, { Component } from '@tarojs/taro';
import { View, MovableArea, MovableView } from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import Fetch from '../../service/fetch';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '选课清单',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };

  constructor() {
    super(...arguments);
    this.state = {
      lastTempLists: [],
      Lists: [],
      // eslint-disable-next-line react/no-unused-state
      sum: 0,
      lastId: 0,
      lastTempId: 0
    };
  }
  state = {
    // eslint-disable-next-line react/no-unused-state
    animation: '',

    // eslint-disable-next-line react/no-unused-state
    startX: 0, //开始坐标
    // eslint-disable-next-line react/no-unused-state
    startY: 0
  };

  handleClick() {}

  getLists() {

    let newLists = this.state.Lists;
    console.log(this.state.lastId)
    Fetch(
      'api/v1/collection',
      {
        limit: 4,
        last_id: this.state.lastId
      },
      'GET'
    ).then(data => {
      console.log(data)
      if (data.data.list != null) {  //判断是否没有数据了
        if (this.state.lastId != 0) {  //之后增加数据
          console.log(data.data.list+ '新列表')
          newLists = newLists.concat(data.data.list);
          console.log(newLists)
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          this.setState({
            Lists: newLists,
            // eslint-disable-next-line react/no-unused-state
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum - 1].id
          });
        } else {   //第一次拉取数据
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          this.setState({
            Lists: data.data.list,
            // eslint-disable-next-line react/no-unused-state
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum - 1].id
          });
        }
      } else {
        Taro.showToast({
          title: '到底啦！',
          duration: 2000
        });
        Taro.stopPullDownRefresh();
        Taro.hideNavigationBarLoading();
      }
    });
  }


  getListsAfterFavor(index) {
    console.log('index为' + index)
    let newLists = this.state.Lists
    newLists.splice(index,1)
    console.log('当前要删除id' + newLists[0])
    console.log('当前要删除id' + newLists[1])
    console.log('当前要删除id' + newLists[2])
    console.log('当前要删除id' + newLists[3])
    this.setState({
      Lists: newLists
    })
  }

  onPullDownRefresh() {
    this.setState(
      {
        // eslint-disable-next-line react/no-unused-state
        sum: 0,
        lastId: 0
      },
      () => {
        Taro.showNavigationBarLoading();
        this.getLists();
      }
    );
  }

  onReachBottom() {
    Taro.showNavigationBarLoading();
    this.getLists();
  }

  componentWillMount() {
    this.getLists();
  }
  // 滑动开始
  touchstart(e) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      startX: e.changedTouches[0].clientX,
      // eslint-disable-next-line react/no-unused-state
      startY: e.changedTouches[0].clientY
    });
  }

  //滑动事件处理 _index当前索引
  touchmove(e) {
    var that = this;

    var startX = that.state.startX; //开始X坐标
    var startY = that.state.startY; //开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    // var isLeft = _class.indexOf("leftMove") != -1; //往左滑的位置
    // var isRight = _class.indexOf("rightMove") != -1;//往右滑的位置
    //获取滑动角度
    var angle = that.angle(
      { X: startX, Y: startY },
      { X: touchMoveX, Y: touchMoveY }
    );
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    //右滑
    if (touchMoveX > startX) {
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
      });

      _animation.translateX(0).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    } else if (touchMoveX - startX < -10) {
      //左滑
      //实例化一个动画
      let _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
      });
      _animation.translateX(-80).step();
      that.setState({
        //输出动画
        animation: _animation.export()
      });
    }
  }

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  }

  componentDidMount() {
    let animation = Taro.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
    });

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      animation: animation
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  collect(thisIndex, course_id) {
    // "2e154de56gyubdq" 高等程序语言设计
    // "0s9uighvg121efe" java程序语言设计
    //"28yy89dqube12d8"   面向对象程序设计
    // "723fguib98y2e1h"  python程序语言设计
    let id = course_id
    Fetch(
      `api/v1/course/using/${id}/favorite`,
      {
        like_state: true
      },
      'PUT'
    ).then(res => {
      switch (res.code) {
        case 0:
          // eslint-disable-next-line no-undef
          Taro.showToast({
            title: '取消收藏成功！',
            icon: 'success',
          })
          console.log("当前index"+thisIndex)
            this.getListsAfterFavor(thisIndex)
          break;
        case 20302:
          // eslint-disable-next-line no-undef
          Taro.showToast({
            title: '取消收藏失败!'
          })
          break;
      }
    });
  }
  render() {
    // let status = null;
    // if (noCollect) {
    //   // eslint-disable-next-line react/jsx-no-undef
    //   status = <Text>已取消收藏</Text>;
    // } else {
    //   // eslint-disable-next-line react/jsx-no-undef
    //   status = <Text>取消收藏</Text>;
    // }
    const content = (
      <View className="detailsBoxes">
        {this.state.Lists.map((data,index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="mx-card">
              <MovableArea className="cardm">
                <MovableView
                  damping="100"
                  out-of-bounds="true"
                  direction="horizontal"
                  className="card"
                  onTouchStart={this.touchstart.bind(this)}
                  onTouchEnd={this.touchmove.bind(this)}
                  animation={this.state.animation}
                >
                  <View className="detailsLeft">
                    <View>{data.course_name}</View>
                    <View style="display: block">{data.teacher}</View>
                  </View>
                  <View className="detailsRight">
                    <View>
                      <MxRate comment={false} value={data.rate}></MxRate>
                      <View>评价人数：{data.evaluation_num}</View>
                    </View>
                    <View className="detailsRightDown">
                      <View style="display:block">
                        <View className="detailsText">{data.tags[0]}</View>
                        <View className="detailsText">{data.tags[1]}</View>
                      </View>
                      <View style="display:block">
                        <View className="detailsText">{data.tags[2]}</View>
                        <View className="detailsText">{data.tags[3]}</View>
                      </View>
                    </View>
                  </View>
                </MovableView>
              </MovableArea>
              <View className="itemDelete right" onClick={this.collect.bind(this,index,data.course_id)}>
                <Text>取消收藏</Text>
              </View>
            </View>
          );
        })}
      </View>
    );

    return <View style="display:block">{content}</View>;
  }
}
