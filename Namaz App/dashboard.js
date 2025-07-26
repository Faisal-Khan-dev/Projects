import { app, collection, addDoc, getDocs, query, db, doc, where, updateDoc } from "./firebase.js";




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



// Function to Add Namaz Status if not already exists for today
const addNamazStatus = async () => {
  try {
    const userUid = localStorage.getItem("uid");
    const today = new Date().toISOString().split('T')[0];
    const namazStatus = {
      uid: userUid,
      date: today,
      fajr: "❗ Pending",
      dhuhr: "❗ Pending",
      asr: "❗ Pending",
      maghrib: "❗ Pending",
      isha: "❗ Pending"
    };

    await addDoc(collection(db, "Namaz_Status"), namazStatus);
    console.log("Namaz Status Added for Today!");

  } catch (error) {
    alert(error.message);
  }
};

const checkAndAddNamazStatus = async () => {
  const userUid = localStorage.getItem("uid");
  const today = new Date().toISOString().split('T')[0];

  const querySnapShot = await getDocs(
    query(collection(db, "Namaz_Status"), where("uid", "==", userUid), where("date", "==", today))
  );

  if (querySnapShot.empty) {
    // No data exists -> Add new record
    await addNamazStatus();
    // After adding, render UI
    renderUI();
  } else {
    // Data exists -> Render UI
    renderUI();
  }
};

const namazDone = async (docId, namazName) => {
  try {
    const namazRef = doc(db, "Namaz_Status", docId);
    await updateDoc(namazRef, {
      [namazName]: "✅ Done"
    });

    // Update the UI for that specific namaz
    const allCards = document.querySelectorAll(".prayer-card");
    allCards.forEach(card => {
      const prayerName = card.querySelector(".prayer-name").innerText.toLowerCase();
      if (prayerName === namazName) {
        card.querySelector(".status").innerText = "✅ Done";
      }
    });

  } catch (error) {
    alert(error.message);
  }
};

const namazQaza = async (docId, namazName) => {
  try {
    const namazRef = doc(db, "Namaz_Status", docId);
    await updateDoc(namazRef, {
      [namazName]: "⏱️ Qaza"
    });

    // Update UI instantly
    const allCards = document.querySelectorAll(".prayer-card");
    allCards.forEach(card => {
      const prayerName = card.querySelector(".prayer-name").innerText.toLowerCase();
      if (prayerName === namazName) {
        card.querySelector(".status").innerText = "⏱️ Qaza";
      }
    });

  } catch (error) {
    alert(error.message);
  }
};


async function renderUI() {
  try {
    const userUid = localStorage.getItem("uid");
    const today = new Date().toISOString().split('T')[0];

    const querySnapShot = await getDocs(
      query(collection(db, "Namaz_Status"), where("uid", "==", userUid), where("date", "==", today))
    );

    const tempArr = [];
    querySnapShot.forEach((docu) => {
      const obj = {
        ...docu.data(),
        id: docu.id,
      };
      tempArr.push(obj);
    });
    
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear previous content
    
    for (var i = 0; i < tempArr.length; i++) {
      const namazData = tempArr[i];
      
      container.innerHTML += `<h1>🕌 Namaz Tracker</h1>
        <p class="date">🗓️ Date: ${namazData.date}</p>
        
        <div class="tracker">
        
        <div class="prayer-card">
            <div class="left">
              <span class="prayer-name">Fajr</span>
              <span class="status">${namazData.fajr}</span>
              </div>
              <div class="actions">
              <span class="btn done" onclick="namazDone('${namazData.id}', 'fajr')">✅ Done</span>
              <span class="btn qaza" onclick="namazQaza('${namazData.id}', 'fajr')">⏱️ Qaza</span>
              </div>
              </div>

          <div class="prayer-card">
            <div class="left">
              <span class="prayer-name">Dhuhr</span>
              <span class="status">${namazData.dhuhr}</span>
            </div>
            <div class="actions">
              <span class="btn done" onclick="namazDone('${namazData.id}', 'dhuhr')">✅ Done</span>
              <span class="btn qaza" onclick="namazQaza('${namazData.id}', 'dhuhr')">⏱️ Qaza</span>
              </div>
              </div>
              
          <div class="prayer-card">
          <div class="left">
          <span class="prayer-name">Asr</span>
              <span class="status">${namazData.asr}</span>
              </div>
            <div class="actions">
              <span class="btn done" onclick="namazDone('${namazData.id}', 'asr')">✅ Done</span>
              <span class="btn qaza" onclick="namazQaza('${namazData.id}', 'asr')">⏱️ Qaza</span>
            </div>
          </div>

          <div class="prayer-card">
          <div class="left">
              <span class="prayer-name">Maghrib</span>
              <span class="status">${namazData.maghrib}</span>
              </div>
              <div class="actions">
              <span class="btn done" onclick="namazDone('${namazData.id}', 'maghrib')">✅ Done</span>
              <span class="btn qaza" onclick="namazQaza('${namazData.id}', 'maghrib')">⏱️ Qaza</span>
              </div>
              </div>
              
          <div class="prayer-card">
          <div class="left">
          <span class="prayer-name">Isha</span>
              <span class="status">${namazData.isha}</span>
            </div>
            <div class="actions">
              <span class="btn done" onclick="namazDone('${namazData.id}', 'isha')">✅ Done</span>
              <span class="btn qaza" onclick="namazQaza('${namazData.id}', 'isha')">⏱️ Qaza</span>
            </div>
          </div>

        </div>`;
    }

  } catch (error) {
    alert(error.message);
  }
}

const logOut = () => {
  console.log("logout");
  const userUid = localStorage.getItem("uid")
  // userUid
  localStorage.removeItem("uid")
    window.location.replace("./index.html")
  
}


window.renderUI = renderUI;
window.namazDone = namazDone;

// Load data or create if not exists
window.namazQaza = namazQaza;
window.menu = menu;
window.logOut = logOut;
window.onload = checkAndAddNamazStatus;