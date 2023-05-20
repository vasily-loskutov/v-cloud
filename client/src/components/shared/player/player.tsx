
import { FC, useState } from "react";
type propTypes = {
    fileName: string
}
import styles from "./player.module.scss"

import { PlayCircleOutlined, CloseOutlined } from "@ant-design/icons";
import Video from "./video";
const Player: FC<propTypes> = ({ fileName }) => {
    const [isOpen, setOpen] = useState(false)

    return (

        <>
            <PlayCircleOutlined style={{ fontSize: "70px" }} onClick={() => setOpen((prev) => !prev)} />
            {isOpen &&
                <>
                    <CloseOutlined className={styles.close} onClick={() => setOpen((prev) => !prev)} />
                    <Video fileName={fileName} />
                </>

            }

        </>
    );
}

export default Player;
