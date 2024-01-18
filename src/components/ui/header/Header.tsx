import { getServerSession } from 'next-auth';

import UserName from './UserName';
import TitleHeader from './TitleHeader';

const Header = async () => {
   const session = await getServerSession();

   return (
      <div className='flex items-center justify-between mb-8'>
         <TitleHeader />
         <UserName name={session?.user?.name!} />
      </div>
   );
};

export default Header;
