import React from 'react';
import PropType from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href='/'><a>SSB BLOG</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원 가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row>
        {/* <Col xs={24} md={6}>
          
        </Col>
          {children}
        <Col xs={24} md={6}/>
        <Col xs={24} md={6}/> */}
      </Row>
      
    </div>
    
  )
};

AppLayout.prototype = {
  children: PropType.node.isRequired,
}

export default AppLayout;