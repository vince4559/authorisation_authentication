import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectCurrentUser } from "./authSlice"


const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const welcome = user? `Welcome ${user}!` : 'Welcome';

    const content = (
        <section>
            <h1>{welcome}</h1>
            <p>
                <Link to={'/employees'}> Go to employee rest</Link>
            </p>
        </section>
    )
  return content;
}

export default Welcome
