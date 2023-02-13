
export const SETTINGS_OPTIONS = [
    {
        title: "Account",
        data: [
            {
                key: "EDIT",
                title: 'Edit Profile',
                icon: 'user',
                // onPress: () => navigation.navigate('Account', {screen: "EditProfile"}),
                chevron: true
            },
            {
                key: "PASSWORD",
                title: 'Change Password',
                icon: 'form-textbox-password',
                type: 'material-community',
                // onPress: () => navigation.navigate('Account', {screen: "ChangePassword"}),
                chevron: true
            },
            {
                key: "DELETE",
                title: 'Delete Account',
                icon: 'hand-wave-outline',
                type: 'material-community',
                color: "red",
                // onPress: () => onDeleteAccount(),
                chevron: false,
                // loading: isDeleting
            }
        ]
    },
    {
        title: "App Settings",
        data: [
            {
                key: "BLOCKED",
                title: 'Blocked Users',
                icon: 'user-slash',
                type: 'font-awesome-5',
                chevron: true
            },
            // {
            //     title: 'Notifications',
            //     icon: 'bell-o',
            //     type: 'font-awesome',
            //     chevron: true
            // }
        ]
    },
];
