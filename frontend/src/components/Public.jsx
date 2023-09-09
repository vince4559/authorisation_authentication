import { Link } from "react-router-dom"


const Public = () => {
    const content = (
        <section >
            <header>
                <h1>Welcome to authorization unit</h1>
            </header>
            <main>
                <p>Men fallout in Squad one right now</p>
                <address>
                    <p>Upper iretutu junction behind close up</p>
                </address>
                <footer>
                    <Link to={'/login'}>Employee Login</Link>
                </footer>
            </main>
        </section>
    );

  return content
}

export default Public
