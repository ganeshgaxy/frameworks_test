export const Nav = {
    showpadLogin: (proxy?: string) => {
        return proxy ? `login` : 'login';
    },
    showpadAdminApp: (proxy?: string) => {
        return proxy ? `admin2/home` : 'admin2/home';
    },
    showpadWebApp: (proxy?: string) => {
        return proxy ? `webapp2/home` : 'webapp2/home';
    },
};
