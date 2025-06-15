export const GetByRole = {
  loginUsername: {
    name: "textbox",
    options: { name: "Email address" },
  },
  loginPassword: {
    name: "textbox",
    options: { name: "Password" },
  },
  loginSubmit: {
    name: "button",
    options: { name: "Log in" },
  },
} as const;

export const GetByLocator = {
  webAppSpinner: ".spinner__wrapper",
} as const;

export const GetByDtl = {
  // Admin App
  adminHomeMenuButton: "admin-navigation-home",
  adminAvatarMenuButton: "admin-navigation-avatar-menu",
  adminLogoutButton: "admin-navigation-logout",

  // Web App
  webAppAvatarMenuButton: "topbar__user-dropdown",
  webAppLogoutButton: "sp-dropdown-item-log-out",
};

export const GetByLabel = {
  webAppHomeMenuButton: "Home",
};
