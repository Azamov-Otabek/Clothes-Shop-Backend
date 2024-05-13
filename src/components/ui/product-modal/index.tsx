import { ModalForm, ProForm,ProFormSelect,ProFormText} from '@ant-design/pro-components';
import { Button, Radio, Select } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



export default (props:any) => { 
  const [gender, setGender] = useState('male');
  const [category, setCategory] = useState('');
  const [made, setmade] = useState('');
  const handleGenderChange = (e:any) => {
    setGender(e.target.value);
  };
  function handleFormChange(e:any){
    console.log(e);
  }


  return (
    <ModalForm<{
        age_max: string
        age_min: string
        color: string
        cost: string
        count: string
        description:  string
        discount:  string
        product_name: string
        size: string
    }>
      title="ASTORIA"
      trigger={
        <Button type="primary" className='flex items-center text-[16px] font-semibold'> {props.text == 'add' ?  `${props.title} qoshish`: "Update" }</Button>   
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        handleFormChange(values)
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => ''
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
          name="age_max"
          label="Max age kiriting"
          placeholder="40"
          rules={[
            {
              required: true,
              message: 'Max age kiriting',
            }
          ]}
          
        />

        <ProFormText
          hasFeedback
          width="md"
          name="age_min"
          label="Min age kiriting"
          placeholder="15"
          rules={[
            {
              required: true,
              message: 'Min age kiriting',
            }
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          hasFeedback
          width="md"
          name="color"
          label="Rangini kiriting"
          placeholder="Sariq"
          rules={[
            {
              required: true,
              message: 'Rangini kiriting',
            }
          ]}
        />
       <ProFormText
              width="md"
              hasFeedback
              name="cost"
              label="Narxini kiriting"
              rules={[
                {
                  required: true,
                  message: 'Narxini kiriting',
                }
              ]}
              placeholder={'12000'}
            />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
        width="md"
        hasFeedback
        name="count"
        label="Sonini kiriting"
        placeholder="30"
        rules={[{
          required: true,
          message: 'Sonini kiriting',
        }]}
      />
      <ProFormText
        hasFeedback
        width="md"
        name="description"
        label="Product description kiriting" 
        placeholder="...."
        rules={[{
          required: true,
          message: 'Product description kiriting',
        }]}

      />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
        width="md"
        hasFeedback
        name="discount"
        label="Chegirma narxini kiriting"
        placeholder="25"
        rules={[{
          required: true,
          message: 'Chegirma narxini kiriting',
        }]}
      />
      <ProFormText
        hasFeedback
        width="md"
        name="product_name"
        label="Product nomini kiriting" 
        placeholder="Xudi"
        rules={[{
          required: true,
          message: 'Product nomini kiriting',
        }]}

      />
      </ProForm.Group>
      <ProFormText
        width="md"
        hasFeedback
        name="size"
        label="Product o'lchamini kiriting "
        placeholder="25"
        rules={[{
          required: true,
          message: 'Product o\'lchamini kiriting',
        }]}
      />
       <ProForm.Group>
        <Select
          showSearch
          onSelect={(e) => setCategory(e.target)}
          style={{ width: 200 }}
          placeholder="Categoriya tanlang"
          optionFilterProp="children"
          options={props.datas.map((item:any) => {
            return {
              value: item.category_id,
              label: item.category_name,
            };
          })}
        />
         <Select
          showSearch
          onSelect={(e) => setmade(e.target)}
          style={{ width: 200 }}
          placeholder="Davlat tanlang"
          optionFilterProp="children"
          options={[{
            value: 'UZB',
            label: 'UZB',
          },
          {
            value: 'RUS',
            label: 'RUS',
          },
          {
            value: 'KAZ',
            label: 'KAZ',
          }
        ]}
        />
            
       </ProForm.Group>
      <Radio.Group  onChange={handleGenderChange} value={gender}>
        <Radio value="male">Erkak</Radio>
        <Radio value="female">Ayol</Radio>
    </Radio.Group>
    </ModalForm>
  );
};