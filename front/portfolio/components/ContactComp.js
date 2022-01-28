let ContactComp = {
    template: `
    <section class="paralax-mf footer-paralax bg-image sect-mt4 route" style="background-image: url(img/overlay-bg.jpg)" v-if="userInformation">
        <div class="overlay-mf"></div>
        <div class="container">
        <div class="row">
            <div class="col-sm-12">
            <div class="contact-mf">
                <div id="contact" class="box-shadow-full">
                <div class="row">
                    <div class="col-md-6">
                        <div class="title-box-2">
                            <h5 class="title-left">
                            Send Message Us
                            </h5>
                            </div>
                            <div>
                                <form
                                action=""
                                role="form"
                                class="contactForm"
                                >
                                <div id="sendmessage" v-show="messageSend">Your message has been sent. Thank you!</div>
                                <div id="errormessage"></div>
                                <div class="row" v-show="!messageSend">
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <input v-model="message.name" type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                            <div class="validation"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <input v-model="message.email" type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                            <div class="validation"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                        <input v-model="message.subject" type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                        <div class="validation"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <textarea v-model="message.message" class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                                            <div class="validation"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <button @click="entrypoint" type="button" class="button button-a button-big button-rouded">Send Message</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="title-box-2 pt-4 pt-md-0">
                                <h5 class="title-left">
                                    Get in Touch
                                </h5>
                            </div>
                        <div class="more-info">
                            <p class="lead">
                                If you are interested in contacting me or want to know about additional information, fill out the form and I will contact you as soon as possible.
                            </p>
                            <p class="lead">
                            You can also contact me through the information below or by clicking the icons to access my social networks.
                            </p>
                            <ul class="list-ico">
                                <li><span class="ion-ios-location"></span>{{ userInformation.Location }}</li>
                                <li><span class="ion-ios-telephone"></span>{{ userInformation.phone }}</li>
                                <li><span class="ion-email"></span>{{ userInformation.email }}</li>
                            </ul>
                        </div>
                        <div class="socials">
                            <ul>
                                <li><a :href="userInformation.linkedin"><span class="ico-circle"><i class="fab fa-linkedin-in"></i></span></a></li>
                                <li><a :href="userInformation.twitter"><span class="ico-circle"><i class="fab fa-twitter"></i></span></a></li>
                                <li><a :href="userInformation.github"><span class="ico-circle"><i class="fab fa-github"></i></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <footer>
        <div class="container">
            <div class="row">
            <div class="col-sm-12">
                <div class="copyright-box">
                <p class="copyright">&copy; Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
                <div class="credits">
                    <!--
                    All the links in the footer should remain intact.
                    You can delete the links only if you purchased the pro version.
                    Licensing information: https://bootstrapmade.com/license/
                    Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=DevFolio
                    -->
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </footer>
    </section>
    `,
    created () {
        this.getIntroducton();
    },
    data () {
        return {
            userId: sessionStorage.getItem("userId"),
            userInformation: null,
            message: {
                userEmail: sessionStorage.getItem("userEmail"),
                subject: null,
                message: null,
                email: null,
                name: null,
            },
            messageSend: false,
        }
    },
    methods: {
        entrypoint () {
            this.MessageSend();
            this.sendMessage();
        },
        getIntroducton () {
            fetch(`${BASEURL}/user/information/` + this.userId)
            .then(response => response.json())
            .then(data => this.userInformation = data);
        },
        sendMessage() {
            const URL = `${BASEURL}/message`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.message)
            })
            .then(response => response.json())
            .then(data => {
                this.messageSend = true;
            })
            .catch(error => {
                console.error(error)
            })
        },
        MessageSend () {
            this.messageSend = true
        }
    },
    mounted() {
    },
    components: {
    }
}
