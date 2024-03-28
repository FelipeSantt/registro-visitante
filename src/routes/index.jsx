import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

export const Paths = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
               <Route path={'/'} element={<PageLayout/>}>
                 <Route index element={<Home />}/>
                 <Route path={'/login'} element={<Login />}/>
                 <Route path={'/admin'} element={<Admin />}/>
               </Route>
              <Route path={'*'} element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </>
    );
}