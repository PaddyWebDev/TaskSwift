"use client"

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '@/app/components/Auth/Navbar';
import Loading from '@/app/components/Loading';
import ViewBoard from '@/app/components/Auth/Board/ViewBoard';

interface UserType {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}

interface BoardType {
    _id: string
    BoardName: string
}

const LoadingSpinner = React.lazy(() => import('../components/Loading'));

export default function Dashboard() {
    const [User, SetUser] = useState<UserType>()
    const [BoardData, SetBoardData] = useState<Array<BoardType>>()
    const [loading, setLoading] = useState<boolean>(true);


    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("/api/User/Session");
            const userData = res.data?.UserData;
            SetUser(userData);
        } catch (error) {
            console.error('Error fetching user session:', error);
        }
    }, [])

    const getBoards = useCallback(async () => {
        if (User) {
            try {
                const response = await axios.get("/api/Board/GetAll", { params: { UserId: User.id } });
                SetBoardData(response.data.BoardData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        }
    }, [User])


    useEffect(() => {

        if (!User) {
            getUser();
        }

        if (User && !BoardData) {
            getBoards();
        }
    }, [getUser, User, getBoards, BoardData]);





    async function deleteBoard(BoardId: string) {
        const response = await axios.delete("/api/Board/Delete", { params: { Id: BoardId } })
        if (response.status === 200) {
            getBoards()
        }
    }



    async function createBoard() {
        const response = await axios.post("/api/Board/Create", { User })
        if (response.status === 200)
            getBoards()
    }

    const Action = {
        DeleteBoard: deleteBoard,
        CreateBoard: createBoard,
        getdata: getBoards,
        BoardData: BoardData
    };


    return (
        <main className='dark:bg-[#111111] min-h-screen'>
            <Navbar />
            <section>
                <div>
                    Hello
                    <div>
                        <button onClick={createBoard} type="button">Create</button>
                    </div>

                </div>
                <div className='mt-[5vh]'>
                    <Suspense fallback={<LoadingSpinner />}>
                        {loading ? (
                            <div className=' flex items-center justify-center'>
                                <Loading />
                            </div>
                        ) : (
                            <ViewBoard Actions={Action} />
                        )}
                    </Suspense>
                </div>

            </section>


        </main>

    )
}

