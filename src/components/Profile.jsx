import { useSelector } from 'react-redux';

const Profile = () => {
    // Retrieve user from Redux state
    const user = useSelector(state => state.user.user);

    if (!user) {
        return <div className="p-4">Loading...</div>; // Show a loading message if user data is not available
    }

    return (
        <div className="container-profile p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-semibold mb-4 text-green-800">My Profile</h1>
            <div className="profile-info">
                <div className="flex items-center mb-4">
                    <img
                        src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s"}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{user.name || 'No Name'}</h2>
                        <p className="text-md text-gray-700">{user.email || 'No Email'}</p>
                    </div>
                </div>
                <div className="user-details mt-4">
                    <h3 className="text-lg font-semibold text-green-700">User Details</h3>
                    <p className="text-md mt-2"><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p className="text-md mt-2"><strong>Address:</strong> {user.address || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
