import { PlusOutlined } from '@ant-design/icons';
import {LockOutlined} from '@ant-design/icons'
import { ModalForm, ProForm,ProFormText} from '@ant-design/pro-components';
import { Button, theme, Radio } from 'antd';
import { useState } from 'react';
import {UserNameValidation, UserEmailValidation, PasswordValidation, UserLastNameValidation, UserAgeValidation, UserPhoneValidation} from '../../../utils/user-create-validation'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default (props:any) => {
  const { token } = theme.useToken();  
  
  const [gender, setGender] = useState('male');
  const handleGenderChange = (e:any) => {
    setGender(e.target.value);
  };
  function handleFormChange(e:any){
    e.gender = gender
    props.postData(e)
  }


  return (
    <ModalForm<{
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      gender: string;
    }>
      title="ASTORIA"
      trigger={
        <Button type="primary" className='flex items-center text-[16px] font-semibold'>
          <PlusOutlined />
          User qo'shish
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        await waitTime(2000);
        handleFormChange(values)
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      submitter={{
        searchConfig: {
          submitText: 'Yaratish',
          resetText: 'Bekor qilish',
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          hasFeedback
          width="md"
          name="first_name"
          label="Ism kiriting"
          placeholder="John"
          rules={UserNameValidation}
        />

        <ProFormText
          hasFeedback
          width="md"
          name="last_name"
          label="Familya kiriting"
          placeholder="Doe"
          rules={UserLastNameValidation}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          hasFeedback
          width="md"
          name="email"
          label="Email kiriting"
          placeholder="JohnDoe@gmail.com"
          rules={UserEmailValidation}
        />
       <ProFormText.Password
              width="md"
              hasFeedback
              name="password"
              label="Password kiriting"
              rules={PasswordValidation}
              fieldProps={{
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
            />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
        width="md"
        hasFeedback
        name="age"
        label="Yosh kiriting"
        placeholder="30"
        rules={UserAgeValidation}
      />
      <ProFormText
          hasFeedback
        width="md"
        name="phone"
        label="Telefon raqam kiriting"
        placeholder="9989XXXXXXXX"
        rules={UserPhoneValidation}

      />
      </ProForm.Group>
      <Radio.Group  onChange={handleGenderChange} value={gender}>
        <Radio value="male">Erkak</Radio>
        <Radio value="female">Ayol</Radio>
    </Radio.Group>
    </ModalForm>
  );
};