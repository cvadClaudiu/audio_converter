const ConvertButton = ({ file, status }) => {
    const isDisabled = !file || status === 'uploading' || status === 'converting'
    const buttonText = status === 'uploading' || status === 'converting' ? 'Converting…' : 'Convert'

    return (
        <button type="submit" disabled={isDisabled}>
            {buttonText}
        </button>
    )
}

export default ConvertButton