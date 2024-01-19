'use client';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { TitleHeader } from '@/components';

const Login = () => {
   return (
      <div className='bg-white xl:w-1/3 md:w-1/2  py-6 flex-col items-center flex md:rounded-3xl w-full'>
         <TitleHeader />
         <Button
            className='flex items-center w-56 space-x-2 mt-12'
            onClick={() => signIn('google')}
            icon={<FcGoogle />}
            size='large'
         >
            <span>Log in with Google</span>
         </Button>
      </div>
   );
};

export default Login;
