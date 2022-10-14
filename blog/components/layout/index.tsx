// import type { NextPage } from 'next';
// import { ReactElement } from 'react';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Layout: any = ({ children }: { children: any }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
