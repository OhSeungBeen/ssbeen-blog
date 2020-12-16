import { Component } from "react";
import PropType from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8'/>
        <title>SSB BLOG</title>
      </Head>
      
      <Component/>
    </>
  )
}

App.prototype = {
  Component: PropType.elementType.isRequired,
}

export default App;