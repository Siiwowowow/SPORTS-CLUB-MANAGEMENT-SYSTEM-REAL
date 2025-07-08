import React from 'react';
import { useLoaderData } from 'react-router';
import Container from '../../Pages/Share/Container/Container';
import GameCard from './GameCard';

const GameCourt = () => {
    const courts = useLoaderData();
    return (
        <Container>
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                    Explore Available Courts
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Choose your preferred court and book your slot easily to enjoy your game.
                </p>

                {
                    courts && courts.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-2'>
                            {
                                courts.map(court => <GameCard court={court} key={court._id}></GameCard>)
                            }
                        </div>
                    ) : (
                        <EmptyState message='No Data Is Available right Now!'></EmptyState>
                    )
                }
            </div>
        </Container>
    );
};

export default GameCourt;
