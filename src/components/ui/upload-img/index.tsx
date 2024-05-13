import { ZusMedia } from '@store';
import { useStore } from 'zustand';

const ImageUploadForm = (props:any) => {

  const handleImageChange = async (event:any) => {
    const file = event.target.files[0];
    const payload = {
      upload_photo: file,
      id: props.id,
    }
    postMedia(payload)
  };

  const {postMedia}:any = useStore(ZusMedia)


  return (
    <div className='relative'>
      <input className="relative z-10 opacity-0" type="file" accept="image/*" onChange={handleImageChange} />
      <button className='bg-[#151341] rounded-md text-white font-bold w-[257px] absolute top-[-5px] py-[8px]'>Upload</button>
    </div>
  );
};

export default ImageUploadForm;
