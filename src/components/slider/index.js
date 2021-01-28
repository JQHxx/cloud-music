import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';

// 关于swiper
import 'swiper/dist/css/swiper.css';
import Swiper from "swiper";

function Slider(props) {
  // useState 通过在函数组件里调用它来给组件添加一些内部 state。
  // React 会在重复渲染时保留这个 state。
  // useState 会返回一对值：当前状态和一个让你更新它的函数，
  const [sliderSwiper, setSliderSwiper] = useState(null);  // [undefind, f()] 此处作用为置空
  const { bannerList } = props;  // 接收父级传过来的list参数
  // useEffect （副作用函数）是一个 Effect Hook，给函数组件增加了操作副作用
  // (在 React 组件中进行数据获取、订阅或者手动修改 DOM等)的能力
  // 你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可，
  // 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），
  // 可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，
  // 所以它永远都不需要重复执行。
  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
        let sliderSwiper = new Swiper(".slider-container", {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: { el: '.swiper-pagination' },
        });
        setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((slider, index) => {
              return (
                <div className="swiper-slide" key={index}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);