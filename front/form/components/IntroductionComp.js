
let IntroductionComp = {
    template: `
        <div class="form-content">
            <form
            id="introduction-form"
            class="register-form"
            @submit="entryPoint">
                <div class="title">
                    <h2>Introduction</h2>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="first_name" type="text" name="name" id="name" placeholder="First Name"/>
                    </div>
                    <div class="form-group">
                        <label>Last name</label>
                        <input v-model="last_name" type="text" name="last" id="last" placeholder="Last Name"/>
                    </div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="information.email" type="text" name="email" id="email" placeholder="Eg. example@email.com"/>
                </div>
                <div class="form-group">
                    <label>Phone number</label>
                    <input v-model="information.phone" type="text" name="phone" id="phone" placeholder="Eg. 8888888888"/>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>City</label>
                        <input v-model="city" type="text" name="adress" id="city" placeholder="City of residence"/>
                    </div>
                    <div class="form-group">
                        <label>Country</label>
                        <input v-model="country" type="text" name="adress" id="state" placeholder="Country of residence"/>
                    </div>
                </div>
                <div class="form-group">
                    <label>Job title</label>
                    <input v-model="information.title" type="text" name="headline" id="headline"  placeholder="Eg. Software Developer"/>
                </div>
                <div class="form-group">
                    <label>About yourself</label>
                    <textarea name="textarea"rows="5" cols="132" maxlength="500" placeholder="Please enter details about yourself within 500 characters"></textarea>
                </div>
                <div class="form-group">
                    <div class="one-line-group">
                        <div class="social">
                            <label>Github</label>
                            <input v-model="information.github" type="text" name="github" placeholder="Profile github link">
                        </div>
                        <div class="social">
                            <label>Twitter</label>
                            <input v-model="information.twitter" type="text" name="twitter" placeholder="Profile twitter link">
                        </div>
                        <div class="social">
                            <label>Linkedin</label>
                            <input v-model="information.linkedin" type="text" name="linkedin" placeholder="Profile linkedin link">
                        </div>
                    </div>
                </div>
                <div class="errors">
                    <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="signup" class="form-submit" value="Save"/>
                </div>
            </form>
        </div>
    `,
    data () {
        return {
            information: {
                userEmail: localStorage.getItem("userEmail"),
                full_name: null,
                title: null,
                about: null,
                Location: null,
                email: null,
                phone: null,
                github: null,
                linkedin: null,
                twitter: null,
            },
            first_name: null,
            last_name: null,
            city: null,
            country: null,
            errors: []
        }
    },
    methods: {
        entryPoint(event) {
            this.errors = [];
            if (this.information.email) {
                if (!this.validEmail(this.information.email)) {
                    this.errors.push('The email must be valid');
                }
            }
            if (this.information.github) {
                if (!this.isValidHttpUrl(this.information.github)) {
                    this.errors.push('The github link must be a valid URL');
                }
            }
            if (this.information.twitter) {
                if (!this.isValidHttpUrl(this.information.twitter)) {
                    this.errors.push('The twitter link must be a valid URL');
                }
            }
            if (this.information.linkedin) {
                if (!this.isValidHttpUrl(this.information.linkedin)) {
                    this.errors.push('The linkedin link must be a valid URL');
                }
            }
            if (!this.errors.length) { 
                this.getFullName();
                this.getLocation();
                this.createInformation();
                this.$parent.showEdu();
            }
            event.preventDefault();
        },
        getFullName() {
            if (this.first_name && this.last_name) {
                this.information.full_name = this.first_name + ' ' + this.last_name
            } else if (this.first_name && !this.last_name) {
                this.information.full_name = this.first_name
            } else if (!this.first_name && this.last_name) {
                this.information.full_name = this.last_name
            }
        },
        getLocation() {
            if (this.city && this.country) {
                this.information.Location = this.city + ',' + ' ' + this.country
            } else if (this.city && !this.country) {
                this.information.Location = this.city
            } else if (!this.city && this.country) {
                this.information.Location = this.country
            }
        },
        createInformation() {
            const URL = `${BASEURL}/information`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.information)
            })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                }
                else {
                    console.error(response.error)
                }
            })
        },
        validEmail(email) {
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        isValidHttpUrl(string){
            let url;
            try {
                url = new URL(string);
            } catch (_) {
                return false;  
            }
            return true;
        }
    },
    mounted() {
        // window.localStorage.clear();
    }
}
