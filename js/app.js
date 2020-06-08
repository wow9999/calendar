weekends = [];
let selectedDay = [];
month.forEach((item) => {
    let weekend = [];
    item.weeks.forEach((i) => {
        if (i[5] && i[6]) {
            weekend.push(i[5]);
            weekend.push(i[6])
        }
    });
    weekends.push({
        name: item.name,
        weekend: weekend
    });
    weekend = [];
    selectedDay.push([]);
});
let useDays = 0;
new Vue({
    el: '#app',

    data: {
        months: month,
        weekends: weekends,
        useDays: useDays,
        selectedDays: selectedDay,
        showModal: false,
        showPrompt: false,
        dragging: false,
        modalTrust: false,
        periods: [[]],
        trustPeriods: false,
        trustSend: false,
        period: 1,
        changeColor: false,
        sent: false
    },

    methods: {
        even: function (numbers) {
            return numbers.filter(function (number) {
                return number
            })
        },

        weekendTrust: function (name, day) {
            for (let i = 0; i < this.weekends.length; i++) {
                if (name === this.weekends[i].name) {
                    for (let j = 0; j < this.weekends[i].weekend.length; j++) {
                        if (day === this.weekends[i].weekend[j]) {
                            return true
                        }
                    }
                }
            }
        },

        takeSelectedDays: function () {
            this.period = 1;
            this.months.forEach((month, index) => {
                let selMonth = this.selectedDays[index];
                let monthNum = index + 1;
                month.weeks.forEach(week => {
                    week.forEach(day => {
                        if (day.selectingDaysTrust) {
                            selMonth.push(day.number)
                        }
                    })
                });

                if (selMonth.length > 0) {
                    selMonth.period = this.period;
                    if (selMonth[0] >= 10) {
                        monthNum >= 10 ? selMonth.datestart = selMonth[0] + "-" + monthNum + "-2020" : selMonth.datestart = selMonth[0] + "-0" + monthNum + "-2020"
                    } else {
                        monthNum >= 10 ? selMonth.datestart = "0" + selMonth[0] + "-" + monthNum + "-2020" : selMonth.datestart = "0" + selMonth[0] + "-0" + monthNum + "-2020"
                    }
                    if (selMonth[selMonth.length - 1] >= 10) {
                        monthNum >= 10 ? selMonth.dateend = selMonth[selMonth.length - 1] + "-" + monthNum + "-2020" : selMonth.dateend = selMonth[selMonth.length - 1] + "-0" + monthNum + "-2020"
                    } else {
                        monthNum >= 10 ? selMonth.dateend = "0" + selMonth[selMonth.length - 1] + "-" + monthNum + "-2020" : selMonth.dateend = "0" + selMonth[selMonth.length - 1] + "-0" + monthNum + "-2020"
                    }
                    this.period += 1;
                }
            });
            console.log(this.selectedDays)
        },

        doDrag: function (n) {
            if (this.dragging) {
                n.selectingDaysTrust = !n.selectingDaysTrust;
                n.selectingDaysTrust ? this.useDays++ : this.useDays--;
            }
        },

        selectingDays: function (n) {
            if (!this.sent) {
                n.selectingDaysTrust = !n.selectingDaysTrust;
                n.selectingDaysTrust ? this.useDays++ : this.useDays--
            }
        },

        calcPeriodsDays: function (start, end) {
            let startDate = parseInt(start.split("-"));
            let endDate = parseInt(end.split("-"));
            let result = 0;
            if (startDate !== 1) {
                result = endDate - startDate + 1;
                result < 14 ? this.trustPeriods = false : this.trustPeriods = true;
                return result
            }
            endDate < 14 ? this.trustPeriods = false : this.trustPeriods = true;
            return endDate
        },

        unselectDay: function (n) {
            if (n.selectingDaysTrust && this.useDays === 31 && !this.sent) {
                n.selectingDaysTrust = false;
                this.useDays--
            }
        },

        clearSelectedDays: function () {
            this.selectedDays.forEach((item, index) => {
                this.selectedDays[index] = []
            });
        },

        sentTrust: function (a, b) {
            if (a === true && b === true) {
                return true
            }
        },
    },

    computed: {
        calcDays: function () {
            return 31 - this.useDays
        },
    },
});


