import { useAppSelector } from "@hooks";
import { FC, PropsWithChildren } from "react";
import { AuthPage } from "../../entity";
const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.user)

    return (<>
        {
            isAuth ? children : <AuthPage />
        }
    </>);
}

export default ProtectedRoute;
