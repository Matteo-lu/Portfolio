let ProjectsComp = {
    template: `
        <div class="form-content">
            <form
            id="project-form"
            class="project-form">
                <div class="title">
                    <h2>Project</h2>
                </div>
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" name="project-name" id="project-name" placeholder="Eg. Web application ..."/>
                </div>
                <div class="form-group">
                    <label>URL Project Image</label>
                    <input type="url" name="url" placeholder="Link to roject image">
                </div>
                <div class="form-group">
                        <label>Demo video</label>
                        <input type="demo" name="demo" placeholder="Link to demo video">
                    </div>
                <div class="form-group">
                    <label>Github link</label>
                    <input type="url" name="github-link" id="github-link" placeholder="Project Github link"/>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" name="description" id="project-description" placeholder="Project description"/>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="project-id" class="form-submit" value="Save"/>
                </div>
            </form>
        </div>
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
