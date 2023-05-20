
import { Header } from "@layout"
import { DashBoard, ProfilePage, AuthPage } from "@entity"
import { ProtectedRoute } from "./components/shared";
import styles from "./app.module.scss"
import type { MenuProps } from 'antd';
import { Route, Routes } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];
function App() {

  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className={styles.mainBlock}>

          <Routes>
            <Route path="/profile" element={<ProtectedRoute><div className={styles.layout}><ProfilePage /></div></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><div className={styles.layout}><DashBoard /></div></ProtectedRoute>} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>





        </div>

      </div>
    </>

  )
}

export default App
