// Layout.tsx
import { Outlet } from "react-router-dom";
import SidebarNav from "./sidebarnav";

const Layout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 self-start">
        <SidebarNav />
      </aside>
      <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 bg-slate-50 items-center">
      <div className="p-6 xl:px-20 rounded-lg md:container md:mx-auto">
      <Outlet />
      </div>
        
      </main>
      </div>
   
    </div>
  );
};

export default Layout;
