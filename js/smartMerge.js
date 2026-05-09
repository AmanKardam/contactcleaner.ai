function normalizePhone(phone){

  return phone.replace(/\D/g,"");

}

function mergeContacts(contacts){

  const map = new Map();

  contacts.forEach(contact=>{

    const phone = normalizePhone(contact.phone || "");
    const email = (contact.email || "").toLowerCase();

    const key = phone || email;

    if(!key) return;

    if(!map.has(key)){

      map.set(key,contact);

    }else{

      const existing = map.get(key);

      map.set(key,{
        name: existing.name || contact.name,
        phone: existing.phone || contact.phone,
        email: existing.email || contact.email
      });

    }

  });

  return Array.from(map.values());
}

function isSpammy(phone){

  const cleaned = normalizePhone(phone);

  if(cleaned.length < 7)
    return true;

  if(/^(\d)\1+$/.test(cleaned))
    return true;

  return false;
}