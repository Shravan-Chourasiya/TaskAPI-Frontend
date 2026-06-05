import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiInstance } from '@/lib/axiosInstance';
import { API_ENDPOINTS } from '@/constants';
import { toast } from 'sonner';

interface ApiKeyCreationFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ApiKeyCreationForm = ({ onClose, onSuccess }: ApiKeyCreationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    env: 'development' as 'production' | 'development' | 'test',
    scopes: [] as string[],
    allowedIPs: ''
  });
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const handleScopeToggle = (scope: string) => {
    setFormData(prev => ({
      ...prev,
      scopes: prev.scopes.includes(scope)
        ? prev.scopes.filter(s => s !== scope)
        : [...prev.scopes, scope]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Name and description are required');
      return;
    }

    if (formData.scopes.length === 0) {
      toast.error('At least one scope is required');
      return;
    }

    try {
      setCreating(true);
      const allowedIPsArray = formData.allowedIPs
        .split(',')
        .map(ip => ip.trim())
        .filter(ip => ip.length > 0);

      const response = await apiInstance.post(API_ENDPOINTS.APIKEY.CREATE, {
        name: formData.name,
        description: formData.description,
        env: formData.env,
        scopes: formData.scopes,
        allowedIPs: allowedIPsArray
      });

      if (response.data?.data?.apiKey) {
        setCreatedKey(response.data.data.apiKey);
        toast.success(response.data?.message || 'API key created successfully!');
      } else {
        toast.success('API key created successfully!');
        onSuccess();
        onClose();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create API key'
        : 'Failed to create API key';
      toast.error(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  const handleCopyAndClose = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey);
      toast.success('API key copied to clipboard!');
    }
    onSuccess();
    onClose();
  };

  if (createdKey) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-green-600 mb-2">API Key Created Successfully!</h3>
            <p className="text-sm text-gray-600">Copy your API key now. You won't be able to see it again!</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <p className="text-xs text-gray-500 mb-2">Your API Key</p>
            <p className="font-mono text-sm break-all">{createdKey}</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCopyAndClose}
              className="flex-1 bg-[#004e47] text-white hover:bg-[#004e47]/90"
            >
              Copy & Close
            </Button>
            <Button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Create New API Key</h3>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Key Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Production Key"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004e47]"
              disabled={creating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this key will be used for..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004e47]"
              disabled={creating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="environment-select">
              Environment *
            </label>
            <select
              id="environment-select"
              title="Select environment"
              value={formData.env}
              onChange={(e) => setFormData({ ...formData, env: e.target.value as 'production' | 'development' | 'test' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004e47]"
              disabled={creating}
            >
              <option value="development">Development</option>
              <option value="test">Test</option>
              <option value="production">Production</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Scopes * (Select at least one)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['read', 'write', 'delete', 'admin'].map((scope) => (
                <label key={scope} className="flex items-center gap-2 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.scopes.includes(scope)}
                    onChange={() => handleScopeToggle(scope)}
                    className="w-4 h-4 text-[#004e47] focus:ring-[#004e47]"
                    disabled={creating}
                  />
                  <span className="text-sm capitalize">{scope}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Allowed IPs (Optional)
            </label>
            <input
              type="text"
              value={formData.allowedIPs}
              onChange={(e) => setFormData({ ...formData, allowedIPs: e.target.value })}
              placeholder="192.168.1.1, 10.0.0.1 (comma-separated)"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004e47]"
              disabled={creating}
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to allow all IPs</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={creating}
              className="flex-1 bg-[#004e47] text-white hover:bg-[#004e47]/90"
            >
              {creating ? 'Creating...' : 'Create API Key'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              disabled={creating}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyCreationForm;
