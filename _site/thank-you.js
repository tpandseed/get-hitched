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
        thanksMessage: "Thanks!",
        userSpecifiedName: null,
        async setUser(userInfo) {
            if (this.user)
                return;

            this.user = userInfo;

            const thankYouInfo = await this.getThanks();
            if (thankYouInfo) {
                this.userSpecifiedName = thankYouInfo.name;
                this.thanksMessage = thankYouInfo.message[0];
            }
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
        async getThanks() {
            const res = await fetch('/api/get-thanks', {
                method: 'POST', body: JSON.stringify({ 'email': this.user.email })
            });

            if (res.ok) {
                const thankYouInfo = await res.json();
                return thankYouInfo;
            }
            else {
                const error = await res.text();
                console.warn(`error getting thanks: ${error}`);
            }
        }
    }
}