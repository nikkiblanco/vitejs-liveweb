import { Route, Routes, useNavigate } from 'react-router-dom'
import './index.css'
import reactLogo from './assets/react.svg';
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";
import LiveVideo from './components/LiveVideo';
import { ConnectForm } from './components/ConnectForm';

function App() {
  const navigate = useNavigate()
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  const handleConnect = (channelName: string) => {
    navigate(`/via/${channelName}`) // on form submit, navigate to new route
  }

  return (
    <div className="container mt-24 mx-auto px-10 py-4">
      <img src={reactLogo} className="mx-auto block mb-10" alt="logo" width={150} height={150} />
      <h1 className="text-bold text-[#4c4c4c] mb-5">Live Video Chat App Using Agora.io</h1>
      <Routes>
        <Route path='/' element={<ConnectForm connectToVideo={handleConnect} />} />
        <Route path='/via/:channelName' element={
          <AgoraRTCProvider client={agoraClient}>
            <LiveVideo />
          </AgoraRTCProvider>
        } />
      </Routes>
    </div >
  )
}

export default App