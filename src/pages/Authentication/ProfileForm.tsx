import { useState, useEffect } from 'react';
import { User, MapPin, FileText, Upload, Link as LinkIcon, Save, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiInstance } from '@/lib/axiosInstance';
import { authStore } from '@/lib/zustandStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { USERNAME_REGEX, BIO_MAX_LENGTH, API_ENDPOINTS } from '@/constants';

type AvatarType = 'upload' | 'url';

const ProfileForm = () => {
  const store = authStore();
  const user = store.user;
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [usernamePassword, setUsernamePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [avatarType, setAvatarType] = useState<AvatarType>('url');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      if (user.profile) {
        setFirstName(user.profile.firstName || '');
        setLastName(user.profile.lastName || '');
        setBio(user.profile.bio || '');
        setCountry(user.profile.country || '');
        setCity(user.profile.city || '');
        setAvatarUrl(user.profile.avatarUrl || store.getAvatarUrl());
      }
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setAvatarFile(null);
    setAvatarPreview('');
  };

  const handleUsernameUpdate = async () => {
    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    if (!usernamePassword) {
      toast.error('Password is required to update username');
      return;
    }

    const usernameRegex = USERNAME_REGEX;
    if (!usernameRegex.test(username)) {
      toast.error('Username must start with a letter and contain only letters, numbers, hyphens, and underscores (5-30 characters)');
      return;
    }

    setUsernameLoading(true);
    try {
      const response = await apiInstance.patch(API_ENDPOINTS.AUTH.ACCOUNT_UPDATE, {
        fieldToUpdate: 'username',
        newValue: username,
        password: usernamePassword
      });
      await store.refreshUser();
      toast.success(response.data?.message || 'Username updated successfully!');
      setUsernamePassword('');
    } catch (error: unknown) {
      toast.error((error as any).response?.data?.message || 'Failed to update username');
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use FormData only if file is uploaded, otherwise use JSON
      if (avatarType === 'upload' && avatarFile) {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('bio', bio);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('avatar', avatarFile);

        const response = await apiInstance.patch(API_ENDPOINTS.AUTH.PROFILE_UPDATE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        await store.refreshUser();
        toast.success(response.data?.message || 'Profile updated successfully!');
        navigate('/profile');
      } else {
        // Use regular JSON payload
        const payload = {
          firstName,
          lastName,
          bio,
          country,
          city,
          avatarUrl: avatarType === 'url' ? avatarUrl : ''
        };

        const response = await apiInstance.patch(API_ENDPOINTS.AUTH.PROFILE_UPDATE, payload);
        await store.refreshUser();
        toast.success(response.data?.message || 'Profile updated successfully!');
        navigate('/profile');
      }
    } catch (error: unknown) {
      toast.error((error as any).response?.data?.message || 'Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar = avatarType === 'upload' && avatarPreview ? avatarPreview : avatarUrl;

  return (
    <div className="min-h-screen bg-surface py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-on-surface mb-2 -tracking-[0.02em]">
            Edit Profile
          </h1>
          <p className="text-secondary text-lg">
            Update your personal information and preferences
          </p>
        </div>

        <div className="bg-surface-container-low rounded-3xl shadow-ambient p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username Section */}
            <div className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Update Username</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-xs font-bold text-secondary">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-low rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                      placeholder="Enter username"
                    />
                  </div>
                  <p className="text-xs text-secondary">Must start with a letter, 5-30 characters (letters, numbers, hyphens, underscores)</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="usernamePassword" className="block text-xs font-bold text-secondary">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      id="usernamePassword"
                      type="password"
                      value={usernamePassword}
                      onChange={(e) => setUsernamePassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-low rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                      placeholder="Enter password to confirm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleUsernameUpdate}
                  disabled={usernameLoading}
                  className="w-full"
                >
                  {usernameLoading ? 'Updating Username...' : 'Update Username'}
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-outline-variant/20"></div>

            {/* Avatar Section */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-on-surface">
                Profile Picture
              </label>

              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container shadow-ambient shrink-0">
                  <img
                    src={currentAvatar || store.getAvatarUrl()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = store.getAvatarUrl();
                    }}
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={avatarType === 'upload' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAvatarType('upload')}
                    >
                      <Upload className="w-4 h-4" />
                      Upload File
                    </Button>
                    <Button
                      type="button"
                      variant={avatarType === 'url' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAvatarType('url')}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Image URL
                    </Button>
                  </div>

                  {avatarType === 'upload' ? (
                    <div className="space-y-2">
                      {avatarFile ? (
                        <div className="flex items-center gap-2 p-3 bg-surface-container rounded-xl">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-on-surface flex-1 truncate">
                            {avatarFile.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleRemoveFile}
                            className="h-6 w-6"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="block">
                          <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
                            <Upload className="w-8 h-8 text-secondary mx-auto mb-2" />
                            <p className="text-sm text-secondary">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-secondary mt-1">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-bold text-on-surface">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-bold text-on-surface">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-bold text-on-surface">
                Bio
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-secondary" />
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <p className="text-xs text-secondary">
                {bio.length} / {BIO_MAX_LENGTH} characters
              </p>
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-bold text-on-surface">
                  Country
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-bold text-on-surface">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border-2 border-transparent focus:border-primary outline-none text-on-surface transition-colors"
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="flex-1"
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
                {!loading && <Save className="w-4 h-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  if (user?.profile) {
                    setFirstName(user.profile.firstName || '');
                    setLastName(user.profile.lastName || '');
                    setBio(user.profile.bio || '');
                    setCountry(user.profile.country || '');
                    setCity(user.profile.city || '');
                    setAvatarUrl(user.profile.avatarUrl || store.getAvatarUrl());
                  } else {
                    setFirstName('');
                    setLastName('');
                    setBio('');
                    setCountry('');
                    setCity('');
                    setAvatarUrl('');
                  }
                  setAvatarFile(null);
                  setAvatarPreview('');
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
