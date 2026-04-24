import './Footer.css'
import dbLogo from '../../assets/db.png'

export default function Footer(){
    return(
        <div className="footer">
        make with love <img src={dbLogo} alt="logo" />
        </div>

    );
}