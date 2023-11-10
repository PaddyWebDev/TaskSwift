import { UserPlusIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import AddMembers from './AddMembers';
// Make sure to set the application root element for react-modal
if (typeof window !== 'undefined') {
    Modal.setAppElement('#crx-root-main'); // Replace with the appropriate root element ID for your application
}
export default function InviteMembers({ BoardId, GetMembers }: any) {
    const [modalIsOpen, setModalIsOpen] = useState(false);



    return (
        <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-start gap-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setModalIsOpen(!modalIsOpen)}><UserPlusIcon /> Invite Members</button>

            <Modal
                className={`dark:bg-slate-950 bg-slate-300 mt-[15vh] sm:w-[50vw] w-[90vw] mx-auto p-5 rounded-lg`}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(!modalIsOpen)}
                contentLabel="Example Modal"
                overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50"
            >
                <section>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => setModalIsOpen(!modalIsOpen)}><X /></button>
                    </div>
                    <div >
                        <h1 className=' text-2xl text-center'>Invite Members</h1>
                        <AddMembers GetMembers={GetMembers} BoardId={BoardId} />
                    </div>
                </section>
            </Modal>
        </div>
    );
}

