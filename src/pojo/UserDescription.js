export function getUserDescription(data) {
console.log(data);
var userDescription={};
if(data.username!==undefined)
{
 userDescription.avatar=data.avatar;
 userDescription.infoTitle=data.infoTitle;
 userDescription.infoDescription=data.infoDescription;
 userDescription.company=data.companyName;
 userDescription.city=data.city;
 userDescription.postalCode=data.postalCode;
 userDescription.address=data.address;
 userDescription.fullname=data.fullname;
 userDescription.username=data.username;
 userDescription.email=data.email;
 userDescription.country=data.country;
 userDescription.imageUrl=data.downloadUrl;

 return userDescription;
}
else
return null;
}

export function setUserDescriptionForm(data)
{
    document.getElementsByClassName("company")[0].value=data.company;
    document.getElementsByClassName("username")[0].value=data.username;
    document.getElementsByClassName("email")[0].value=data.email;
    document.getElementsByClassName("fullName")[0].value=data.fullName;
    document.getElementsByClassName("address")[0].value=data.address;
    document.getElementsByClassName("city")[0].value=data.city;
    document.getElementsByClassName("postalCode")[0].value=data.postalCode;
}

