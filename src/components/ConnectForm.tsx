import { useState } from "react";

interface ConnectFormProps {
    connectToVideo: (channelName: string) => void
}

export const ConnectForm = ({ connectToVideo }: ConnectFormProps) => {
    const [channelName, setChannelName] = useState('');
    const [invalidInputMsg, setInvalidInputMsg] = useState('');

    const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
        const chkChannelName = channelName.trim();
        if (!chkChannelName) {
            e.preventDefault();
            setInvalidInputMsg('Sorry, channel name cannot be empty. Please try again.');
            setChannelName('');
            return;
        }
        connectToVideo(chkChannelName);
    }

    return (
        <div className="lg:py-10">
            <form onSubmit={handleConnect}>
                {invalidInputMsg && <p className="mb-2" style={{ color: 'red' }}> {invalidInputMsg}</p>}
                <input
                    type="text"
                    id="channelName"
                    placeholder="Enter your Channel name..."
                    value={channelName}
                    className="placeholder-[#ababab] text-black-400 text-sm rounded-lg block w-full p-2.5 mb-4"
                    onChange={(e) => {
                        setChannelName(e.target.value)
                        setInvalidInputMsg('')
                    }}
                />
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right">Connect</button>
            </form>
        </div>
    )
}