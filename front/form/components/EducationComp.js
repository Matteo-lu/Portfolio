let EducationComp = {
    template: `
    <div class="form-content">
        <form
        id="education-form"
        class="education-form">
            <div class="title">
                <h2>Education</h2>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" id="title" placeholder="Title Achieved"/>
            </div>
            <div class="form-group">
                <label for="Finish">Year</label>
                <input type="month" name="finish" id="Finish" min="2000-01"/>
            </div>
            <div class="form-group">
                <label>Institute</label>
                <input type="text" name="institute" id="institute" placeholder="Eg. Holberton School"/>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" name="description" id="description" placeholder="Briefly write about this learning experience"/>
            </div>
            <div class="form-group form-button">
                <input type="submit" name="signup" id="education-id" class="form-submit" value="Save"/>
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
