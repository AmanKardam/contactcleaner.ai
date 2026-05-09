function parseVCF(text){

  const cards = text.split("END:VCARD");

  const contacts = [];

  cards.forEach(card=>{

    const nameMatch = card.match(/FN:(.*)/);
    const telMatch = card.match(/TEL[^:]*:(.*)/);
    const emailMatch = card.match(/EMAIL[^:]*:(.*)/);

    const name = nameMatch ? nameMatch[1].trim() : "";
    const phone = telMatch ? telMatch[1].trim() : "";
    const email = emailMatch ? emailMatch[1].trim() : "";

    if(name || phone || email){

      contacts.push({
        name,
        phone,
        email
      });

    }

  });

  return contacts;
}