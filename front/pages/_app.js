import { Component } from "react";
import PropType from 'prop-types';
import 'antd/dist/antd.css'

const App = ({ Component }) => {
  return (
    <>
      <div>hi</div>
      <Component/>
    </>
  )
}

App.prototype = {
  Component: PropType.elementType.isRequired,
}

export default App;