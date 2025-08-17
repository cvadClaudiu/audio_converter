import { useState } from 'react';
import ChooseFile from './components/ChooseFile';
import ChooseFormat from './components/ChooseOutputFormat';
import ConvertButton from './components/ConvertButton';
import BgColorPicker from './components/BgColor/BgColorPicker'; 
import BgColorButton from './components/BgColor/BgColorButton'; 

export default function App() {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('mp3');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

  
    const [bgColor, setBgColor] = BgColorPicker('#000000');

    const onFileChange = (e) => setFile(e.target.files?.[0] || null);
    const onFormatChange = (e) => setFormat(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!file) {
            setError('Please choose an audio file.');
            return;
        }

        try {
            setStatus('uploading');
            const form = new FormData();
            form.append('file', file);

            const res = await fetch(`/api/conversion/convert?format=${encodeURIComponent(format)}`, {
                method: 'POST',
                body: form
            });

            if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(text || `Request failed (${res.status})`);
            }

            setStatus('converting');
            const blob = await res.blob();
            const disposition = res.headers.get('content-disposition') || '';
            const match = disposition.match(/filename="?([^"]+)"?/i);
            const suggestedName = match?.[1] || `converted.${format}`;

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = suggestedName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            setStatus('done');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Conversion failed');
            setStatus('error');
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'system-ui, sans-serif',
                padding: '20px',
                boxSizing: 'border-box',
                backgroundColor: bgColor,
                color: bgColor === '#000000' ? 'white' : 'black'
            }}
        >
           
            <BgColorButton bgColor={bgColor} setBgColor={setBgColor} />

            <div style={{ maxWidth: 520, width: '100%' }}>
                <h1>Audio Converter</h1>
                <form onSubmit={onSubmit}>
                    <ChooseFile file={file} onFileChange={onFileChange} />
                    <ChooseFormat format={format} onFormatChange={onFormatChange} />

                    <ConvertButton file={file} status={status} />

                    {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}
                </form>

                <p style={{ marginTop: 16, color: '#666' }}>
                    Audio File converter, powered by FFmpeg<br />
                    Supported formats: MP3, AAC, FLAC, OGG, WMA, WAV.
                </p>
            </div>
        </div>
    );
}
