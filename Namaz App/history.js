import { app, db, collection, getDocs, query, where } from "./firebase.js";

 var x = 1;
function menu() {

  if (x == 1) {
    document.querySelector(".mobile-pages").style.display = "flex";
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#close").style.display = "inline-block";
    x = 0;
  } else {
    document.querySelector(".mobile-pages").style.display = "none";
    document.querySelector("#menu").style.display = "inline-block";
    document.querySelector("#close").style.display = "none";
    x = 1;
  }
}


// Function to get dates array for past N days
const getPastDates = (days) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Function to fetch Namaz data from Firestore for UID
const fetchNamazHistory = async (days) => {
  try {
    const userUid = localStorage.getItem("uid");
    const pastDates = getPastDates(days);

    const querySnapShot = await getDocs(
      query(collection(db, "Namaz_Status"), where("uid", "==", userUid))
    );

    const fetchedData = {};
    querySnapShot.forEach((docu) => {
      const data = docu.data();
      fetchedData[data.date] = data;
    });

    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "";

    pastDates.forEach(date => {
      const namazData = fetchedData[date] || {
        fajr: "❗ Pending",
        dhuhr: "❗ Pending",
        asr: "❗ Pending",
        maghrib: "❗ Pending",
        isha: "❗ Pending"
      };

      historyContainer.innerHTML += `
        <div class="history-card">
          <h3>🗓️ ${date}</h3>
          <ul>
            <li>Fajr: ${namazData.fajr}</li>
            <li>Dhuhr: ${namazData.dhuhr}</li>
            <li>Asr: ${namazData.asr}</li>
            <li>Maghrib: ${namazData.maghrib}</li>
            <li>Isha: ${namazData.isha}</li>
          </ul>
        </div>
      `;
    });

  } catch (error) {
    alert(error.message);
  }
};

const logOut = () => {
  console.log("logout");
  const userUid = localStorage.getItem("uid")
  // userUid
  localStorage.removeItem("uid")
    window.location.replace("./index.html")
  
}

window.fetchNamazHistory = fetchNamazHistory;
window.getPastDates = getPastDates;
window.menu = menu;
window.logOut = logOut;