import Vue from 'vue';
// import eventBus from "../modules/EventBus";

const reports = Vue.component("reports", {
    template: `
    <div>
        <nav class="reports-nav">
          <ul>
            <li v-for="n in 7" @click="getReport(n)">
                <a href="#" :class="{ active: reportId === n }">kmom0{{ n }}</a>
            </li>
          </ul>
        </nav>

        <div v-if="mode === 'read'" class="report">
            <div class="report-text">
                <vue-simple-markdown :source="currentReport"></vue-simple-markdown>
            </div>

            <button
                v-if="reportExists && this.$root.$data.loggedIn"
                @click="switchToEdit"
                >Redigera</button>

            <button
                v-if="!reportExists && this.$root.$data.loggedIn"
                @click="switchToAdd"
                >Skriv rapport</button>
        </div>

        <div v-if="mode === 'edit'" class="report">
            <h2>Redigera</h2>
            <form v-on:submit.prevent>

                <textarea
                    @change="setNewText($event.target.value)"
                    id="text"
                    name="text"
                    ref="text"
                    rows="5"
                    cols="30"
                    :value="currentReport"
                />

                <input @click="editReport()"  type="submit" name="submit" value="Spara"/>
            </form>
        </div>

        <div v-if="mode === 'add'" class="report">
            <h2>Lägg till redovisning</h2>
            <form v-on:submit.prevent>

                <textarea
                    @change="setNewText($event.target.value)"
                    id="text"
                    name="text"
                    ref="text"
                    rows="5"
                    cols="30"
                />

                <input @click="addReport()" type="submit" name="submit" value="Spara"/>
            </form>
        </div>
    </div>
    `,
    methods: {
        getReport(week) {
            fetch("http://localhost:1337/reports/week/" + week)
            .then(res => res.json())
            .then(data => {
                if (data.data.report) {
                    this.reportExists = true;
                    this.reportId = week;
                    this.switchToRead();
                    return this.currentReport = data.data.report.report;
                }
                this.currentReport = "Här kommer snart en redovisningstext.";
                this.reportExists = false;
                this.reportId = week;
                this.switchToRead();
            })
        },
        addReport() {
            const requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            requestHeaders.append("x-access-token", this.$root.$data.token);

            const myData = JSON.stringify({
                week: this.reportId,
                text: this.newText
            });
            fetch("http://localhost:1337/reports", {
                method: "POST",
                headers: requestHeaders,
                body: myData
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.currentReport = this.newText;
                this.reportExists = true;
                this.switchToRead();
            })
        },
        editReport() {
            const requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            requestHeaders.append("x-access-token", this.$root.$data.token);

            const myData = JSON.stringify({
                week: this.reportId,
                text: this.newText
            });
            fetch("http://localhost:1337/reports", {
                method: "PUT",
                headers: requestHeaders,
                body: myData
            })
            .then(() => {
                this.currentReport = this.newText;
                this.reportExists = true;
                this.switchToRead();
            })
        },
        switchToRead() {
            this.mode = "read";
        },
        switchToEdit() {
            this.mode = "edit";
        },
        switchToAdd() {
            this.mode = "add";
        },
        setNewText(value) {
            this.newText = value;
        },
    },
    data() {
        return {
            currentReport: "",
            reportExists: false,
            reportId: 1,
            mode: "read",
            newText: "",
        }
    },
    mounted() {
        this.getReport(1);
    }
});

export default {
    components: {
        "reports": reports
    }
}
