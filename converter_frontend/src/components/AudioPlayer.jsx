const AudioPlayer = ({ audioUrl }) => {
    if (!audioUrl) return null; // don't render if there's no audio

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Preview Converted File</h3>
            <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
    );
};

export default AudioPlayer;