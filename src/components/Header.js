import {FaReact, FaJs, FaHtml5, FaCss3 } from "react-icons/fa";

function Header ({isNavCollapsed, updateContent}) {
    return (
        <div className="Header">
            <div className="cabecera">
                <p className="title" onClick={updateContent}>Ruben's site</p>
                <p className="email">rubeneg27@gmail.com</p>
            </div>
            <div className="subCabecera">
                <div className={isNavCollapsed? "logos-collapsed" : "logos"}>
                    <FaJs className="logo" />
                    <FaReact className="logo" />
                    <FaHtml5 className="logo" />
                    <FaCss3 className="logo" />
                </div>
                <div className={isNavCollapsed? "resumen-expanded" : "resumen"}>HOME</div>
            </div>
        </div>
    )
}

export default Header;