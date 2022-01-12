#!/usr/bin/node

const BASEURL = 'http://127.0.0.1:8000/api/v1/user'
const SignUpComp = Vue.component('sign-up', {
    template: `
    <div class="main">

        <!-- Sign up form -->
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form
                        id="register-form"
                        class="register-form"
                        @submit="checkInputs">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input v-model="name" type="text" name="name" id="name" placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input v-model="user.email" type="text" name="email" id="email" placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label><i class="zmdi zmdi-lock"></i></label>
                                <input v-model="fisrtPassword" type="password" name="pass" id="pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label><i class="zmdi zmdi-lock-outline"></i></label>
                                <input v-model="repeated" type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                            </div>
                            <p class="errors" v-if="errors.length">
                                <b>Please correct the following errors:</b>
                                <ul class="alert">
                                    <li class="error" v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="images/signup-image.jpg" alt="sing up image"></figure>
                        <a href="http://127.0.0.1:5500/front/signin/index.html" class="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>

    </div>
    `,
    data () {
        return {
            user: {
                "first_name": null,
                "last_name": null,
                "password": null,
                "email": null
            },
            name: null,
            fisrtPassword: null,
            repeated: null,
            errors: [],
            statusResponse: null
        }
    },
    methods: {
        checkInputs: function (e) {
            console.log(e)
            this.errors = [];

            if (!this.name) {
                this.errors.push('The name field is mandatory');
            }
            if (!this.fisrtPassword) {
                this.errors.push('The password field is mandatory');
            }
            if (this.fisrtPassword) {
                if (this.fisrtPassword.length < 8) {
                    this.errors.push('The password must contain more than 8 characters');
                }
                if (this.fisrtPassword.search(/(?=.*[!@#$%^&*\-_+=.;,])/) != 0) {
                    this.errors.push('The password must contain one special character: !@#$%^&*\-_+=.;,');
                }
            }
            if (!this.user.email) {
                this.errors.push('The email field is mandatory');
            }
            if (!this.validEmail(this.user.email)) {
                this.errors.push('The email must be valid');
            }
            if (!this.repeated) {
                this.errors.push('Please repeat password');
            }
            if (this.repeated) {
                if (this.repeated != this.fisrtPassword) {
                    this.errors.push('Passwords don\'t match');
                }
                else {
                    this.user.password = this.fisrtPassword;
                }
            }
            if (!this.errors.length) {
                this.user.password = this.fisrtPassword
                this.splitName();
                this.createUser();
                this.changeToForm();
            }
            e.preventDefault();
        },
        createUser () {
            const URL = `${BASEURL}/sign_up`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.user)
            })
            .then(response => {
                if (!response.ok) {
                    this.errors.push('The email already exists');
                }
                else {
                    console.log('User created successfully')
                }
            })
        },
        splitName () {
            let name = this.name
            let stringLastName = ''
            if (name.includes(' ')) {
                let arrayName = name.split(' ')
                this.user.first_name = arrayName[0];
                for (last_name in arrayName) {
                    stringLastName = stringLastName + last_name + ' ';
                }
                this.user.last_name = stringLastName;
            }
            else {
                this.user.first_name = name;
                this.user.last_name = '';
            }
        },
        validEmail(email) {
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        changeToForm() {
            location.href = "http://127.0.0.1:5500/front/form/index.html";
        }
    },
    mounted() {
        // this.createUser()
    }
})
