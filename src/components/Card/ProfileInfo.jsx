import "./Card.css";

function ProfileInfo() {
  return (
    <div className="profile-info">

      <div className="profile-section">
        <p className="profile-title">Profile</p>

        <a
          href="https://quang.com"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          https://quang.com
        </a>

        <p className="profile-text">
          I’m an Information Technology student. <br />
          It’s a pleasure to connect with you
        </p>
      </div>

      <div className="profile-section">
        <p className="profile-title">Dms for work</p>

        <a
          href="https://nohello.net/vi/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          https://nohello.net/vi/
        </a>
      </div>

    </div>
  );
}

export default ProfileInfo;