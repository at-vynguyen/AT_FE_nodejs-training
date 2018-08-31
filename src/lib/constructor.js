const PhotographerKey = {
  names :'name',
  usernames :'username', 
  ages : 'age',
  passwords :'password',
  levels: 'level',
};

exports.convert = (obj) =>{
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  
  let ObjC = {};
  
  keys.map((item, index) => {
    ObjC[PhotographerKey[item]] = values[index];
  });

  return ObjC;
}
