import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AddFollowerRoute, RemoveFollowerRoute } from '../../utils/ApiRoutes';

export default function FollowButton({ currentUser, setcurrentUser }) {
  
  const state = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  if (!currentUser || !state.currentUser) {
    return null;
  }

  const isCurrentUser = state.currentUser._id === currentUser._id;
  const isFollowing = currentUser.followersname?.some(
    (follower) => follower.id === state.currentUser._id
  );
  const hasRequested = currentUser.Account.Requests.some(
    (req) => req.id === state.currentUser._id
  );

  const handleFollowerControl = async () => {
    setLoading(true);
    const route = isFollowing ? RemoveFollowerRoute(currentUser._id) : AddFollowerRoute(currentUser._id);

    try {
      const { data } = await axios.post(route, { id: state.currentUser._id });
      setcurrentUser(data.user);
    } catch (error) {
      console.error(`Error trying to ${isFollowing ? 'remove' : 'add'} follower`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-1 text-sm border-2 border-solid">
      {isCurrentUser ? (
        <button onClick={()=>{window.location.href = '/editprofile'}}>Edit Profile</button>
      ) : (
        <button onClick={handleFollowerControl} disabled={loading}>
          {loading ? 'Loading...' : isFollowing ? 'Following' : hasRequested ? 'Requested' : 'Follow'}
        </button>
      )}
    </div>
  );
}
