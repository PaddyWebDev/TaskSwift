import { X, Camera, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Modal from 'react-modal'
import UpdateImage from './UpdateImage'

interface PageProps {
    ImageSource: string,
    UserId: string
    GetUser: Function,
}

interface State {
    [key: string]: boolean;
}


export default function ViewImage({ ImageSource, UserId, GetUser }: PageProps) {

    const [State, SetState] = useState<State>({
        Modal: false,
        ShowImageUpdate: false,
    })

    const Toggle = (dropdownKey: string) => {
        SetState((prevDropdowns: State) => ({
            ...prevDropdowns,
            [dropdownKey]: !prevDropdowns[dropdownKey],
        }));
    };

    async function RemoveImage() {
        console.log(`Removed`);
    }
    return (
        <div>
            <button type="button" onClick={() => Toggle('Modal')}>
                <Image className=' rounded-full w-56 h-56 object-cover ' draggable="false" onContextMenu={(event: React.MouseEvent<HTMLImageElement>) => event.preventDefault()} src={ImageSource} width={120} height={120} alt='ProfilePicture' />
            </button>

            <Modal
                className={`dark:bg-stone-950  rounded-2xl bg-slate-300 mt-[10vh] lg:w-[50vw] sm:w-[70vw] w-[90vw] mx-auto p-2 `}
                isOpen={State.Modal}
                ariaHideApp={false}
                onRequestClose={() => Toggle('Modal')}
                contentLabel=" View Invitation Modal"
                overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50"
            >
                <section className=''>
                    <div className='flex flex-col space-y-7'>
                        <div className='flex items-center justify-start px-5  pt-5      '   >
                            <h1 className=' text-xl font-semibold '>Profile Photo</h1>
                            <button className="py-2 px-2 me-2 ml-auto text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => Toggle('Modal')}><X /></button>
                        </div>
                        {
                            State.ShowImageUpdate && State.ShowImageUpdate ? <UpdateImage GetUser={GetUser} ImageSource={ImageSource} UserId={UserId} /> : (
                                <>

                                    <div className='flex items-center  justify-center'>
                                        <Image className=' rounded-full w-72 h-72 object-cover ' draggable="false" onContextMenu={(event: React.MouseEvent<HTMLImageElement>) => event.preventDefault()} src={ImageSource} width={120} height={120} alt='ProfilePicture' />
                                    </div>
                                    <div className='flex items-center md:justify-start justify-center p-5 flex-wrap'>
                                        <button className="py-2.5 px-5 me-2 ml-3 mb-2 flex items-center justify-start gap-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button" onClick={() => Toggle('ShowImageUpdate')}>Add Photo <Camera /></button>
                                        <button className="py-2.5 px-5 me-2 mb-2 flex items-center justify-start gap-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => RemoveImage()} type="button">Delete <Trash2 /></button>
                                    </div>
                                </>
                            )
                        }
                    </div>




                </section>
            </Modal>
        </div>
    )
}
