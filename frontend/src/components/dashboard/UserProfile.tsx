import React from 'react';
import { Settings, Bell } from 'lucide-react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      title={enabled ? 'Disable' : 'Enable'}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
      onClick={onChange}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
      />
    </button>
  );
}

export function UserProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const handleToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6 text-gray-600" />
        <span>Settings</span>
      </div>
      <div className="flex items-center space-x-2">
        <Bell className="h-6 w-6 text-gray-600" />
        <Toggle enabled={notificationsEnabled} onChange={handleToggle} />
      </div>
    </div>
  );
}