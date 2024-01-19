'use client';

import { ThemeContext } from '@/components/provider/ThemeProvider';
import { Dropdown } from 'antd';
import { signOut } from 'next-auth/react';
import { useContext } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoIosMoon } from 'react-icons/io';
import { BsMoon, BsSun } from 'react-icons/bs';

interface UserNameProps {
   name: string;
}

const UserName: React.FC<UserNameProps> = ({ name }) => {
   const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
   return (
      <div className='flex items-center space-x-2'>
         <div
            className='flex justify-center items-center md:px-3 px-2 h-full aspect-square rounded cursor-pointer shadow-light dark:shadow-dark'
            onClick={toggleDarkMode}
         >
            {isDarkMode ? <BsSun color='#fff' /> : <BsMoon />}
         </div>
         <Dropdown
            menu={{
               items: [
                  {
                     key: 1,
                     label: <p onClick={() => signOut()}>Log out</p>,
                  },
               ],
            }}
         >
            <div className='flex space-x-2 xl:text-base text-xs cursor-pointer items-center border dark:border-gray-400 px-4 py-2 rounded-lg dark:text-white'>
               <span>Hello, </span>
               <span className='max-w-24 line-clamp-1'>{name}</span>
               <GoTriangleDown color='inherit' className='mt-0.5' />
            </div>
         </Dropdown>
      </div>
   );
};

export default UserName;
