import React, { useEffect } from 'react';
// 使用scroll组件
import Scroll from '../scroll/scroll';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Horizen(props) {
  const { list, oldVal, title } = props;
  const { handleClick } = props;
  return (
    // 暂时省略
    <div></div>
  );
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};
export default memo(Horizen);
