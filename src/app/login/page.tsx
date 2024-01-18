'use client';
import { Button } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { TitleHeader } from '@/components';

const Login = () => {
   const session = useSession();

   if (session.status === 'loading') {
      return <p>Loading....</p>;
   }

   return (
      <div className='bg-white xl:w-1/3 md:w-1/2 w-full py-6 flex-col items-center space-y-8 flex rounded-3xl'>
         <TitleHeader />
         <Button
            className='flex items-center w-56 space-x-2 py-2'
            onClick={() => signIn('google')}
            icon={<FcGoogle />}
         >
            <span>Log in with Google</span>
         </Button>
      </div>
   );
};

export default Login;
