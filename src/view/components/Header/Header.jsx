import { useRef, useEffect } from 'react'
import './header.css'
import { Container } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import 'antd/dist/antd.css'

let NAV__LINKS = []

const Header = () => {
    NAV__LINKS = [
        {
            display: 'HOME',
            url: '/home',
        },
        {
            display: 'MARKET',
            url: '/market',
        },
        {
            display: 'MINT',
            url: '/mint',
        },
        {
            display: 'CONTACT',
            url: '/contact',
        },
        {
            display: 'PROFILE',
            url: '/wallet',
        },
    ]

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('header__shrink')
            } else {
                headerRef.current.classList.remove('header__shrink')
            }
        })

        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    const toggleMenu = () => menuRef.current.classList.toggle('active__menu')

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <Link style={{ textDecoration: 'none' }} to={`/`}>
                            <h2 className=" d-flex gap-2 align-items-center ">DHub</h2>
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
                                <a target="_blank" href="http://45.76.185.234:8080/" rel="noreferrer">
                                    CREATE
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="nav__right d-flex align-items-center gap-5 ">
                            <button className="btn d-flex gap-2 align-items-center" style={{ color: 'white', fontSize: '.8rem' }}>
                                <span>
                                    <i className="ri-wallet-line"></i>
                                </span>
                                Login
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
