import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../application/home';
import Recommend from '../application/Recommend';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,     // exact是Route的一个属性，认为其是一种严格匹配模式
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
    ]
  }
]