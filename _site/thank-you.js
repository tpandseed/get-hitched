function userEvent(userObj) {
    // console.log('user event', userObj);
    window.dispatchEvent(new CustomEvent('user-login', { detail: userObj }));
}

netlifyIdentity.on('init', u => userEvent(u));
netlifyIdentity.on('login', u => userEvent(u));
netlifyIdentity.on('logout', u => userEvent(u));

function thankYouContext() {
    return {
        user: null,
        setUser(userInfo) {
            this.user = userInfo;
        },
        userDisplay() {
            if (this.user)
                return this.user.user_metadata.full_name;
            return 'everyone';
        },
        userFirstName() {
            if (this.user)
                return this.user.user_metadata.full_name.split(' ')[0];
            return ''
        },
        thanksMessage: "Thanks!",
        async initFunc() {
            console.log('yoyo');

            const res = await fetch('/api/get-thanks', {
                method: 'POST'
            });

            if (res.ok) {
                const text = await res.text();
                this.thanksMessage = text;
            }
        }
    }
}