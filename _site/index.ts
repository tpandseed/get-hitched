import { User } from "netlify-identity-widget";

const zeroDay = new Date('2020-09-15T16:20:00');

function userEvent(userObj: User | null) {
    window.dispatchEvent(new CustomEvent('user-login', { detail: userObj }));
}

declare var netlifyIdentity: { on: (event: string, user: { (u: User): void; }) => void; };

netlifyIdentity.on('init', u => userEvent(u));
netlifyIdentity.on('login', u => userEvent(u));
netlifyIdentity.on('logout', () => userEvent(null));

function calcDays() {
    return ((Date.now() - zeroDay.getTime()) / (1000 * 3600 * 24)).toFixed(5);
}

function stuff() {
    return {
        user: null as unknown as User,
        setUser(userInfo : User) {
            this.user = userInfo;
        },
        userDisplay() {
            if (this.user)
                return this.userFirstName();
            return 'everyone';
        },
        userFirstName() {
            if (this.user)
                return this.user.user_metadata.full_name.split(' ')[0];
            return ''
        },
        daysUntil: calcDays().toString(),
        dayTimer() {
            setInterval(() => {
                this.daysUntil = calcDays().toString();
            }, 1000);
        },
        click() {
            console.log(this.user);
        }
    }
}