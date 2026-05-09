window.contacts = [];

chooseBtn.onclick = ()=> fileInput.click();

fileInput.addEventListener("change",()=>{

  fileCount.innerText =
  `${fileInput.files.length} files selected`;

});

dropZone.addEventListener("dragover",e=>{
  e.preventDefault();
  dropZone.classList.add("border-cyan-500");
});

dropZone.addEventListener("dragleave",()=>{
  dropZone.classList.remove("border-cyan-500");
});

dropZone.addEventListener("drop",e=>{

  e.preventDefault();

  fileInput.files = e.dataTransfer.files;

  fileCount.innerText =
  `${fileInput.files.length} files selected`;

});

async function processFiles(){

  const files = fileInput.files;

  if(!files.length)
    return alert("Please select VCF files");

  let all = [];

  for(const file of files){

    const text = await file.text();

    const parsed = parseVCF(text);

    all.push(...parsed);

  }

  const merged = mergeContacts(all);

  window.contacts = merged;

  renderContacts(merged);

  updateStats(all,merged);

}

function renderContacts(data){

  table.innerHTML = "";

  data.forEach(contact=>{

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td>
        ${
          isSpammy(contact.phone)
          ? "⚠️ Suspicious"
          : "✅ Clean"
        }
      </td>
    `;

    table.appendChild(row);

  });

}