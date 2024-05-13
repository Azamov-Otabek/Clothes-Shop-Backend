import { LockOutlined,FacebookOutlined, UserOutlined, GoogleOutlined, GithubOutlined} from '@ant-design/icons';
import { LoginFormPage, ProConfigProvider, ProFormCheckbox,ProFormText,} from '@ant-design/pro-components';
import { Divider, Space, theme } from 'antd';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginlPasswordValidate, LoginEmailValidate } from '../../../utils/auth-validation';
import { authRequest } from '../../../service/auth'; 
import { ToastContainer, toast } from 'react-toastify';
import { Login } from '../../../interface/auth';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate()
  async function handleSubmit(e:Login){
    const response = await authRequest.Login(e)
    if(response.status == 200){
      toast.success('Tizimga kirish uchun ruxsat berildi', {autoClose: 1200})
      setTimeout(() => {
        if(response.data.role == 'admin' || response.data.role == 'worker'){
          navigate('/admin')
        }else if(response.data.role == 'user'){
          navigate('/user')
        }
      }, 1500);
    }
  }
  
  return (
    <>
    <ToastContainer/>
      <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        onFinish={handleSubmit}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        title='LOGIN'
        subTitle=" "
        submitter={{
          searchConfig: {
            submitText: 'Tizimga kirish', // Change the title of the submitting button here
          },
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Boshqa tarmoq orqali kirish
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <GoogleOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <GithubOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <FacebookOutlined style={{ ...iconStyles, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
      >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Emailingizni kiriting: '}
              rules={LoginEmailValidate}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Parolingizni kiriting: '}
              rules={LoginlPasswordValidate}
            />
          </>
        
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Eslab qolish
          </ProFormCheckbox>
          <Link to={'/register'} className=' float-right'>Ro'yhatdan o'tish</Link>
        </div>
      </LoginFormPage>
    </div>
    </>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};