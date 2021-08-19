const ProfileButton = ({ photoURL }) => {
  return (
    <div className="p-0.5 border-2 border-gray-400 rounded-full">
      <img
        src={photoURL}
        alt="profile"
        style={{ width: '25px', objectFit: 'contain', borderRadius: '100%' }}
      />
    </div>
  );
};

export default ProfileButton;
