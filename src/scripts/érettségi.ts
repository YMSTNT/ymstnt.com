class DaySubject {
  dateTime: Date;
  subject: string;
  type: string;

  constructor(dateTime, subject, type) {
    this.dateTime = dateTime;
    this.subject = subject;
    this.type = type;
  }
}

function updateDays() {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date("2023-05-08");
  const finalDate: Date = new Date("2023-07-01");

  const timeDiff: number = targetDate.getTime() - currentDate.getTime();
  const daysLeft: number = Math.ceil(timeDiff / (1000 * 3600 * 24));

  let exams: DaySubject[] = [
    new DaySubject(
      new Date("2023-05-08 09:00"),
      "Magyar nyelv és irodalom",
      "középszintű"
    ),
    new DaySubject(new Date("2023-05-09 09:00"), "Matematika", "középszintű"),
    new DaySubject(new Date("2023-05-10 09:00"), "Történelem", "középszintű"),
    new DaySubject(new Date("2023-05-11 09:00"), "Angol nyelv", "középszintű"),
    new DaySubject(new Date("2023-05-11 08:00"), "Informatika", "középszintű"),
    new DaySubject(
      new Date("2023-05-17 09:00"),
      "Informatika ismeretek",
      "középszintű és emelt"
    ),
    new DaySubject(new Date("2023-05-22 08:00"), "Informatika", "emelt"),
  ];

  if (currentDate < targetDate) {
    document.querySelector("#countdown").textContent =
      daysLeft.toString() + " nap";
  } else if (currentDate >= finalDate) {
    document.querySelector("#countdown-intro").textContent =
      "Vége az érettségi időszaknak.";
  } else {
    exams.forEach((element) => {
      if (element.dateTime.getDate() == currentDate.getDate()) {
        document.querySelector("#countdown-intro").textContent =
          "A mai érettségi vizsga:";
        document.querySelector("#countdown").textContent =
          element.subject + " (" + element.type + ")";
        document.querySelector("#when").textContent =
          "Kezdés: " +
          element.dateTime.toLocaleTimeString("hu-HU", {
            hour: "2-digit",
            minute: "2-digit",
          }) +
          "-kor";
      } else {
        document.querySelector("#countdown-intro").textContent = "Pihenőnap 🌙";
      }
    });
  }
}

let generatedLink: string;
let pressedButton: string;

updateDays();
formUpdate();



function formUpdate() {
  console.log("Form updated");
  let year = (<HTMLInputElement>document.querySelector("#year")).value;
  let period = (<HTMLInputElement>document.querySelector("#period")).value;
  let difficulty = (<HTMLInputElement>document.querySelector("#difficulty"))
    .value;
  let subject = (<HTMLInputElement>document.querySelector("#subject")).value;

  let generatedPeriod: string;
  let periodMonth: string;
  let generatedDifficulty: string;
  let generatedSubjects: string;
  let generatedFileType: string;
  let itFileType: string;

  if (period == "may") {
    generatedPeriod = "tavasz";
    periodMonth = "maj";
  } else {
    generatedPeriod = "osz";
    periodMonth = "okt";
  }

  if (difficulty == "medium") {
    generatedDifficulty = "kozep";
  } else {
    generatedDifficulty = "emelt";
  }

  if (subject == "it-office" || subject == "it") {
    (<HTMLInputElement>document.querySelector("#sourcefiles")).disabled = false;
    (<HTMLInputElement>document.querySelector("#solutionfiles")).disabled =
      false;
  } else {
    (<HTMLInputElement>document.querySelector("#sourcefiles")).disabled = true;
    (<HTMLInputElement>document.querySelector("#solutionfiles")).disabled =
      true;
  }

  let convertedYear: number = parseInt(year);

  switch (subject) {
    case "hungarian":
      generatedSubjects = "magyir";
      break;
    case "mathematics":
      generatedSubjects = "mat";
      break;
    case "history":
      generatedSubjects = "tort";
      break;
    case "english":
      generatedSubjects = "angol";
      break;
    case "it":
      generatedSubjects = "infoism";
      break;
    case "it-office":
      if (convertedYear <= 2011 && !(convertedYear == 2011 && period == "october")) {
        generatedSubjects = "info";
      } else {
        generatedSubjects = "inf";
      }
      break;
    default:
      break;
  }

  let linkPrefix: string = "https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok";

  switch (pressedButton) {
    case "task":
      generatedFileType = "fl.pdf";
      itFileType = "";
      break;
    case "sourcefiles":
      if (convertedYear >= 2005 && convertedYear <= 2008) {
        itFileType = "forras";
      } else {
        itFileType = "for";
      }
      generatedFileType = "fl.zip";
      break;
    case "solution":
      generatedFileType = "ut.pdf";
      itFileType = "";
      break;
    case "solutionfiles":
      if (convertedYear >= 2005 && convertedYear <= 2008) {
        itFileType = "megoldas";
      } else {
        itFileType = "meg";
      }
      generatedFileType = "ut.zip";
      break;
    default:
      generatedFileType = "fl.pdf";
      itFileType = "";
      break;
  }

  if (convertedYear > 2012) {
    linkPrefix = linkPrefix + '_';
  }

  let firstCharDifficulty: string = generatedDifficulty.charAt(0);
  let cutYear: string = year.slice(-2);

  let assembledPart: string;

  if (convertedYear == 2005 && period == "may") {
    assembledPart = `${year}${generatedPeriod}/${generatedDifficulty}/${firstCharDifficulty}_${generatedSubjects}${itFileType}_${generatedFileType}`;
  }
  else if (convertedYear >= 2005 && convertedYear <= 2012 && !(convertedYear == 2005 && period == "may") && !(convertedYear == 2012 && period == "october")) {
    assembledPart = `${year}${generatedPeriod}/${generatedDifficulty}/${firstCharDifficulty}_${generatedSubjects}${itFileType}_${cutYear}${periodMonth}_${generatedFileType}`;
  }
  else {
    assembledPart = `${year}${generatedPeriod}_${generatedDifficulty}/${firstCharDifficulty}_${generatedSubjects}${itFileType}_${cutYear}${periodMonth}_${generatedFileType}`;
  }

  generatedLink = linkPrefix + assembledPart;

  (<HTMLInputElement>document.querySelector("#output")).value = generatedLink;
}

const dropdowns = Array.from(document.getElementsByClassName("dropdown"));

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("change", formUpdate);
});

const buttons = Array.from(document.getElementsByClassName("btn"));

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let element = e.target;
    pressedButton = (<HTMLInputElement>element).id;
    formUpdate();
    window.open(generatedLink, "_blank");
  });
});
