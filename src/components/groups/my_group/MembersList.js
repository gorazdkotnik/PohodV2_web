import React from 'react';

export default function MembersList({ user }) {
  return (
    <div className="my-5">
      <h2 className="text-xl font-bold mb-3">Člani skupine</h2>
      <div>
        {user.group.members.map(member => (
          <div
            key={member.user_id}
            className="border-2 p-4 flex justify-between items-center mb-1"
          >
            <span>
              {member.first_name} {member.last_name}
            </span>
            {member.user_id !== user.group.leader_id &&
              user.user_id === user.group.leader_id && (
                <button className="button-danger button-small">
                  Vrži iz skupine
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}