import { ModalForm, ProForm,ProFormText, ProFormTextArea} from '@ant-design/pro-components';
import { Button, Radio, Select } from 'antd';
import { useState } from 'react';
import { Input } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const { TextArea } = Input;



export default (props:any) => { 
  const [gender, setGender] = useState('male');
  const [category, setCategory] = useState('');
  const [made, setmade] = useState('');
  const handleGenderChange = (e:any) => {
    setGender(e.target.value);
  };
  function handleFormChange(e:any){
      e.category_id = category
      e.made_in = made
      e.cost = +e.cost
      e.count = +e.count
      e.size = +e.size
      e.age_max = +e.age_max
      e.age_min = +e.age_min
      e.discount = +e.discount
      e.for_gender = gender
    if(props.text == "add"){
      props.postData(e)
    }else{
      props.postData(e)
    }
  }


  return (
    <ModalForm<{
        age_max: number
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
        <Button type="primary" className='flex items-center text-[16px] font-semibold'> {props.text == 'add' ?  `${props.title}`: "Update" }</Button>   
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        await waitTime(2000);
        handleFormChange(values)
        return true
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
          initialValue={props.title == 'Update' && props.text['age_max'] || ''}
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
          initialValue={props.title == 'Update' && props.text['age_min'] || ''}
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
          initialValue={props.title == 'Update' && props.text['color'] || ''}
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
              initialValue={props.title == 'Update' && props.text['cost'] || ''}
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
        initialValue={props.title == 'Update' && props.text['count'] || ''}
        rules={[{
          required: true,
          message: 'Sonini kiriting',
        }]}
      />
       <ProFormText
        width="md"
        hasFeedback
        name="size"
        label="Product o'lchamini kiriting "
        initialValue={props.title == 'Update' && props.text['size'] || ''}
        placeholder="25"
        rules={[{
          required: true,
          message: 'Product o\'lchamini kiriting',
        }]}
      />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
        width="md"
        hasFeedback
        name="discount"
        label="Chegirma narxini kiriting"
        initialValue={props.title == 'Update' && props.text['discount'] || ''}
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
        initialValue={props.title == 'Update' && props.text['product_name'] || ''}
        rules={[{
          required: true,
          message: 'Product nomini kiriting',
        }]}

      />
      </ProForm.Group>
      <ProFormTextArea
        name="description"
        label="Description"
        placeholder="Please enter your description"
        rules={[{ required: true, message: 'Description kiriting!' }]}
        initialValue={props.title == 'Update' && props.text['description'] || ''}
        hasFeedback
      />
       <ProForm.Group>
        <Select
          showSearch
          onSelect={(e) => setCategory(e)}
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
          onSelect={(e) => setmade(e)}
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