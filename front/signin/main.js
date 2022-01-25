#!/usr/bin/node
const LOCALURL = 'http://127.0.0.1:8000/api/v1/user'

const LogInComp = Vue.component('sign-in', {
    template: `
    <div class="main">

        <!-- Sing in  Form -->
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"></figure>
                        <a href="http://127.0.0.1:5500/front/signup/index.html" class="signup-image-link">Create an account</a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign in</h2>
                        <form
                        class="register-form"
                        id="login-form"
                        @submit="checkInputs"
                        >
                            <div class="form-group">
                                <label for="your_email"><i class="zmdi zmdi-email"></i></label>
                                <input v-model="user.email" type="text" name="your_email" id="your_email" placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input v-model="user.password" type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <p v-if="errors.length">
                                <ul>
                                    <li v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
    data () {
        return {
            user: {
                email: null,
                password: null
            },
            errors: [],
            userResponse: null,
        }
    },
    methods: {
        checkInputs: function (e) {
            this.errors = [];

            if (!this.user.password) {
                this.errors.push("The password field is mandatory.");
            }
            if (!this.user.email) {
                this.errors.push('The email field is mandatory');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('The email must be valid');
            }
            if (this.userResponse) {
                this.errors.push("The user does not exist");
            }
            if (!this.errors.length) {
                this.sendAuth();
            }
            e.preventDefault();
        },
        validEmail(email) {
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        sendAuth() {
            const URL = `${LOCALURL}/log_in`
            fetch(URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.user)
                }).then((response) => {
                    if (!response.ok) {
                        this.errors.push('The user does not exist')
                    }
                    else {
                        response.json().then((data) => {
                            this.userResponse = data
                            console.log(this.userResponse)
                            localStorage.setItem("userId", this.userResponse.id)
                            localStorage.setItem("userEmail", this.user.email);
                            location.href = "http://127.0.0.1:5500/front/form/index.html";
                        });
                    }
            });
        },  
        exportUser() {
            return this.user;
        }
    },
    mounted() {
    }
})
