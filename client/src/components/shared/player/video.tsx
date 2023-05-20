import { FC, useState, useRef } from "react";
import ReactPlayer from "react-player"
import styles from "./player.module.scss"
import VideoControls from "./videoControls";

type propTypes = {
    fileName: string
}
const Video: FC<propTypes> = ({ fileName }) => {
    const [state, setState] = useState({
        playing: false,
        volume: 0.3,
        loadedSeconds: 1,
        playedSeconds: 0
    })
    const handlePlay = () => {
        setState({ ...state, playing: !state.playing })
    }
    const playRef = useRef()
    const handleVolume = (volume: number) => {

        setState({ ...state, volume: volume })
    }
    const handleProgress = (e) => {
        setState({ ...state, ...e })
    }
    const setProgress = (progress: number) => {
        console.log(progress)

        setState({ ...state, playedSeconds: progress })
        playRef.current.seekTo(state.playedSeconds, 'seconds')
    }


    return (
        <>

            <ReactPlayer url={`http://localhost:3001/${fileName}`}
                playing={state.playing}
                volume={state.volume}
                className={styles.player}
                onProgress={handleProgress}
                ref={playRef}
            />
            <VideoControls handlePlay={handlePlay}
                playing={state.playing}
                handleVolume={handleVolume}
                volume={state.volume}
                loadedSeconds={state.loadedSeconds}
                playedSeconds={state.playedSeconds}
                handleProgress={setProgress}
            />
        </>
    );
}

export default Video;
