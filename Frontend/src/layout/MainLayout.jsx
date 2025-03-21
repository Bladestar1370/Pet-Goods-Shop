import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { Footer } from '../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import '../layout/MainLayout.css';

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
