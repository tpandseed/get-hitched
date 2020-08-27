const zeroDay = new Date('2020-09-15T16:20:00');

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
        userDisplay() {
            if (this.user)
                return this.user.user_metadata.full_name;
            return 'everyone';
        },
        daysUntil() {
            let timeLeft = zeroDay - Date.now();
            let days = timeLeft / (1000 * 3600 * 24)
            return days.toString();
        },
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
        stayingOverText() {
            return `${this.name}`;
        },
        addGuest() {

            if (!this.currentGuest.name) {
                console.log('clicked with no input');
                return;
            }

            console.log('add');

            this.guests.push(Object.assign({}, this.currentGuest));

            this.currentGuest = {
                name: '',
                stayingOver: '',
                bubble: '',
                dietary: '',
                wine: '',
                booze: '',
                notes: ''
            }
        },
        deleteGuest(guest) {
            this.guests = this.guests.filter(g => g !== guest);
        },
        submit() {

            const guests = [];

            this.guests.forEach(guest => {
                guests.push({
                    creator_email: this.user.email,
                    name: guest.name,
                    stayingOver: guest.stayingOver,
                    bubble: guest.bubble,
                    dietary: guest.dietary,
                    wine: guest.wine,
                    booze: guest.booze,
                    notes: guest.notes
                });
            });

            fetch('/.netlify/functions/upsert-guests', {
                method: 'POST', body: JSON.stringify(guests)
            })
                .then(res => {
                    if (!res.ok) {
                        console.error("couldn't save guests");
                    } else {
                        this.submitted = true;
                    }
                });
        },
        submitted: false,
        downloadCsv() {

        }
    }
}