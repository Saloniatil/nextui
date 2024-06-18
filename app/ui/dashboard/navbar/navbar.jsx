"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import {MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md"
import React, {useState} from "react";
import {IoMdNotificationsOutline} from "react-icons/io"
import { IoIosHelpCircleOutline } from 'react-icons/io';
import {CiLogout } from 'react-icons/ci'
import { CiSettings } from 'react-icons/ci';
import {RiEditBoxLine} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import { MdLogin } from "react-icons/md";
import Link from 'next/link';
const Navbar = () => {

    const pathname = usePathname();
    // const [isActive, setIsActive] = useState(false);

    // const handleClick = () => {
    //     setIsActive(!isActive);
    // }
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                <MdSearch />
                <input type="text"  placeholder="Search..." className={styles.input}/>
                </div>
                 <div className={styles.icons}>
                    <MdOutlineChat size={20} />
                    {/* <MdNotifications size={20} /> */}
                    <MdPublic size={20} />
                   <Link href="/register"> <MdLogin  size={20}  /></Link> 
                </div> 
                {/* // <div className={`navigation${isActive ? " active" : ""}`}>
                //  <div className='userBx'>
                //     <div className='imgBx'>
                //         <img src="" alt="user" />
                //     </div>
                //     <p className='username'>Saloni</p>
                //  </div>
                //  <div className="menuToggle" onClick={handleClick}>
                //     <span></span>
                //     <span></span>
                //     <span></span>
                //  </div>
                //  <ul className='menu'>
                //     <li>
                //         <a href="/"><CgProfile />My profile</a>
                //     </li>
                //     <li>
                //         <a href="/"><RiEditBoxLine  />Edit</a>
                //     </li>
                //     <li>
                //         <a href="/"><IoMdNotificationsOutline />Notifications</a>
                //     </li>
                //     <li>
                //         <a href="/"><CiSettings  />Settings</a>
                //     </li>
                //     <li>
                //         <a href="/"><CiLogout/>Settings</a>
                //     </li>
                //  </ul>

                // </div> */}
            </div>
        </div>
    )
}
export default Navbar