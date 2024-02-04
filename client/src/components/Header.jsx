import React from 'react';

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md mx-auto p-3 mb-8'>
            <div className='max-w-5xl flex justify-between align-middle mx-auto items-center'>
                <h1 className='text-lg font-bold'>César Mâncio Silva</h1>
                <div className='flex items-center gap-3'>
                    <p className='cursor-pointer'>carrinho</p>
                    <div className='w-8 h-8 rounded-full border border-black cursor-pointer'></div> 
                </div>
            </div>

        </header>
    );
};

export default Header;