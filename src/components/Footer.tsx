import React from 'react';

const Footer = () => {
    return (


        <footer className="w-full rounded-lg shadow dark:bg-[#1F1F1F]  m-4 font-sg">
            <div className="w-full px-10 p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">

                        <span className="self-center text-xl text-slate-500 whitespace-nowrap font-sgb">Haatdi</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="https://github.com/JayBhensdadia/E-Commerce-React" className="hover:underline me-4 md:me-6" target='_blank'>Github</a>
                        </li>


                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">Haatdi™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    );
};

export default Footer;