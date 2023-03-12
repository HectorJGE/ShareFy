import React from "react";

const ProfilePicture = ({currentUserImage, px}) =>{
    return (
        <>
            <img className="rounded-circle btn-square-md img-fluid" src={currentUserImage} alt="Profile Img" style={{width: px,height:px}}></img>
        </>
    )
}

export default ProfilePicture;