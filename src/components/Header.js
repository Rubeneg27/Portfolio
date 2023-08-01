function Header ({isNavCollapsed, updateContent}) {
    return (
        <div className="Header">
            <div className="cabecera">
                <p className="title" onClick={updateContent}>Ruben's site</p>
                <p className="email">rubeneg27@gmail.com</p>
            </div>
            
        </div>
    )
}

export default Header;