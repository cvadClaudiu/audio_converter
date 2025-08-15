const ChooseFile = ({ file, onFileChange }) => {
    return (
        <div style={{ marginBottom: 120 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Choose file</label>
            <input type="file" accept="audio/*" onChange={onFileChange} />
        </div>
    )
}

export default ChooseFile