function updateStats(all,merged){

  document.getElementById("totalImported")
  .innerText = all.length;

  document.getElementById("uniqueContacts")
  .innerText = merged.length;

  document.getElementById("duplicatesRemoved")
  .innerText = all.length - merged.length;

  const spam = merged.filter(c=>
    isSpammy(c.phone)
  ).length;

  document.getElementById("spamCount")
  .innerText = spam;

}