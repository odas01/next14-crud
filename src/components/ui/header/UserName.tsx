'use client';

import { Dropdown } from 'antd';
import { signOut } from 'next-auth/react';
import { GoTriangleDown } from 'react-icons/go';

interface UserNameProps {
   name: string;
}

const UserName: React.FC<UserNameProps> = ({ name }) => {
   return (
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
         <div className='flex space-x-2 xl:text-base text-xs cursor-pointer items-center border px-4 py-2 rounded-lg'>
            <span>Hello, </span>
            <span className='max-w-24 line-clamp-1'>{name}</span>
            <GoTriangleDown color='inherit' className='mt-0.5' />
         </div>
      </Dropdown>
   );
};

export default UserName;
