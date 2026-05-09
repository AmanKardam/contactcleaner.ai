function download(content,filename,type){

  const blob = new Blob([content],{type});

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);

}

function exportCSV(){

  if(!window.contacts.length)
    return;

  const rows = [
    ["Name","Phone","Email"]
  ];

  window.contacts.forEach(c=>{

    rows.push([
      c.name,
      c.phone,
      c.email
    ]);

  });

  const csv = rows
    .map(r=>r.join(","))
    .join("\n");

  download(csv,"contacts.csv","text/csv");
}

function exportJSON(){

  download(
    JSON.stringify(window.contacts,null,2),
    "contacts.json",
    "application/json"
  );
}

function exportVCF(){

  let vcf = "";

  window.contacts.forEach(c=>{

    vcf += `
BEGIN:VCARD
VERSION:3.0
FN:${c.name}
TEL:${c.phone}
EMAIL:${c.email}
END:VCARD
`;

  });

  download(vcf,"contacts.vcf","text/vcard");
}