import { useNavigate } from 'react-router-dom';
import { Edit, Mail, MapPin, FileText, User as UserIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import authStore from '@/lib/zustandStore';
import { DICEBEAR_AVATAR_API } from '@/constants';

const Profile = () => {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);

  const avatarUrl = user?.profile?.avatarUrl || `${DICEBEAR_AVATAR_API}?seed=${user?.username || 'default'}`;
  const hasProfile = user?.profile && (user.profile.firstName || user.profile.lastName || user.profile.bio);

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-surface py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-surface-container-low rounded-3xl shadow-ambient p-12">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container shadow-ambient mx-auto mb-6">
              <img src={avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-extrabold text-on-surface mb-2">
              Complete Your Profile
            </h1>
            <p className="text-secondary text-lg mb-6">
              Add your personal information to get started
            </p>
            <Button
              onClick={() => navigate('/profile/edit')}
              size="lg"
            >
              <Edit className="w-4 h-4" />
              Create Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[#004e47]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-4xl font-extrabold text-on-surface -tracking-[0.02em]">
              My Profile
            </h1>
          </div>
          <Button
            onClick={() => navigate('/profile/edit')}
            size="lg"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        <div className="bg-surface-container-low rounded-3xl shadow-ambient p-8">
          {/* Avatar and Name */}
          <div className="flex items-start gap-6 mb-8 pb-8 border-b border-outline-variant/20">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container shadow-ambient shrink-0">
              <img src={avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-on-surface mb-2">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h2>
              <p className="text-secondary text-lg mb-1">@{user?.username}</p>
              <div className="flex items-center gap-2 text-secondary">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user?.profile?.bio && (
            <div className="mb-8 pb-8 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-on-surface">Bio</h3>
              </div>
              <p className="text-on-surface leading-relaxed">
                {user.profile.bio}
              </p>
            </div>
          )}

          {/* Location */}
          {(user?.profile?.country || user?.profile?.city) && (
            <div className="mb-8 pb-8 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-on-surface">Location</h3>
              </div>
              <p className="text-on-surface">
                {[user?.profile?.city, user?.profile?.country].filter(Boolean).join(', ')}
              </p>
            </div>
          )}

          {/* Account Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <UserIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-on-surface">Account Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Username</p>
                <p className="text-on-surface">@{user?.username}</p>
              </div>
              <div>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Status</p>
                <p className="text-on-surface capitalize">{user?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
