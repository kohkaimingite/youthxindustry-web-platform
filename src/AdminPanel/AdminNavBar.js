// JavaScript source code
import { Link } from 'react-router-dom'
import classes from '../components/AdminNavBar.module.css'

const AdminNavBar = () => {
    return (
        <div className={classes.AdminNavBar}>
            <nav>
                <ul>
                    <li>
                        <Link to="/AdminPanel">Admin Panel</Link>
                    </li>

                    <li>
                        <a href="/EditUser">Edit Users</a>
                    </li>

                    <li>
                        <a href="/EditOppo">Edit Opportunities</a>
                    </li>

                    <li>
                        <a href="/MngPartner">Manage Partners</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavBar