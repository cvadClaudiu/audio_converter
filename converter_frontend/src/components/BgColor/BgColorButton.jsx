import icon from '../../assets/BgColorSettings_icon.png';

const BgColorButton = ({ bgColor, setBgColor }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 40,
                height: 40,
            }}
        >
            <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                }}
            />

            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: `url(${icon}) center/cover no-repeat`,
                    pointerEvents: 'none', 
                    borderRadius: 4,
                }}
            />
        </div>
    );
};

export default BgColorButton;
