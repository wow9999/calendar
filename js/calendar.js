let days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
];

let month = [
    {name: "Январь", daycount: 31, weeks: [[]]},
    {name: "Февраль", daycount: 29, weeks: [[]]},
    {name: "Март", daycount: 31, weeks: [[]]},
    {name: "Апрель", daycount: 30, weeks: [[]]},
    {name: "Май", daycount: 31, weeks: [[]]},
    {name: "Июнь", daycount: 30, weeks: [[]]},
    {name: "Июль", daycount: 31, weeks: [[]]},
    {name: "Август", daycount: 31, weeks: [[]]},
    {name: "Сентябрь", daycount: 30, weeks: [[]]},
    {name: "Октябрь", daycount: 31, weeks: [[]]},
    {name: "Ноябрь", daycount: 30, weeks: [[]]},
    {name: "Декбарь", daycount: 31, weeks: [[]]}
];
let dayStart = 2;
let weeksCount;
for (let j = 0; j < month.length; j++) {
    weeksCount = 0;
    for (let i = 1; i < month[j].daycount; i++) {
        month[j].weeks[weeksCount].push(i)
    }
    let weeksCounts = Math.round((month[j].weeks[0].length + 1) / 7);
    if (!(weeksCounts * 7 < month[j].weeks.length)) {
        weeksCounts++
    }
    month[j].weeks = [[]];
    for (let y = 0; y < weeksCounts; y++) {
        month[j].weeks.push([]);
    }
    for (let p = 1; p < month[j].daycount + 1; p++) {
        month[j].weeks[weeksCount].push({number: p, selectingDaysTrust: false});
        if (p % 7 === 0 && weeksCount < weeksCounts) {
            weeksCount++
        }
    }
    month[j].weeks.pop();
}



