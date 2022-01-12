let IntroductionComp = {
    template: `
        <div class="form-content">
            <form
            id="introduction-form"
            class="register-form">
                <div class="title">
                    <h2>Introduction</h2>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" id="name" placeholder="First Name"/>
                    </div>
                    <div class="form-group">
                        <label>Last name</label>
                        <input type="text" name="last" id="last" placeholder="Last Name"/>
                    </div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" name="email" id="email" placeholder="Eg. example@email.com"/>
                </div>
                <div class="form-group">
                    <label>Phone number</label>
                    <input type="text" name="phone" id="phone" placeholder="Eg. 8888888888"/>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" name="adress" id="city" placeholder="City of residence"/>
                    </div>
                    <div class="form-group">
                        <label>Country</label>
                        <input type="text" name="adress" id="state" placeholder="Country of residence"/>
                    </div>
                </div>
                <div class="form-group">
                    <label>Job title</label>
                    <input type="text" name="headline" id="headline" max="500" placeholder="Eg. Software Developer"/>
                </div>
                <div class="form-group">
                    <label>About yourself</label>
                    <input type="password" name="description" id="re_pass" placeholder="Please enter details about yourself within 500 characters"/>
                </div>
                <div class="form-group">
                    <div class="one-line-group">
                        <div class="social">
                            <label>Github</label>
                            <input type="url" name="github" placeholder="Profile github link">
                        </div>
                        <div class="social">
                            <label>Twitter</label>
                            <input type="url" name="twitter" placeholder="Profile twitter link">
                        </div>
                        <div class="social">
                            <label>Linkedin</label>
                            <input type="url" name="linkedin" placeholder="Profile linkedin link">
                        </div>
                    </div>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label for="formFile" class="form-label">Upload Avatar or Photo</label>
                        <input class="form-control" type="file" id="form-image" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label for="formFile" class="form-label">Upload your CV</label>
                        <input class="form-control" type="file" id="form-file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*">
                    </div>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="signup" class="form-submit" value="Save"/>
                </div>
            </form>
        </div>
    `,
    data () {
        return {
            title: 'Hola desde data de form'
        }
    },
    methods: {
    },
    mounted() {
    }
}
