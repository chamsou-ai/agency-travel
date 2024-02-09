import React from "react";
import "./VideoSection.css"; // Import your custom CSS for the video section
import Vedio from "../Images/vedio.mp4";
import I1 from "../Images/icon.png";
import {Link, useNavigate} from "react-router-dom";

const VideoSection = () => {
  const Navigate = useNavigate();
  return (
    <div className="video-section" id="Home">
      <video autoPlay loop muted>
        <source src={Vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <div className="video-content">
          <p className="desc" style={{ marginBottom:"0px" }}>Vous emmenant au</p>
          <p className="desc" style={{marginTop:"0px" }}>meilleurs endroits</p>
          <div onClick={()=>Navigate('/reservation')} className="btn-reserve">
                Réservez
              </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
