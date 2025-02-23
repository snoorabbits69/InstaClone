import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AddFollowerRoute,
  CancelFollowRequestRoute,
  RemoveFollowerRoute,
} from '../../utils/ApiRoutes';
import { Socketcontext } from './../context/Socketcontext';
import apiRequest from './axios';

export default function FollowButton({ currentUser, setcurrentUser }) {
  const { socket } = useContext(Socketcontext);
  const state = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  if (!currentUser || !state.currentUser) {
    return null;
  }

  const isCurrentUser = state.currentUser._id === currentUser._id;
  const isFollowing = currentUser.followersname?.some(
    (follower) => follower.id === state.currentUser._id
  );
  const hasRequested = currentUser.Account.Requests?.some(
    (req) => req?.id === state.currentUser._id
  );

  const handleFollowerControl = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let route = RemoveFollowerRoute(currentUser?._id);

      if (isFollowing) {
        route = RemoveFollowerRoute(currentUser?._id);
      } else if (hasRequested) {
        route = CancelFollowRequestRoute(currentUser?._id);
      } else {
        route = AddFollowerRoute(currentUser?._id);
        if (currentUser.Account.private && socket) {
          socket.emit(
            'followrequest',
           {id:currentUser._id}
          );
        }
      }

      const  data  = await apiRequest('POST', route, {
        id: state.currentUser._id,
      });
      setcurrentUser(data.user); 
    } catch (error) {
      console.error('Failed to update follow status:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-1 text-sm border-2 border-solid follow-button">
      {isCurrentUser ? (
        <button onClick={() => (window.location.href = '/editprofile')}>
          Edit Profile
        </button>
      ) : (
        <button onClick={handleFollowerControl} disabled={loading}>
          {loading
            ? 'Loading...'
            : isFollowing
            ? 'Following'
            : hasRequested
            ? 'Requested'
            : 'Follow'}
        </button>
      )}
    </div>
  );
}
