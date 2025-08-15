const FORMATS = ['mp3', 'aac', 'flac', 'ogg', 'wma', 'wav']

const ChooseFormat = ({ format, onFormatChange }) => {
    return (
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ margin: 0 }}>Output format</label>
            <select value={format} onChange={onFormatChange}>
                {FORMATS.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
        </div>
    )
}

export default ChooseFormat