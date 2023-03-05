import { useRef, useEffect, useState } from 'react'
import './header.css'
import { Container } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import DHubLogo from '../../assets/images/DHub-Store-light-logo.png'
import {truncatAddress} from '../../../utils/format'

const Header = () => {

    const [account, setAccount] = useState(null);

    const NAV__LINKS = [
        {
            display: 'HOME',
            url: '/home',
        },
        {
            display: 'STORE',
            url: '/store',
        },
    ]

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        connectWallet();

        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('header__shrink')
            } else {
                headerRef.current.classList.remove('header__shrink')
            }
        })
    }, [])

    const toggleMenu = () => menuRef.current.classList.toggle('active__menu')

    const connectWallet = async () => {
        try {
            console.log('connecting...');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            console.log('connected accounts: ', accounts);
        } catch (err) {
            console.log("error: ", err);
        }
	}

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <Link style={{ textDecoration: 'none' }} to={`/`}>
                            <img src={DHubLogo} className='h-[45px]' alt='DHub logo'/>
                        </Link>
                    </div>

                    <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
                        <ul className="nav__list">
                            {NAV__LINKS.map((item, index) => (
                                <li className="nav__item" key={index} style={{ fontWeight: 'bold' }}>
                                    <NavLink to={item.url} className={(navClass) => (navClass.isActive ? 'active' : '')}>
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}

                            <li className="nav__item" style={{ fontWeight: 'bold' }}>
                                <NavLink to={'/profile'} className={(navClass) => (navClass.isActive ? 'active' : '')}>
                                    {/* whether connected account is admin acocunt or not */}
                                    {account === process.env.ADMIN_ADDRESS ? 'REQUESTS' : 'PROFILE'}
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="nav__right d-flex align-items-center gap-5 ">
                        <button className=" create__btn d-flex align-items-center gap-2" onClick={connectWallet}>
                            <span className='my-[-15px] mx-3'>{account ? truncatAddress(account) : 'Connect'}</span>
                        </button>

                        <span className="mobile__menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
