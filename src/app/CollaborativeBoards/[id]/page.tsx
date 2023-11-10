"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface BoardType {
    _id: string
    BoardName: string,
}
export default function CollaborativeBoards({ params }: any) {
    const [Data, SetData] = useState<Array<BoardType>>()
    async function GetData() {
        const response = await axios.get(`/api/User/SharedWorkspaces?UserId=${params.id}`)
        SetData(response.data.message);
    }
    useEffect(() => {
        GetData()
    }, [])


    return (
        <>
            <div>CollaborativeBoards</div>
            {Data?.map((data: BoardType, index: number) => (
                <Link key={index} href={`/ViewBoard/${data._id}`}>{data.BoardName}</Link>
            ))}
        </>
    )
}
