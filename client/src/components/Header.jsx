import React from 'react';

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md mx-auto p-3 mb-5'>
            <div className='max-w-6xl flex justify-between align-middle mx-auto items-center'>
                <h1 className='text-lg font-bold'>César Mâncio Silva</h1>
                <div className='w-8 h-8 rounded-full border border-black cursor-pointer'></div>
            </div>

        </header>
    );
};

export default Header;