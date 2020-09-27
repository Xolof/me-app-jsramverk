import Vue from 'vue';
// import eventBus from "../modules/EventBus";

const presentation = Vue.component("presentation", {
    template: `
    <div class="presentation">
        <vue-simple-markdown :source="presentationText" id="markdown"></vue-simple-markdown>
    </div>
    `,
    methods: {
        getPresentation() {
            fetch("https://me-api.oljo.me/")
                .then(res => res.json())
                .then(data => {
                    if (data.data.text) {
                        return this.presentationText = data.data.text;
                    }
                    this.presentationText = "Här kommer snart en presentation.";
                });
        }
    },
    data() {
        return {
            presentationText: ""
        };
    },
    mounted() {
        this.getPresentation();
    }
});

export default {
    components: {
        "presentation": presentation
    }
};
