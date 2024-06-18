import { LocalUser, RemoteUser, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LiveVideo = () => {
    const APP_ID = import.meta.env.VITE_APP_ID;
    console.log(APP_ID, "JELLO");
    const { channelName } = useParams();

    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const navigation = useNavigate()

    useJoin({
        appid: APP_ID,
        channel: channelName!,
        token: null,
    },
        activeConnection,
    );

    usePublish([localMicrophoneTrack, localCameraTrack]);

    // user tracks
    audioTracks.forEach((track) => track.play())

    return (
        <>
            <h2 className="text-gray-500 mb-2">Channel Name: {channelName}</h2>
            <div className="flex items-center gap-3 mb-10" id="remoteVideoGrid">
                {remoteUsers.length === 0 && <h3 className="mt-4">Waiting for remote joiners...</h3>}
                {remoteUsers.map((user) => (
                    <div key={user.uid} className="remote-video-container">
                        <RemoteUser user={user} />
                        <span className="float-right">User UID: {user.uid}</span>
                    </div>
                ))
                }
            </div>
            <div id="localVideo">
                <h2 className="font-semibold">My Video</h2>
                <LocalUser
                    audioTrack={localMicrophoneTrack}
                    videoTrack={localCameraTrack}
                    cameraOn={cameraOn}
                    micOn={micOn}
                    playAudio={micOn}
                    playVideo={cameraOn}
                    className="z-10 border-4 border-gray-500"
                />

                <div className="flex items-center float-right" id="controlsToolbar">
                    <div id="mediaControls" className="mt-2">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={() => setMic(a => !a)}>
                            Mic
                        </button>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={() => setCamera(a => !a)}>
                            Camera
                        </button>
                        <button id="endConnection" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => {
                            setActiveConnection(false)
                            navigation('/')
                        }}> Disconnect
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveVideo