// JavaScript source code

const NavBar  = () => {
        return (
            <header class = 'header'>
                <h1 style={brandName}>Testing nav bar</h1>
                <button>About Us</button>
                <button>Opportunities</button>
                <button>Contact us</button>
                <button>Login</button>
        </header>
            )
}

const brandName = {
    color: "white",
    backgroundColor: 'red'
}
export default NavBar