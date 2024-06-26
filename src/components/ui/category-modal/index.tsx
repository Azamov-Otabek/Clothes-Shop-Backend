import { ModalForm, ProForm,ProFormText} from '@ant-design/pro-components';
import { Button} from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default (props:any) => {
  function handleFormChange(e:any){
    if(props.text == 'add'){
      props.postData(e)
    }else{
      e.category_id = props.item
      props.text(e)
    }
  }


  return (
    <ModalForm<{
      category_name: string;  
    }>
      title="ASTORIA"
      trigger={
        <Button type="primary" className='flex items-center text-[16px] font-semibold'> {props.text == 'add' ?  `${props.title} qoshish`: "Update" }</Button>   
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
          name="category_name"
          label="Categoriya nomini kiriting"
          placeholder="Futbolkalar"
          initialValue={props.value?.category_name}
          rules={[{
            required: true,
            message: 'Categoriya nomini kiriting',
          }]}
          
        />
      </ProForm.Group>
    </ModalForm>
  );
};