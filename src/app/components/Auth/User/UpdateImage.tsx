import axios from 'axios';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

interface UpdateImageProps {
    ImageSource: string,
    UserId: string,
    GetUser: Function,
}
export default function UpdateImage({ ImageSource, UserId, GetUser }: UpdateImageProps) {
    const [ImageSrc, SetImageSrc] = useState<string | any>(ImageSource)
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

    const fileInputRef = useRef<any>(null);


    async function handleClick() {
        if (fileInputRef.current)
            fileInputRef.current.click();
    }

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setIsFileSelected(!isFileSelected)
            const reader = new FileReader()
            const ProfilePic: any = event.target.files?.[0];
            reader.readAsDataURL(ProfilePic)
            reader.onload = () => {
                if (ImageSrc !== reader.result) {
                    SetImageSrc(reader.result)
                }
                else
                    toast.error("Current Image & PreviousImages are same")
            }
        } catch (error) {
            console.log(error);
        }

    };

    async function SubmitImage() {
        try {
            const File: string = JSON.stringify({
                ProfilePicture: ImageSrc
            });
            const response = await axios.patch(`/api/User/Update/ProfilePicture?UserId=${UserId}`, File)
            if (response.status === 200)
                toast.success(response.data.message)

            GetUser()
        } catch (error: any) {
            if (error.response.status === 500 || error.response.status === 422 || error.response.status === 404)
                toast.error(error.response.data.message)
            else
                toast.error("Failed to Add Image")
        }
    }
    return (
        <div className='flex items-center flex-col space-y-5 mb-10'>
            <div>
                <Image width={120} draggable='false' onContextMenu={(event: React.MouseEvent) => event.preventDefault()} height={120} className='w-72 h-72 rounded-full' src={ImageSrc} alt='UserProfile' />
            </div>

            <div className='flex justify-end items-center  w-full p-3'>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={handleFileChange}
                    id="file-input" // Add an ID for the label association
                />

                {isFileSelected && isFileSelected ?
                    (
                        <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={SubmitImage} >Save Photo</button>
                    ) :
                    (
                        <label htmlFor="file-input">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type='button' onClick={handleClick}>Access My Files</button>
                        </label>
                    )}
            </div>
        </div >
    )
}

