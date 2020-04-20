import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './index.scss';
import MxRate from '../../components/common/MxRate/MxRate';
import MxIcon from '../../components/common/MxIcon';
import Fetch from '../../service/fetch';
import MxReport from '../../components/common/MxReport';
import MxLike from '../../components/page/MxLike/MxLike';
import Octodex from '../../assets/png/octodex.jpg';

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '评课广场',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 80
  };

  constructor() {
    super(...arguments);
    this.state = {
      comments: [],
      sum: 0,
      lastId: 0,
      bottomFlag: false
    };
  }

  onPullDownRefresh() {
    this.setState(
      {
        sum: 0,
        lastId: 0,
        bottomFlag: false
      },
      () => {
        Taro.showNavigationBarLoading();
        this.getComments();
      }
    );
  }

  onReachBottom() {
    Taro.showNavigationBarLoading();
    this.getComments();
  }

  getComments() {
    var that = this;
    let newComments = this.state.comments;
    Fetch(
      'api/v1/evaluation/',
      {
        limit: 4,
        last_id: this.state.lastId
      },
      'GET'
    ).then(data => {
      if (data.data.list != null) {
        if (this.state.lastId != 0) {
          newComments = newComments.concat(data.data.list);
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          that.setState({
            comments: newComments,
            sum: data.data.sum,
            lastId: data.data.list[data.data.sum - 1].id
          });
        } else {
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          that.setState({
            comments: data.data.list,
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
        this.setState({
          bottomFlag: true
        });
      }
    });
  }

  ChangeTosearch() {
    Taro.navigateTo({
      url: '/pages/search/index'
    });
  }

  ChangeTopost() {
    Taro.navigateTo({
      url: '/pages/postReview/index'
    });
  }

  ChangeTodetails(value) {
    Taro.navigateTo({
      url: `/pages/courseDetails/courseDetails?courseId=${value}`
    });
  }

  ChangeToCommentsDetails(value) {
    Taro.navigateTo({
      url: '/pages/courseCommentsDetails/courseCommentsDetails?id=' + value
    });
  }

  ChangeToReport(id) {
    console.log("id: " + id)
    // Fetch(`api/v1/evaluation/${id}/report/`, {}, 'POST').then(data => {
    //   if (data.data.fail === true) {
    //     if (data.data.reason === 'You have been reported this evaluation!') {
    //       Taro.showToast({
    //         title: '不要重复举报哟!',
    //         icon: 'none'
    //       });
    //     }
    //   } else {
    //     Taro.showToast({
    //       title: '举报成功！',
    //       icon: 'success'
    //     });
    //   }
    // });
  }

  componentDidShow() {
    this.setState(
      {
        bottomFlag: false,
        sum: 0,
        lastId: 0
      },
      () => {
        Taro.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
        Taro.showNavigationBarLoading();
        this.getComments();
      }
    );
  }

  // componentWillMount() {
  //
  // }

  normalTime(timestamp) {
    var date = new Date(timestamp * 1000); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':';
    var s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  render() {
    const { bottomFlag } = this.state;
    const content = (
      <View className="detailsBoxes">
        {this.state.comments.map(comment => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View className="detailsBox" >
              <View className="detailsCard">
                <View className="detailsWrapper">
                  <View className="detailsFirst">
                    <View>
                      {!comment.is_anonymous && (
                        <Image
                          src={comment.user_info.avatar}
                          className="detailsAvatar"
                        />
                      )}
                      {comment.is_anonymous && (
                        <Image src={Octodex} className="detailsAvatar" />
                      )}
                    </View>
                    <View className="detailsFirstInfo">
                      {!comment.is_anonymous && (
                        <View className="detailsFirstInfo1">
                          {comment.user_info.username}
                        </View>
                      )}
                      {comment.is_anonymous && (
                        <View className="detailsFirstInfo1">匿名用户</View>
                      )}
                      <View className="detailsFirstInfo2">
                        {this.normalTime(comment.time)}
                      </View>
                    </View>
                    <View className="detailsFirstIcon">
                      <MxReport
                        ID={comment.id}
                        // onClick={this.ChangeToReport.bind(this, comment.id)}
                      />
                    </View>
                  </View>
                  <View className="detailsSecond">
                    <View
                      className="detailsSecondInfo1"
                      onClick={this.ChangeTodetails.bind(
                        this,
                        comment.course_id
                      )}
                    >
                      #{comment.course_name}({comment.teacher})
                    </View>
                    <View className="detailsSecondInfo2">评价星级：</View>
                    <View className="detailsRate">
                      <MxRate value={comment.rate} />
                    </View>
                  </View>
                  <View className="detailsThird">
                    {comment.content != '' && (
                      <View
                        className="detailsThirdText"
                        onClick={this.ChangeToCommentsDetails.bind(
                          this,
                          comment.id
                        )}
                      >
                        {comment.content}
                      </View>
                    )}
                    {comment.content == '' && (
                      <View
                        className="detailsThirdText"
                        onClick={this.ChangeToCommentsDetails.bind(
                          this,
                          comment.id
                        )}
                      >
                        该用户没有评论
                      </View>
                    )}
                  </View>
                  <View className="detailsFourth">
                    <View className="detailsFourthIcon1">
                      <MxLike
                        theid={comment.id}
                        islike={comment.is_like}
                        likenum={comment.like_num}
                      />
                    </View>
                    <View
                      onClick={this.ChangeToCommentsDetails.bind(
                        this,
                        comment.id
                      )}
                    >
                      <MxIcon type="cmmtBtn" className="detailsFourthIcon2" />
                      <View>{comment.comment_num}</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View style="display: block">
        <View className="chooseBox">
          <View
            className="chooseSearchBack"
            onClick={this.ChangeTosearch.bind(this)}
          >
            <MxIcon
              type="search"
              className="chooseSearch"
              width="32px"
              height="32px"
            />
          </View>
          <View onClick={this.ChangeTopost.bind(this)}>
            <MxIcon type="add" className="chooseAdd" width="42px" />
          </View>
        </View>
        {content}
        {bottomFlag && <View className="bottomBox">到底啦！</View>}
      </View>
    );
  }
}
