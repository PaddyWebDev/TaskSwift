import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function ViewBoard({ Actions }: any) {
    const { DeleteBoard, CreateBoard, getdata, BoardData } = Actions

    async function DeleteBrd(Id: string) {
        DeleteBoard(Id)
    }




    async function EditBoard(BoardId: number) {
        let Name: string | null = prompt('Please enter a value:');
        if (Name) {
            await axios.patch(`/api/Board/Update?BoardId=${BoardId}`, { Name })
            getdata()
        }
    }

    return (
        <section className=' flex items-center justify-start gap-10 sm:w-[70vw] w-[80vw] mx-auto flex-wrap bg-slate-50 dark:bg-[#3c3c3c] p-5 rounded-lg' >
            {BoardData.length !== 0 ? (BoardData.map((board: any, index: number) => (
                <div className=' rounded-xl flex items-center justify-start gap-3 p-4 flex-wrap dark:bg-stone-900 bg-slate-200 cursor-pointer' key={index}>
                    <Link href={`/ViewBoard/${board._id}`}>
                        {board.BoardName}
                    </Link>
                    <button type="button" onClick={() => DeleteBrd(board._id)}>
                        <Trash2 strokeWidth={1.5} />
                    </button>
                    <button type='button' onClick={() => EditBoard(board._id)} >
                        <Pencil />
                    </button>
                </div>
            ))) : (
                <div>
                    <h1>There are no Boards <button type="button" onClick={() => CreateBoard}>Create One</button></h1>
                </div>
            )}

        </section >
    )
}
