const API_KEY = "AIzaSyAPecOrQ0vNzkP8IWoQJDuDTYqmvDYEIF0";  // Replace this securely later
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

document.addEventListener("DOMContentLoaded", () => {
    const text = document.getElementById("inp");
    const timebtn = document.getElementById("time-complexity");
    const opt = document.getElementById("optimize");
    const mistake=document.getElementById("mistakes");


     const notesArea = document.getElementById("notes");
  const saveNotesBtn = document.getElementById("save-notes");

  if (notesArea && saveNotesBtn) {
    // Load notes
    chrome.storage.local.get(["codebuddyNotes"], (result) => {
      if (result.codebuddyNotes) {
        notesArea.value = result.codebuddyNotes;
      }
    });

    // Save notes
    saveNotesBtn.addEventListener("click", () => {
      chrome.storage.local.set({ codebuddyNotes: notesArea.value }, () => {
        alert("✅ Notes saved!");
      });
    });
  }
    

    timebtn.addEventListener("click", async () => {
        const usercode = text.value;
        const prompt = `Give only the time complexity of the following code in one line:\n\n${usercode}`;

        text.value = "Analyzing time complexity...";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            const data = await res.json();
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Could not get result.";
            text.value = output;
        } catch (err) {
            text.value = "Error: " + err.message;
        }
    });

    opt.addEventListener("click", async () => {
        const usercode = text.value;
        const prompt = `Optimize the following code and return only the improved version:\n\n${usercode}`;

        text.value = "Optimizing code...";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            const data = await res.json();
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Could not get result.";
            text.value = output;
        } catch (err) {
            text.value = "Error: " + err.message;
        }
    });

      mistake.addEventListener("click", async () => {
        const usercode = text.value;
        const prompt = `List out any kind of mistakes present in given code as breifly as possible and if there are none say "no mistakes":\n\n${usercode}`;

        text.value = "Checking for Mistakes...";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            const data = await res.json();
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Could not get result.";
            text.value = output;
        } catch (err) {
            text.value = "Error: " + err.message;
        }
    });

});
