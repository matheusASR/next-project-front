/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import React from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

export default function Profile({ user, setUser }: any) {
  return (
    <div className="bg-white">
      <div className="divide-y divide-gray-200">
        <EditProfile user={user} setUser={setUser} />
        <ChangePassword user={user} />
        <DeleteProfile user={user} />
      </div>
    </div>
  );
}
