import React, { useEffect } from 'react';
import Slider from '../../components/slider/index';
import RecommendList from '../../components/list/index';
import { Content } from './style';
import Scroll from '../../components/scroll/scroll.js';
// 连接redux
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
// 关于图片懒加载
import { forceCheck } from 'react-lazyload';
// 加载动画
import Loading from '../../components/loading/loading';

function Recommend(props) {
  // 这里的函数是在下面将redux的函数暴露出来的
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  const { bannerList, recommendList } = props;
  const { enterLoading } = props;
  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    // getBannerDataDispatch();
    // getRecommendListDataDispatch();
  }, []); // 仅在初始化的时候加载
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <Content>
      {enterLoading ? <Loading></Loading> : null}
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  // redus中使用set和get存取数据
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
