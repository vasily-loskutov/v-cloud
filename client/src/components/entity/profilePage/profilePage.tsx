import { useActions, useAppSelector } from "@/hooks";
import { Button, Typography, Tooltip, Progress } from "antd";
import styles from "./profilePage.module.scss"
import { useDeleteUserMutation, useGetUserInfoQuery } from "@/redux";
import { bytesToGBytes, getProcent } from "@/utils";
const ProfilePage = () => {
    const { logOut } = useActions()
    const { user } = useAppSelector(state => state.user)
    const { data, isLoading } = useGetUserInfoQuery(user.id)
    console.log(data)
    const [deleteUser] = useDeleteUserMutation()
    const deleteAccount = async () => {
        await deleteUser(user.id)
        logOut()
    }
    return (
        <>
            {!isLoading ?
                <div className={styles.profile}>
                    <Typography.Text className={styles.profile__text} >id: {data?.id}</Typography.Text>
                    <Typography.Text className={styles.profile__text}>Имя: {data?.name}</Typography.Text>
                    <Typography.Text className={styles.profile__text}>Почта:
                        {user?.isActivated ?
                            <Tooltip placement="right" title={"почта не активирована"} >

                                <Typography.Text className={styles.profile__text} type={'warning'}>
                                    {user?.email}
                                </Typography.Text>
                            </Tooltip> :
                            <Typography.Text className={styles.profile__text} type={'warning'}>
                                {user?.email}
                            </Typography.Text>
                        }

                    </Typography.Text>
                    <div> <Typography.Text className={styles.profile__text}>Занято места на диске:</Typography.Text>
                        <div className={styles.progress}>
                            <Progress percent={getProcent(data?.allFilesSize, data?.totalSize)} showInfo={false} style={{ width: '400px' }} />
                            <Typography.Text style={{ paddingBottom: "5px" }} > {bytesToGBytes(data?.totalSize - data?.allFilesSize)} Гб</Typography.Text>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => logOut()} danger type="primary" size="large" style={{ marginRight: '15px' }}>Выйти</Button>
                        <Button onClick={deleteAccount} danger type="primary" size="large">Удалить аккаунт</Button>
                    </div>

                </div > : 'Loading'
            }
        </>
    );
}

export default ProfilePage;
