import styles from "./player.module.scss"
import { PlayCircleOutlined, PauseOutlined } from "@ant-design/icons"
import { FC } from "react";
import { Slider } from 'antd';
type propTypes = {
    playing: boolean
    handlePlay: () => void
    handleVolume: (volume: number) => void
    handleProgress: (progress: number) => void
    volume: number
    loadedSeconds: number
    playedSeconds: number

}
const VideoControls: FC<propTypes> = ({ handlePlay, handleVolume, playing, volume, loadedSeconds, playedSeconds, handleProgress }) => {

    return (
        <>
            <div className={styles.playControls}>
                {playing ?
                    <PlayCircleOutlined onClick={handlePlay} /> :
                    <PauseOutlined onClick={handlePlay} />
                }

            </div>
            <div className={styles.videoControls}>

                <Slider style={{ width: '200px' }}
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    tooltip={{ formatter: null }}
                    onChange={handleVolume}
                />
                <Slider style={{ width: '600px' }}
                    min={0}
                    max={loadedSeconds}
                    step={1}
                    value={playedSeconds}
                    tooltip={{ formatter: null }}
                    onChange={handleProgress}
                />
            </div>
        </>

    );
}

export default VideoControls;
