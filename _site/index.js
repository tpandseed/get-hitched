function userEvent(userObj) {
    // console.log('user event', userObj);
    window.dispatchEvent(new CustomEvent('user-login', { detail: userObj })); 
}

netlifyIdentity.on('init', u => userEvent(u));
netlifyIdentity.on('login', u => userEvent(u));
netlifyIdentity.on('logout', u => userEvent(u));

function stuff() {
    return {
        user: null,
        setUser(userInfo) {
            this.user = userInfo;
        },
        click() {
            console.log(this.user);
        },
        guests: [
        ],
        currentGuest: {
            name: '',
            stayingOver: '',
            bubble: '',
            dietary: '',
            wine: '',
            booze: '',
            notes: ''
        },
        addGuest(nextTick) {

            if (!this.currentGuest.name)
            {
                console.log('clicked with no input');
                return;
            }

            console.log('add');

            this.guests.push(Object.assign({}, this.currentGuest));

            this.currentGuest =  {
                name: '',
                stayingOver: '',
                bubble: '',
                dietary: '',
                wine: '',
                booze: '',
                notes: ''
            }

            nextTick(() => fullpage_api.reBuild());
        },
        deleteGuest(guest, nextTick) {
            this.guests = this.guests.filter(g => g !== guest);

            nextTick(() => fullpage_api.reBuild());
        },
        submit() {
            console.log(this.guests);
            this.guests.forEach(element => {
                console.log(element.name);
            });
        }
    }
}