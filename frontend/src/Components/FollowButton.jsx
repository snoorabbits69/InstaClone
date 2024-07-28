import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AddFollowerRoute, RemoveFollowerRoute } from '../../utils/ApiRoutes';

export default function FollowButton({ currentUser, setcurrentUser }) {
  const state = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleFollowerControl = async () => {
    setLoading(true);

    const isFollowing = currentUser.followersname?.some((follower) => follower.id === state.currentUser._id);
    const route = isFollowing ? RemoveFollowerRoute(currentUser._id) : AddFollowerRoute(currentUser._id);
    const method = isFollowing ? 'remove' : 'add';

    try {
      const { data } = await axios.post(route, { id: state.currentUser._id });
      setcurrentUser(data.user);
    } catch (error) {
      console.error(`Error trying to ${method} follower`, error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || !state.currentUser) {
    return null;
  }

  const isCurrentUser = state.currentUser._id === currentUser._id;
  const isFollowing = currentUser.followersname?.some((follower) => follower.id === state.currentUser._id);

  return (
    <div className="px-2 py-1 text-sm border-2 border-solid">
      {isCurrentUser ? (
        <button>Edit profile</button>
      ) : (
        <button onClick={handleFollowerControl} disabled={loading}>
          {loading ? 'Loading...' : (isFollowing ? 'Following' : 'Follow')}
        </button>
      )}
    </div>
  );
}
