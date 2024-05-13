import React from 'react';
import { Layout, theme } from 'antd';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {root} from "../../router/root"
import {UserOutlined, LogoutOutlined, SettingOutlined} from '@ant-design/icons'
import { useState } from 'react';
import { removeCookies } from '../../utils/cocies';


const { Header, Content, Footer, Sider } = Layout;
const App: React.FC = () => {
  function gotoLogin(){
    removeCookies('token')
    navigate('/')
  }
  const navigate = useNavigate()
  const [user, setUser] = useState(false)
  const {pathname} = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='w-full h-screen'>
      <Sider
        width={300}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <img src="https://astoriapastryshop.com/wp-content/uploads/2023/03/cropped-Astoria-Logo-New.png" alt="" />
        <div className='flex flex-col p-[40px] gap-[40px]'>
          {root.map((e,i) => {
            return ( <NavLink key={i} to={e.path} className={pathname == e.path ? "text-white font-bold text-[28px] " : 'text-[#ffffff7a] font-semibold text-[28px]'}>{e.icon} {e.name}</NavLink>)})}
        </div>
      </Sider>
      <Layout style={{height: '100%'}}>
        <Header style={{ padding: 0, background: colorBgContainer, height: 80, position: 'relative'}}>
          <div className='flex justify-end pr-[50px] items-center h-[100%]'>
            <button onClick={_ => setUser(!user)} className='text-[30px] bg-[#001529] w-[60px] h-[60px] rounded-[50%] text-[white]'>
                <UserOutlined />
            </button>
          </div>
          {user && 
            <ul className='absolute z-10 top-[75px] right-[50px] bg-[#001529] w-[200px] h-[120px] border rounded-[20px] p-[20px]'>
              <p onClick={_ => setUser(false)} className='text-[white] text-[20px] font-semibold cursor-pointer h-[0px] mb-8 mt-5 flex items-center gap-3'><SettingOutlined />My Accaunt</p>
              <p onClick={_ => gotoLogin()} className='text-[white] text-[20px] font-semibold cursor-pointer h-[0px] flex items-center gap-3'><LogoutOutlined /> Log Out</p>
            </ul>}
        </Header>
        <div className=' mx-auto w-[1560px] h-[100%] pb-[50px]'>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div
              style={{
                height: '100% ',
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet/>
            </div>
          </Content>
        </div>
        <Footer style={{ textAlign: 'center', background: colorBgContainer}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;