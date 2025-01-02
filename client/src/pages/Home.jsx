import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
function Home(){

    return(
        <div className="container">
            <Nav />
            <div className="intro-home">
                <h1>Welcome to Melody Generator</h1>
            </div>
            <div className="description">
                <div className="home-buttons"> 
                    <Link to="/generate" className="get-started">
                    <button>Get started</button>
                    </Link>
                    <Link to="/aboutus" className="learn-more">
                    <button>Learn more</button>
                    </Link>
                </div>
                <div className="description-information">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis maximus sem vel aliquet. Sed dignissim ligula ligula, a euismod odio viverra eget. Aliquam sit amet mauris non velit dictum congue in at lacus.</p>
                </div>
            </div>
            <div className="more-information">
                <div className="image-more-information">
                </div> 
                <div className="text-more-information">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id velit justo. Pellentesque elementum imperdiet luctus. Proin vitae erat lacus. Donec vel commodo tortor. Ut vel feugiat ante. Integer luctus felis pellentesque suscipit pulvinar. Aliquam laoreet eros velit, mollis molestie dui hendrerit ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed aliquet molestie mi, non molestie diam viverra sit amet. In et dapibus dolor. Aenean efficitur sit amet tellus eget vehicula. Nullam leo arcu, condimentum ac ante sed, sodales viverra urna. Suspendisse non eros pellentesque ante dapibus maximus.
                </p>
                </div>   
            </div>
        </div>
    );

}

export default Home;