import React from "react";
import home from "./home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import I1 from "./Images/icon.png";
import VideoSection from "./Component/VedioSection";
import Paces from "./Component/Paces";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div>
      <nav>
        <Navbar bg="white" expand="lg" variant="white" className="fixed-top" >
          <Container className="">
            <div>
              {" "}
              <Navbar.Brand href="/">
                <img src={I1} width={30} style={{ marginRight: "10px" }}/>
                SUBLIME TRAVEL
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {" "}
                  {/* Change to ml-auto for right alignment */}
                  <Link
                    to="Home" // This should match the "id" of the footer section
                    spy={true}
                    smooth={true}
                    offset={-90} // Adjust the offset as needed
                    duration={500} // Duration of the scroll animation
                    className="nav-link"
                  >
                    Home
                  </Link>
                  <Link
                    to="About" // This should match the "id" of the footer section
                    spy={true}
                    smooth={true}
                    offset={-90} // Adjust the offset as needed
                    duration={500} // Duration of the scroll animation
                    className="nav-link"
                  >
                    About
                  </Link>
                  <Link
                    to="Package" // This should match the "id" of the footer section
                    spy={true}
                    smooth={true}
                    offset={-90} // Adjust the offset as needed
                    duration={500} // Duration of the scroll animation
                    className="nav-link"
                  >
                    Packages
                  </Link>
                  <Link
                    to="Press" // This should match the "id" of the footer section
                    spy={true}
                    smooth={true}
                    offset={-90} // Adjust the offset as needed
                    duration={500} // Duration of the scroll animation
                    className="nav-link"
                  >
                    Press
                  </Link>
                  <Link
                    to="contact" // This should match the "id" of the footer section
                    spy={true}
                    smooth={true}
                    offset={-90} // Adjust the offset as needed
                    duration={500} // Duration of the scroll animation
                    className="nav-link"
                  >
                    Contact
                  </Link>
                  
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      </nav>
      <VideoSection />
      <Paces />
    </div>
  );
};

export default Home;
