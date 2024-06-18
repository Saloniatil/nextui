import styles from "./sidebar.module.css"
import { MdDashboard,  TbUserShare , MdSupervisedUserCircle, MdShoppingBag , MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout,} from "react-icons/md"
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

 
  
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />
            },
             
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdShoppingBag />
            },
            {
                title: "Transaction",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />
            },
        ]
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Retailor",
                path: "/dashboard/retailor",
                icon:  <MdAttachMoney />
            },
            {
                title: "Customers",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />
            },
            {
                title: "offers",
                path: "/dashboard/products",
                icon: <MdShoppingBag />
            },
            {
                title: "Other Services",
                path: "/dashboard/products",
                icon: <MdShoppingBag />
            },
        ]
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
        ],
    },
];
 
const Sidebar = () => {
    return (
        
        <div className={styles.container}>
            <div className={styles.user}>
                  <Image className={styles.userImage} src="" alt="userAvtar" width={50} height={50} /> 
                  
                 <div className={styles.userDetail}>
                    <span className={styles.username}>John Doe</span>
                    <span className={styles.userTitle}>Administrator</span>
                 </div>
            </div>
            <ul className={styles.list}> 
            {menuItems.map((cat)=>(
            <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span> 
            {cat.list.map(item=>(
             <MenuLink item={item} key={item.title} />
            ))}
            </li>
        ))}
        </ul>
        <button className={styles.logout}>
            <MdLogout />
            Logout</button>
        </div>
         
    )
}
export default Sidebar
 
