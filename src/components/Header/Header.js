import './Header.css'
import { useDevice } from "../Context/DeviceContext.js";

function Header ({icons}) {

    const { isMobile } = useDevice();

    const handleIconClick = (url) => {
        if (url) {
            window.open(url, '_blank'); // Abrir la URL en una nueva pestaña
        }
    };

    return (
        <div className={isMobile ? "HeaderMobile" : "Header"}>
                <div className={isMobile ? "decorationMobile" : "decoration"}>
                    {
                        icons.map((icon, index) => (
                            <div key={index} className="logoCont" onClick={() => handleIconClick(icon.url)} style={{ cursor: icon.url ? 'pointer' : 'default' }}>
                                {icon.ref ? <icon.ref className="logo"/> : <div className="logo">{icon.name}</div>}
                            <span>{icon.name}</span>
                            </div>
                            ))
                        }
                </div>
        </div>
    )
}

export default Header;