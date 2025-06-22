import React, { useState, useMemo } from 'react';

function GroupManagement() {
  // Mock Group Data
  const [groups, setGroups] = useState([
    {
      id: 'g1',
      name: 'Team Project Alpha',
      description: 'Main communication channel for Project Alpha development.',
      members: [
        { id: 'u1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/40?img=1' },
        { id: 'u2', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/40?img=2' },
        { id: 'u3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/40?img=3' },
        { id: 'u4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/40?img=4' },
      ],
      createdAt: '2023-01-15',
    },
    {
      id: 'g2',
      name: 'DevOps Squad',
      description: 'Dedicated channel for DevOps team discussions and updates.',
      members: [
        { id: 'u1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/40?img=1' },
        { id: 'u5', name: 'Eve Taylor', avatar: 'https://i.pravatar.cc/40?img=9' },
      ],
      createdAt: '2023-03-20',
    },
    {
      id: 'g3',
      name: 'Design Team Brainstorm',
      description: 'Creative hub for UI/UX concepts and feedback.',
      members: [
        { id: 'u3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/40?img=3' },
        { id: 'u6', name: 'Frank White', avatar: 'https://i.pravatar.cc/40?img=10' },
      ],
      createdAt: '2023-05-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(groups[0] || null); // Initially select the first group

  const filteredGroups = useMemo(() => {
    return groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groups, searchTerm]);

  const handleCreateGroup = () => {
    alert('Opening "Create New Group" modal... (Simulation)');
    // In a real app, this would open a modal to input group name, description, and select initial members.
  };

  const handleAddMember = (groupId) => {
    const newMemberName = prompt('Enter name of user to add (e.g., New User):');
    if (newMemberName) {
      setGroups(prevGroups => prevGroups.map(group => {
        if (group.id === groupId) {
          const newMember = {
            id: `u${Date.now()}`,
            name: newMemberName,
            avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}` // Random avatar
          };
          const updatedMembers = [...group.members, newMember];
          // Update selectedGroup if it's the current one
          if (selectedGroup && selectedGroup.id === groupId) {
            setSelectedGroup(prev => ({ ...prev, members: updatedMembers }));
          }
          alert(`${newMemberName} added to ${group.name}.`);
          return { ...group, members: updatedMembers };
        }
        return group;
      }));
    }
  };

  const handleRemoveMember = (groupId, memberId, memberName, groupName) => {
    if (window.confirm(`Are you sure you want to remove ${memberName} from ${groupName}?`)) {
      setGroups(prevGroups => prevGroups.map(group => {
        if (group.id === groupId) {
          const updatedMembers = group.members.filter(member => member.id !== memberId);
          // Update selectedGroup if it's the current one
          if (selectedGroup && selectedGroup.id === groupId) {
            setSelectedGroup(prev => ({ ...prev, members: updatedMembers }));
          }
          alert(`${memberName} removed from ${group.name}.`);
          return { ...group, members: updatedMembers };
        }
        return group;
      }));
    }
  };

  const handleLeaveGroup = (groupId, groupName) => {
    if (window.confirm(`Are you sure you want to leave "${groupName}"?`)) {
      setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
      if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup(null); // Clear selected group if leaving the current one
      }
      alert(`You have left "${groupName}".`);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-inter text-gray-800">
      <style>
        {`
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0; /* Light gray track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a0aec0; /* Medium gray thumb */
          border-radius: 10px;
          border: 2px solid #e2e8f0; /* Border to match track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096; /* Darker gray on hover */
        }
        `}
      </style>
      {/* Left Sidebar for Group List */}
      <div className="w-80 bg-gray-800 text-white flex flex-col border-r border-gray-700 shadow-lg flex-shrink-0">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold">YOUR GROUPS</h2>
          <button
            onClick={handleCreateGroup}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300 flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            NEW GROUP
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`flex flex-col p-4 border-b border-gray-700 cursor-pointer transition-colors duration-200
                  ${selectedGroup?.id === group.id ? 'bg-gray-700 border-l-4 border-blue-500' : 'hover:bg-gray-700/50'}
                `}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">👥</span> {/* Generic group icon */}
                  <h3 className="font-semibold text-lg text-white">{group.name}</h3>
                </div>
                <p className="text-sm text-gray-400 truncate">{group.description}</p>
                <p className="text-xs text-gray-500 mt-1">Members: {group.members.length}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center p-4">No groups found.</p>
          )}
        </div>
      </div>

      {/* Main Content Area for Selected Group Details */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedGroup ? (
          <>
            <div className="bg-gray-50 p-6 border-b border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h2>
                <p className="text-gray-600 text-sm">{selectedGroup.description}</p>
                <p className="text-gray-500 text-xs mt-1">Created: {new Date(selectedGroup.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleLeaveGroup(selectedGroup.id, selectedGroup.name)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 text-sm"
              >
                LEAVE GROUP
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Group Members Section */}
              <div className="bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">GROUP MEMBERS ({selectedGroup.members.length})</h3>
                  <button
                    onClick={() => handleAddMember(selectedGroup.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300 flex items-center text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    ADD MEMBER
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedGroup.members.map(member => (
                    <div key={member.id} className="flex items-center p-3 bg-white rounded-md shadow-sm border border-gray-200">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=NA"; }}
                      />
                      <span className="flex-1 text-gray-800 font-medium">{member.name}</span>
                      <button
                        onClick={() => handleRemoveMember(selectedGroup.id, member.id, member.name, selectedGroup.name)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Remove Member"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Settings / Info (Placeholder for more details) */}
              <div className="bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">GROUP SETTINGS & INFO</h3>
                <p className="text-gray-600">
                  This section would contain more detailed group settings like notification preferences, group admin roles,
                  or options to archive the group.
                </p>
                <button
                  onClick={() => alert('Opening detailed group settings... (Simulation)')}
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm"
                >
                  EDIT GROUP SETTINGS
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 italic p-6">
            Select a group from the left to view its details.
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupManagement;